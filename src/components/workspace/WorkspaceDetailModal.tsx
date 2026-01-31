import { useState } from "react";
import { X, Star, MapPin, Clock, Users, Wifi, Plug, AirVent, Coffee, Monitor, Lock, Video, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Workspace } from "@/lib/data";
import BookingForm from "@/components/booking/BookingForm";

interface WorkspaceDetailModalProps {
  workspace: Workspace | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBook: (workspace: Workspace, date: string, startTime: string, duration: number) => void;
}

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "WiFi": Wifi,
  "High-Speed WiFi": Wifi,
  "Power Outlets": Plug,
  "Air Conditioning": AirVent,
  "AC": AirVent,
  "Coffee Bar": Coffee,
  "Coffee Included": Coffee,
  "Monitor": Monitor,
  "Lockers": Lock,
  "Soundproof": Lock,
  "Video Conferencing": Video,
  "Printer": Printer,
};

const WorkspaceDetailModal = ({ workspace, open, onOpenChange, onBook }: WorkspaceDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);

  if (!workspace) return null;

  const handleBook = (date: string, startTime: string, duration: number) => {
    onBook(workspace, date, startTime, duration);
    setShowBookingForm(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Image Gallery */}
        <div className="relative aspect-video">
          <img
            src={workspace.images[currentImageIndex]}
            alt={workspace.name}
            className="w-full h-full object-cover"
          />
          
          {workspace.images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + workspace.images.length) % workspace.images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % workspace.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {workspace.isPopular && <Badge variant="popular">🔥 Popular</Badge>}
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                    {workspace.name}
                  </h2>
                  <div className="flex items-center gap-1 shrink-0 bg-muted px-3 py-1.5 rounded-lg">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="font-semibold">{workspace.rating}</span>
                    <span className="text-muted-foreground text-sm">({workspace.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{workspace.address}, {workspace.city}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">About this space</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {workspace.description}
                </p>
              </div>

              {/* Timing & Availability */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Hours</div>
                    <div className="font-medium">{workspace.openTime} - {workspace.closeTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Users className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Availability</div>
                    <div className="font-medium">{workspace.availableSeats} of {workspace.totalSeats} seats</div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-display font-semibold text-lg mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {workspace.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Wifi;
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        <Icon className="w-5 h-5 text-accent" />
                        <span className="text-sm font-medium">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 bg-card border border-border rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-3xl font-display font-bold text-foreground">
                    ₹{workspace.pricePerHour}
                  </div>
                  <div className="text-muted-foreground">per hour</div>
                </div>

                {showBookingForm ? (
                  <BookingForm
                    workspace={workspace}
                    onBook={handleBook}
                    onCancel={() => setShowBookingForm(false)}
                  />
                ) : (
                  <Button
                    variant="hero"
                    size="xl"
                    className="w-full"
                    onClick={() => setShowBookingForm(true)}
                  >
                    Book Now
                  </Button>
                )}

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Free cancellation up to 2 hours before
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceDetailModal;
