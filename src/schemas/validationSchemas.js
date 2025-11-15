import * as Yup from "yup";

// Password validation
const passwordSchema = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must contain an uppercase letter")
  .matches(/[0-9]/, "Password must contain a number")
  .matches(/[@$!%*?&]/, "Password must contain a special character (@$!%*?&)")
  .required("Password is required");

// ============ Authentication Schemas ============

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid Indian phone number")
    .required("Phone number is required"),
  password: passwordSchema,
  password_confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  role: Yup.string()
    .oneOf(["farmer", "buyer"], "Please select a valid role")
    .required("Role is required"),
});

// ============ Marketplace Schemas ============

export const createListingSchema = Yup.object().shape({
  crop: Yup.number().required("Please select a crop"),
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must not exceed 1000 characters")
    .required("Description is required"),
  quantity: Yup.number()
    .positive("Quantity must be greater than 0")
    .required("Quantity is required"),
  unit: Yup.string()
    .oneOf(["kg", "ton", "bag"], "Please select a valid unit")
    .required("Unit is required"),
  price_per_unit: Yup.number()
    .positive("Price must be greater than 0")
    .required("Price per unit is required"),
  available_from: Yup.date()
    .min(new Date(), "Available from date must be in the future")
    .required("Available from date is required"),
  available_until: Yup.date()
    .min(
      Yup.ref("available_from"),
      "Available until must be after available from"
    )
    .required("Available until date is required"),
  images: Yup.array()
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed"),
});

export const makeOfferSchema = Yup.object().shape({
  quantity: Yup.number()
    .positive("Quantity must be greater than 0")
    .required("Quantity is required"),
  price_per_unit: Yup.number()
    .positive("Price must be greater than 0")
    .required("Offer price is required"),
  delivery_location: Yup.string()
    .min(5, "Delivery location is required")
    .required("Delivery location is required"),
  notes: Yup.string().max(500, "Notes must not exceed 500 characters"),
});

// ============ Contract Schemas ============

export const counterOfferSchema = Yup.object().shape({
  price_per_unit: Yup.number()
    .positive("Price must be greater than 0")
    .required("Counter price is required"),
  notes: Yup.string().max(500, "Notes must not exceed 500 characters"),
});

export const acceptOfferSchema = Yup.object().shape({
  delivery_date: Yup.date()
    .min(new Date(), "Delivery date must be in the future")
    .required("Delivery date is required"),
  delivery_address: Yup.string()
    .min(10, "Delivery address is required")
    .required("Delivery address is required"),
  payment_method: Yup.string()
    .oneOf(
      ["bank_transfer", "upi", "cheque"],
      "Please select a valid payment method"
    )
    .required("Payment method is required"),
});

// ============ KYC Schema ============

export const kycUploadSchema = Yup.object().shape({
  document_type: Yup.string()
    .oneOf(
      ["aadhaar", "pan", "voter_id", "driving_license"],
      "Please select a valid document type"
    )
    .required("Document type is required"),
  document_number: Yup.string()
    .min(8, "Document number is too short")
    .required("Document number is required"),
  document_file: Yup.mixed()
    .required("Document file is required")
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return false;
      return value.size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Only PDF and image files are allowed", (value) => {
      if (!value) return false;
      return ["application/pdf", "image/jpeg", "image/png"].includes(
        value.type
      );
    }),
});

// ============ Profile Schema ============

export const updateProfileSchema = Yup.object().shape({
  first_name: Yup.string().max(50, "First name too long"),
  last_name: Yup.string().max(50, "Last name too long"),
  bio: Yup.string().max(500, "Bio must not exceed 500 characters"),
  profile_picture: Yup.mixed().test(
    "fileSize",
    "Profile picture must be less than 2MB",
    (value) => {
      if (!value) return true;
      return value.size <= 2 * 1024 * 1024;
    }
  ),
});
