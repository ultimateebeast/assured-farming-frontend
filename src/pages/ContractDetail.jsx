// src/pages/ContractDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Button, Card, CardContent } from "@mui/material";
import {
  fetchContract as apiFetchContract,
  proposePrice,
  acceptProposal,
  signContract,
} from "../api/contracts";

export default function ContractDetail() {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await apiFetchContract(id);
      setContract(res.data);
    } catch (err) {
      console.error("load contract", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const doPropose = async () => {
    if (!price || Number(price) <= 0) {
      alert("Enter a valid price");
      return;
    }
    try {
      await proposePrice(id, { price_per_unit: Number(price), message });
      setPrice("");
      setMessage("");
      await load();
    } catch (e) {
      console.error("propose failed", e);
      const server = e?.response?.data;
      const msg = server?.detail || (server && JSON.stringify(server)) || e?.message || "Propose failed";
      alert(msg);
    }
  };

  const doAccept = async () => {
    try {
      // Prefer accepting the latest proposal if backend requires proposal_id
      const proposals = (contract?.proposals || []).slice().sort((a, b) => (a.id > b.id ? -1 : 1));
      const latest = proposals[0];
      const payload = latest ? { proposal_id: latest.id } : {};
      if (!latest) {
        alert("No proposals available to accept");
        return;
      }
      await acceptProposal(id, payload);
      await load();
    } catch (e) {
      console.error("accept failed", e);
      const server = e?.response?.data;
      const msg = server?.detail || (server && JSON.stringify(server)) || e?.message || "Accept failed";
      alert(msg);
    }
  };

  const doSign = async () => {
    if (contract?.status !== "accepted") {
      alert("You can sign only after the contract is accepted.");
      return;
    }
    try {
      await signContract(id);
      await load();
    } catch (e) {
      console.error("sign failed", e);
      const server = e?.response?.data;
      const msg = server?.detail || (server && JSON.stringify(server)) || e?.message || "Sign failed";
      alert(msg);
    }
  };

  if (loading)
    return <Typography sx={{ mt: 4 }}>Loading contract...</Typography>;
  if (!contract)
    return <Typography sx={{ mt: 4 }}>Contract not found.</Typography>;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Contract #{contract.id}
      </Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography>
            Buyer: {contract.buyer?.username ?? contract.buyer}
          </Typography>
          <Typography>
            Listing: {contract.listing?.id ?? contract.listing}
          </Typography>
          <Typography>Quantity: {contract.agreed_quantity}</Typography>
          <Typography>Price per unit: {contract.price_per_unit}</Typography>
          <Typography>Status: {contract.status}</Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Propose a price
          </Typography>
          <input
            type="number"
            placeholder="Price per unit"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ padding: 8, marginRight: 8 }}
          />
          <input
            type="text"
            placeholder="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ padding: 8, marginRight: 8, width: 300 }}
          />
          <Box sx={{ mt: 1 }}>
            <Button variant="contained" onClick={doPropose} sx={{ mr: 1 }} disabled={!price || Number(price) <= 0}>
              Propose
            </Button>
            <Button variant="outlined" onClick={doAccept} sx={{ mr: 1 }} disabled={(contract.proposals || []).length === 0}>
              Accept
            </Button>
            <Button variant="contained" color="success" onClick={doSign} disabled={contract.status !== "accepted"}>
              Sign
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h6">Proposals</Typography>
      {(contract.proposals || []).length === 0 ? (
        <Typography>No proposals yet.</Typography>
      ) : (
        (contract.proposals || []).map((p) => (
          <Card key={p.id} sx={{ mb: 1 }}>
            <CardContent>
              <Typography>By: {p.proposer?.username ?? p.proposer}</Typography>
              <Typography>Price: {p.price_per_unit}</Typography>
              <Typography>Accepted: {p.accepted ? "Yes" : "No"}</Typography>
              <Typography>{p.message}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
