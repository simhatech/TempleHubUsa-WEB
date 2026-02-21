import Link from 'next/link';

export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-bold">T</span>
              </div>
              <span className="text-xl font-bold">TempleHubUSA</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Connecting Hindu temple communities across the United States.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/temples" className="hover:text-foreground">
                  Find Temples
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-foreground">
                  Upcoming Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Community</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Account</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/login" className="hover:text-foreground">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-foreground">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TempleHubUSA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
