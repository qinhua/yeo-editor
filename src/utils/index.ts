/*
 * @Author: BabyChin
 * @Date: 2021-06-10 18:36:53
 * @LastEditTime: 2021-07-22 00:20:43
 * @Description:
 */
import { createBrowserHistory } from "history";
import crypto from "crypto";

export const title: string = "YeoEditor";

export const history = createBrowserHistory();

export const createFingerprint = () => {
  const canvas = document.getElementById("print-uuid") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.font = "18pt Arial";
  context.textBaseline = "top";
  context.fillText("hello, user.", 2, 2);
  const fingerprint = canvas.toDataURL("image/jpeg");

  // hash
  const secret = "nice";
  const hash = crypto
    .createHmac("sha256", secret)
    .update(fingerprint)
    .digest("hex");

  return hash;
};
