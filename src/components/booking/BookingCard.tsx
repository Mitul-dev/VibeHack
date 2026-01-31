import { CalendarDays, Clock, MapPin, MoreVertical, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Booking } from "@/lib/data";

interface BookingCardProps {
  booking: Booking;
  onCancel?: () => void;
}

const statusColors = {
  upcoming: "success",
  completed: "secondary",
  cancelled: "destructive",
} as const;

const BookingCard = ({ booking, onCancel }: BookingCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-48 h-40 md:h-auto">
          <img
            src={booking.workspaceImage}
            alt={booking.workspaceName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={statusColors[booking.status]}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  #{booking.id}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                {booking.workspaceName}
              </h3>
            </div>

            {booking.status === "upcoming" && onCancel && (
              <Button variant="ghost" size="icon" onClick={onCancel}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{booking.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{booking.startTime} - {booking.endTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Seat {booking.seatNumber}</span>
            </div>
            <div className="text-right">
              <span className="font-display font-bold text-lg">₹{booking.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;
