// Cloudflare Pages Function - SSR Handler
// This catches all routes and passes them to TanStack Start's SSR runtime

// @ts-ignore - dist/server/server is generated at build time
import serverEntry from "../dist/server/server";

export default serverEntry;
