import api from "../axios/config";

export const flashErrors = (payload) => {
  // Payload should be an array if errors
  return {
    type: "PUSH_ERRORS",
    payload,
  };
};
export const flashSuccesses = (payload) => {
  // Payload should be an array of successes
  return {
    type: "PUSH_SUCCESSES",
    payload,
  };
};
