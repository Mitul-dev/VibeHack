import { useState } from "react";
import { MapPin, User, Menu, X, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/auth/AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onShowBookings?: () => void;
  user: { name: string } | null;
  onLogin: (name: string) => void;
  onLogout: () => void;
}

const Header = ({ onShowBookings, user, onLogin, onLogout }: HeaderProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleExploreClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation then scroll
      setTimeout(() => {
        const heroInput = document.querySelector('input[placeholder*="city or location"]');
        if (heroInput) {
          (heroInput as HTMLInputElement).focus();
          heroInput.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    } else {
      const heroInput = document.querySelector('input[placeholder*="city or location"]');
      if (heroInput) {
        (heroInput as HTMLInputElement).focus();
        heroInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/"); // Optionally go home on logout
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-glass backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Lo<span className="text-accent">Space</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={handleExploreClick}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Explore
              </button>
              <a href="/how-it-works" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                How it Works
              </a>
              <button
                onClick={onShowBookings}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                My Bookings
              </button>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">
                    Hi, {user.name}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full bg-muted hover:bg-muted/80">
                        <User className="w-5 h-5 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={onShowBookings}>
                        My Bookings
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                        <LogOut className="w-4 h-4 mr-2" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setShowAuthModal(true)}>
                  Log in
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border animate-fade-in">
              <nav className="flex flex-col gap-4">
                {user && (
                  <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-foreground">Hi, {user.name}</span>
                  </div>
                )}
                <button
                  onClick={handleExploreClick}
                  className="text-left text-sm font-medium text-foreground/80 hover:text-foreground"
                >
                  Explore
                </button>
                <a href="/how-it-works" className="text-sm font-medium text-foreground/80 hover:text-foreground">
                  How it Works
                </a>
                <button
                  onClick={() => { onShowBookings?.(); setMobileMenuOpen(false); }}
                  className="text-left text-sm font-medium text-foreground/80 hover:text-foreground"
                >
                  My Bookings
                </button>
                <div className="flex gap-2 pt-2">
                  {user ? (
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="justify-start text-destructive px-0 hover:bg-transparent">
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => { setShowAuthModal(true); setMobileMenuOpen(false); }}>
                      Log in
                    </Button>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onLogin={onLogin}
      />
    </>
  );
};

export default Header;
