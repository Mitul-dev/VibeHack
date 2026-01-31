import { MapPin, Mail, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display text-xl font-bold">
                Lo<span className="text-accent">Space</span>
              </span>
            </a>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Find and book your perfect workspace by the hour. Simple, reliable, and affordable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={handleExploreClick}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Explore Spaces
                </button>
              </li>
              <li>
                <a href="/how-it-works" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="/list-your-space" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  List Your Space
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Terms of Service
                </a>
              </li>

              <li>
                <a href="/cancellation-policy" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Cancellation Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4" />
                <a href="mailto:lospacestartoop@gmail.com" className="hover:text-primary-foreground transition-colors">
                  lospacestartoop@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4" />
                <a href="tel:+919968612114" className="hover:text-primary-foreground transition-colors">
                  +91 99686 12114
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-sm text-primary-foreground/50 text-center">
            © {new Date().getFullYear()} LoSpace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
