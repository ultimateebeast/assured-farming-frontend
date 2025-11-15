// src/api/contracts.js
import api from "./client";

export const fetchContracts = (params) =>
  api.get("/contracts/contracts/", { params });
export const fetchContract = (id) => api.get(`/contracts/contracts/${id}/`);
export const createContract = (payload) =>
  api.post("/contracts/contracts/", payload);
// DRF default action URLs use underscores unless url_path is set
export const proposePrice = (id, payload) =>
  api.post(`/contracts/contracts/${id}/propose_price/`, payload);
export const acceptProposal = (id, payload = {}) =>
  api.post(`/contracts/contracts/${id}/accept_proposal/`, payload);
export const signContract = (id, payload = {}) =>
  api.post(`/contracts/contracts/${id}/sign/`, payload);
export const fetchEscrows = (params) =>
  api.get("/contracts/escrows/", { params });
export const fetchShipments = (params) =>
  api.get("/contracts/shipments/", { params });
export const confirmDelivery = (shipmentId) =>
  api.post(`/contracts/shipments/${shipmentId}/confirm_delivery/`);
