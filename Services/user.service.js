import { get } from "./api.js";

export function getProfileService(token) {
  return get("/user/me", token);
}

