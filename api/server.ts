// Vercel Edge Function for SSR
import type { Request as VercelRequest } from "@vercel/edge";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - dist/server/server is generated at build time
import serverEntry from "../../dist/server/server";

export const config = {
  runtime: "edge",
};

export default async function handler(request: VercelRequest) {
  return serverEntry.fetch(request);
}
