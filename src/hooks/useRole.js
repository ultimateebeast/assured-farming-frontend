import { useAuth } from "../context/AuthContext";

/**
 * Get user role safely
 * Returns: 'farmer' | 'buyer' | 'admin' | null
 */
export function useUserRole() {
  const { user } = useAuth();
  return user?.role || null;
}

/**
 * Check if user is a farmer
 */
export function useIsFarmer() {
  const role = useUserRole();
  return role === "farmer";
}

/**
 * Check if user is a buyer
 */
export function useIsBuyer() {
  const role = useUserRole();
  return role === "buyer";
}

/**
 * Check if user is an admin
 */
export function useIsAdmin() {
  const role = useUserRole();
  return role === "admin";
}

/**
 * Get user role and related data
 */
export function useUserData() {
  const { user } = useAuth();
  return {
    id: user?.id,
    username: user?.username,
    email: user?.email,
    phone: user?.phone,
    role: user?.role,
    isVerified: user?.is_verified,
    farmerProfile: user?.farmer_profile,
    buyerProfile: user?.buyer_profile,
  };
}
