import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SmoothScroll } from "../components/SmoothScroll";
import { OrganicCursor } from "../components/OrganicCursor";
import { Preloader } from "../components/Preloader";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="text-display text-7xl text-forest-deep">404</h1>
        <h2 className="mt-4 text-xl text-forest-deep/80">This trail doesn't grow here.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has wandered off into the field.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-cream transition-colors hover:bg-turmeric hover:text-forest-deep"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="text-display text-3xl text-forest-deep">Something didn't bloom</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A small storm passed through. You can refresh or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-forest px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-cream hover:bg-turmeric hover:text-forest-deep"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-forest/30 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-forest-deep hover:bg-forest hover:text-cream"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Phyto Health Organics — Premium Organic Powders | Telangana, India" },
      {
        name: "description",
        content:
          "Phyto Health Organics crafts premium organic fruit, flower, vegetable & superfood powders — chemical-free, hygienically processed, export quality. Private labelling available.",
      },
      { name: "author", content: "Phyto Health Organics" },
      { name: "theme-color", content: "#1f4d36" },
      { property: "og:title", content: "Phyto Health Organics — Premium Organic Powders" },
      {
        property: "og:description",
        content: "Nurturing Nature, Nurturing Lives. Organic fruit, flower, vegetable & superfood powders from Telangana.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
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
      <SmoothScroll>
        <Preloader />
        <OrganicCursor />
        <div className="grain relative min-h-screen bg-cream text-forest-deep">
          <SiteNav />
          <main className="relative z-[2]">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
      </SmoothScroll>
    </QueryClientProvider>
  );
}
