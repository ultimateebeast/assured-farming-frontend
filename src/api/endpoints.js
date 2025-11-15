import api from "./client";

// ============ AUTHENTICATION ============

export const authAPI = {
  // Register a new user
  register: async (data) => {
    const response = await api.post("/accounts/register/", data);
    return response.data;
  },

  // Login user
  login: async (username, password) => {
    const response = await api.post("/accounts/token/", {
      username,
      password,
    });
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await api.get("/accounts/me/");
    return response.data;
  },

  // Refresh JWT token
  refreshToken: async (refresh) => {
    const response = await api.post("/accounts/token/refresh/", {
      refresh,
    });
    return response.data;
  },

  // Upload KYC documents
  uploadKYC: async (formData) => {
    const response = await api.post("/accounts/kyc/upload/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Get user KYC status
  getKYCStatus: async () => {
    const response = await api.get("/accounts/kyc/status/");
    return response.data;
  },
};

// ============ MARKETPLACE / LISTINGS ============

export const listingsAPI = {
  // Get all listings with filters
  getListings: async (params = {}) => {
    const response = await api.get("/marketplace/listings/", { params });
    return response.data;
  },

  // Get single listing
  getListing: async (id) => {
    const response = await api.get(`/marketplace/listings/${id}/`);
    return response.data;
  },

  // Create listing
  createListing: async (formData) => {
    const response = await api.post("/marketplace/listings/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Update listing
  updateListing: async (id, formData) => {
    const response = await api.patch(`/marketplace/listings/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Delete listing
  deleteListing: async (id) => {
    await api.delete(`/marketplace/listings/${id}/`);
  },

  // Get listing images
  getListingImages: async (listingId) => {
    const response = await api.get(
      `/marketplace/listings/${listingId}/images/`
    );
    return response.data;
  },

  // Upload listing image
  uploadImage: async (listingId, formData) => {
    const response = await api.post(
      `/marketplace/listings/${listingId}/images/`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  // Get crops
  getCrops: async () => {
    const response = await api.get("/marketplace/crops/");
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await api.get("/marketplace/categories/");
    return response.data;
  },
};

// ============ CONTRACTS ============

export const contractsAPI = {
  // Get all contracts
  getContracts: async (params = {}) => {
    const response = await api.get("/contracts/contracts/", { params });
    return response.data;
  },

  // Get single contract
  getContract: async (id) => {
    const response = await api.get(`/contracts/contracts/${id}/`);
    return response.data;
  },

  // Make an offer on a listing
  makeOffer: async (data) => {
    const response = await api.post("/contracts/contracts/", data);
    return response.data;
  },

  // Accept an offer
  acceptOffer: async (contractId, data) => {
    const response = await api.post(
      `/contracts/contracts/${contractId}/accept/`,
      data
    );
    return response.data;
  },

  // Reject an offer
  rejectOffer: async (contractId) => {
    const response = await api.post(
      `/contracts/contracts/${contractId}/reject/`
    );
    return response.data;
  },

  // Make counter offer
  counterOffer: async (contractId, data) => {
    const response = await api.post(
      `/contracts/contracts/${contractId}/counter_offer/`,
      data
    );
    return response.data;
  },

  // Get contract history
  getContractHistory: async (contractId) => {
    const response = await api.get(
      `/contracts/contracts/${contractId}/history/`
    );
    return response.data;
  },

  // Complete contract
  completeContract: async (contractId) => {
    const response = await api.post(
      `/contracts/contracts/${contractId}/complete/`
    );
    return response.data;
  },

  // Cancel contract
  cancelContract: async (contractId) => {
    const response = await api.post(
      `/contracts/contracts/${contractId}/cancel/`
    );
    return response.data;
  },
};

// ============ PAYMENTS ============

export const paymentsAPI = {
  // Get payment methods
  getPaymentMethods: async () => {
    const response = await api.get("/payments/methods/");
    return response.data;
  },

  // Create payment
  createPayment: async (data) => {
    const response = await api.post("/payments/payments/", data);
    return response.data;
  },

  // Get payment status
  getPaymentStatus: async (paymentId) => {
    const response = await api.get(`/payments/payments/${paymentId}/`);
    return response.data;
  },

  // Get escrow transactions
  getEscrowTransactions: async (params = {}) => {
    const response = await api.get("/payments/escrow/", { params });
    return response.data;
  },
};

// ============ ANALYTICS ============

export const analyticsAPI = {
  // Get dashboard stats
  getDashboardStats: async () => {
    const response = await api.get("/analytics/dashboard/");
    return response.data;
  },

  // Get revenue analytics
  getRevenueAnalytics: async (params = {}) => {
    const response = await api.get("/analytics/revenue/", { params });
    return response.data;
  },

  // Get sales analytics
  getSalesAnalytics: async (params = {}) => {
    const response = await api.get("/analytics/sales/", { params });
    return response.data;
  },

  // Get contract analytics
  getContractAnalytics: async (params = {}) => {
    const response = await api.get("/analytics/contracts/", { params });
    return response.data;
  },

  // Get top crops
  getTopCrops: async () => {
    const response = await api.get("/analytics/top-crops/");
    return response.data;
  },

  // Get performance metrics
  getPerformanceMetrics: async () => {
    const response = await api.get("/analytics/performance/");
    return response.data;
  },
};

// ============ NOTIFICATIONS ============

export const notificationsAPI = {
  // Get notifications
  getNotifications: async (params = {}) => {
    const response = await api.get("/notifications/", { params });
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    const response = await api.patch(`/notifications/${notificationId}/`, {
      read: true,
    });
    return response.data;
  },

  // Mark all as read
  markAllAsRead: async () => {
    const response = await api.post("/notifications/mark-all-read/");
    return response.data;
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    await api.delete(`/notifications/${notificationId}/`);
  },
};

// ============ REVIEWS & RATINGS ============

export const reviewsAPI = {
  // Get reviews for a listing
  getListingReviews: async (listingId, params = {}) => {
    const response = await api.get(
      `/marketplace/listings/${listingId}/reviews/`,
      { params }
    );
    return response.data;
  },

  // Create review
  createReview: async (data) => {
    const response = await api.post("/reviews/", data);
    return response.data;
  },

  // Get seller reviews
  getSellerReviews: async (sellerId, params = {}) => {
    const response = await api.get(`/reviews/seller/${sellerId}/`, { params });
    return response.data;
  },
};
