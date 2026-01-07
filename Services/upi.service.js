import { get } from "./api.js";

export function getBalanceService(token) {
  return get("/user/balance", token);
}

export function getReceiverQrService(token) {
  return get("/user/qr", token);
}


