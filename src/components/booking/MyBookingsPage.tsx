import { useState } from "react";
import { ArrowLeft, CalendarDays, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingCard from "@/components/booking/BookingCard";
import { mockBookings, Booking } from "@/lib/data";

interface MyBookingsPageProps {
  onBack: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string, reason: string) => void;
}

const MyBookingsPage = ({ onBack, bookings, onCancelBooking }: MyBookingsPageProps) => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const upcomingBookings = bookings.filter((b) => b.status === "upcoming");
  const pastBookings = bookings.filter((b) => b.status !== "upcoming");

  const displayBookings = activeTab === "upcoming" ? upcomingBookings : pastBookings;

  const handleCancelClick = (bookingId: string) => {
    const reason = window.prompt("Please enter a reason for cancellation:");
    if (reason !== null) { // If user didn't click Cancel
      onCancelBooking(bookingId, reason || "No reason provided");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            My Bookings
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "upcoming"
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
          >
            <CalendarDays className="w-4 h-4" />
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "past"
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
          >
            <History className="w-4 h-4" />
            Past ({pastBookings.length})
          </button>
        </div>

        {/* Bookings List */}
        {displayBookings.length > 0 ? (
          <div className="space-y-4">
            {displayBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={booking.status === "upcoming" ? () => handleCancelClick(booking.id) : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <CalendarDays className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">
              No {activeTab} bookings
            </h3>
            <p className="text-muted-foreground mb-6">
              {activeTab === "upcoming"
                ? "You don't have any upcoming bookings yet."
                : "You haven't completed any bookings yet."}
            </p>
            {activeTab === "upcoming" && (
              <Button variant="hero" onClick={onBack}>
                Explore Spaces
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
