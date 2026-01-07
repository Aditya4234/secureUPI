import { post } from "./api.js";

export function loginService(payload) {
  // payload: { mobile, pin }
  return post("/auth/login", payload);
}

export function registerService(payload) {
  // payload: { name, mobile, pin }
  return post("/auth/register", payload);
}

export function sendOtpService(payload) {
  // payload: { mobile }
  return post("/auth/send-otp", payload);
}

export function verifyOtpService(payload) {
  // payload: { mobile, otp }
  return post("/auth/verify-otp", payload);
}


