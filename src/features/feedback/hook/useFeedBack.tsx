import type { FeedbackPayload } from "../../../types";

export const sendFeedback = async (payload: FeedbackPayload) => {
  const response = await fetch("http://113.161.103.134:8050/api/v1/feedbacks/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Gửi phản hồi thất bại");
  }

  return await response.json();
};