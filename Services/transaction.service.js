import { get, post } from "./api.js";

export function listTransactionsService(token) {
  return get("/transactions", token);
}

export function sendMoneyService(payload, token) {
  // payload: { toUpiId, amount, note }
  return post("/transactions/send", payload, token);
}


