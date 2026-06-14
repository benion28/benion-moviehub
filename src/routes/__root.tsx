import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "@/components/layout/Sidebar";

import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MovieHub — Discover Movies" },
      { name: "description", content: "Browse, search and explore movies with MovieHub." },
      { property: "og:title", content: "MovieHub — Discover Movies" },
      { name: "twitter:title", content: "MovieHub — Discover Movies" },
      { property: "og:description", content: "Browse, search and explore movies with MovieHub." },
      { name: "twitter:description", content: "Browse, search and explore movies with MovieHub." },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/35dfa4ab-7823-4c8d-805a-b5118eff54ce/id-preview-3abcbec6--404bafd9-f58d-48da-bc37-52cf07a75fb7.lovable.app-1781365058826.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/35dfa4ab-7823-4c8d-805a-b5118eff54ce/id-preview-3abcbec6--404bafd9-f58d-48da-bc37-52cf07a75fb7.lovable.app-1781365058826.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-muted-foreground mt-2">Page not found</p>
    </div>
  ),
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-dvh p-4 flex gap-4 max-w-[1600px] mx-auto">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
