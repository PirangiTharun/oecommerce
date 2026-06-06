import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

import { SmoothScroll } from "../components/SmoothScroll";
import { OrganicCursor } from "../components/OrganicCursor";
import { Preloader } from "../components/Preloader";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { ScrollToTop } from "../components/ScrollToTop";

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
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

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
          <ScrollToTop />
        </div>
      </SmoothScroll>
    </QueryClientProvider>
  );
}
