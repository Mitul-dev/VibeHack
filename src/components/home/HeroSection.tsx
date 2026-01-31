import { Search, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-workspace.jpg";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Modern coworking space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-light text-accent text-sm font-medium mb-6 animate-fade-up">
            <Clock className="w-4 h-4" />
            <span>Book by the hour</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Find Your Perfect{" "}
            <span className="text-accent">Workspace</span>
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Discover and book study spaces, coworking spots, and meeting rooms by the hour. 
            Simple, reliable, and affordable.
          </p>

          {/* Search Box */}
          <div className="bg-card rounded-2xl shadow-xl p-4 lg:p-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter city or location..."
                  className="w-full h-12 lg:h-14 pl-12 pr-4 rounded-xl bg-muted/50 border-2 border-transparent focus:border-primary focus:bg-card transition-all text-base outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSearch((e.target as HTMLInputElement).value);
                    }
                  }}
                />
              </div>
              <Button
                variant="hero"
                size="xl"
                className="lg:w-auto w-full"
                onClick={() => onSearch("")}
              >
                <Search className="w-5 h-5" />
                <span>Search Spaces</span>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div>
              <div className="text-2xl lg:text-3xl font-display font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Verified Spaces</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-display font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground">Cities</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-display font-bold text-foreground">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
