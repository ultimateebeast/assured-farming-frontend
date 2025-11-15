// src/api/listings.js
import client from "./client";

export const fetchListings = (params = {}) =>
  client.get("/marketplace/listings/", { params });
export const fetchListing = (id) => client.get(`/marketplace/listings/${id}/`);
export const createListing = (payload) =>
  client.post("/marketplace/listings/", payload);
export const updateListing = (id, payload) =>
  client.put(`/marketplace/listings/${id}/`, payload);
export const patchListing = (id, payload) =>
  client.patch(`/marketplace/listings/${id}/`, payload);
export const deleteListing = (id) =>
  client.delete(`/marketplace/listings/${id}/`);
