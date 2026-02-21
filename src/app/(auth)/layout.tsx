import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Authentication',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-temple-50 via-background to-temple-100 px-4 py-12 dark:from-temple-900/20 dark:via-background dark:to-temple-800/10">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-temple-200/30 blur-3xl dark:bg-temple-700/10" />
        <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-saffron-200/20 blur-3xl dark:bg-saffron-700/10" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 2L3 9V21H9V14H15V21H21V9L12 2Z"
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 2V7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="10" r="1.5" fill="white" opacity="0.8" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">
              Temple<span className="text-primary">Hub</span>USA
            </span>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            Connect with Hindu Temples Across America
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
