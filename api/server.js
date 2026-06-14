// Vercel Edge Function for SSR

export const config = {
  runtime: "edge",
};

export default async function handler(request) {
  // Dynamically import the server entry at runtime
  const { default: serverEntry } = await import("../dist/server/server.js");
  return serverEntry.fetch(request);
}
