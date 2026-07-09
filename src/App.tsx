import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { BlogInteractionsProvider } from "@/context/BlogInteractionsContext";
import { NotFound } from "@/components/not-found";
import { RouteFallback } from "@/components/route-fallback";

// Eagerly loaded (top-level marketing surface — no benefit to splitting)
import HomePage from "@/routes/index";

// Lazy per-route for smaller initial bundle
const AboutPage = lazy(() => import("@/routes/about"));
const ServicesPage = lazy(() => import("@/routes/services"));
const PortfolioPage = lazy(() => import("@/routes/portfolio"));
const FounderPage = lazy(() => import("@/routes/founder"));
const ContactPage = lazy(() => import("@/routes/contact"));
const BlogPage = lazy(() => import("@/routes/blog"));
const BlogPostPage = lazy(() => import("@/routes/blog-post"));
const AcademyPage = lazy(() => import("@/routes/academy"));
const CareersPage = lazy(() => import("@/routes/careers"));
const CommunityPage = lazy(() => import("@/routes/community"));
const CoursesPage = lazy(() => import("@/routes/courses"));
const EventsPage = lazy(() => import("@/routes/events"));
const InternshipsPage = lazy(() => import("@/routes/internships"));
const LabsPage = lazy(() => import("@/routes/labs"));
const VerifyPage = lazy(() => import("@/routes/verify"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <SiteNav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

const queryClient = new QueryClient();

export function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BlogInteractionsProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Layout>
                <Suspense fallback={<RouteFallback />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/founder" element={<FounderPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                    <Route path="/academy" element={<AcademyPage />} />
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/internships" element={<InternshipsPage />} />
                    <Route path="/labs" element={<LabsPage />} />
                    <Route path="/verify" element={<VerifyPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>
            </BrowserRouter>
            <Toaster richColors position="top-center" />
          </BlogInteractionsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
