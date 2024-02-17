import { SiteConfig } from "@/lib/site-config";
import Link from "next/link";
import { ThemeToggle } from "../../components/ThemeToggle";
import { Typography } from "../../components/ui/Typography";
import { AuthButton } from "./auth/AuthButton";

export async function Header() {
  return (
    <header className="container sticky top-0 z-50 w-full m-auto border-b max-w-7xl bg-background">
      <div className="flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <div>
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
        </div>

        <div className="flex items-center justify-end flex-1 space-x-4">
          <nav className="flex items-center space-x-1">
            <AuthButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
