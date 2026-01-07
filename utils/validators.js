import { MOBILE_PATTERN, UPI_ID_PATTERN, PIN_LENGTH } from "./constants.js";

export function validateMobile(mobile) {
  if (!mobile) return "Mobile number is required";
  if (!MOBILE_PATTERN.test(mobile)) {
    return "Enter a valid 10-digit mobile number";
  }
  return null;
}

export function validatePin(pin) {
  if (!pin) return "PIN is required";
  if (pin.length !== PIN_LENGTH) {
    return `PIN must be ${PIN_LENGTH} digits`;
  }
  if (!/^\d+$/.test(pin)) {
    return "PIN must contain only numbers";
  }
  return null;
}

export function validateUpiId(upiId) {
  if (!upiId) return "UPI ID is required";
  if (!UPI_ID_PATTERN.test(upiId) && !MOBILE_PATTERN.test(upiId)) {
    return "Enter a valid UPI ID or mobile number";
  }
  return null;
}

export function validateAmount(amount) {
  if (!amount || amount <= 0) {
    return "Amount must be greater than 0";
  }
  if (amount > 100000) {
    return "Maximum amount is ₹1,00,000";
  }
  return null;
}

export function validateName(name) {
  if (!name || name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }
  return null;
}

