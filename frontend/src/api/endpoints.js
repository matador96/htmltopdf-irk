import { post } from "./fetch";

export const sendHtml = (content) =>
  post("/convert", {
    content,
  });
