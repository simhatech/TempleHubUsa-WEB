import HomePage from './(public)/page';
import PublicLayout from './(public)/layout';

// In Next.js App Router, the root page.tsx takes precedence over (public)/page.tsx
// for the "/" route. We compose them here so the homepage renders with the
// PublicHeader and PublicFooter from the public layout.
export default function RootPage() {
  return (
    <PublicLayout>
      <HomePage />
    </PublicLayout>
  );
}
