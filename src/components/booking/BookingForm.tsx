import { useState, useMemo } from "react";
import { Calendar, Clock, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Workspace } from "@/lib/data";

interface BookingFormProps {
  workspace: Workspace;
  onBook: (date: string, startTime: string, duration: number) => void;
  onCancel: () => void;
}

const BookingForm = ({ workspace, onBook, onCancel }: BookingFormProps) => {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [startTime, setStartTime] = useState("10:00");
  const [duration, setDuration] = useState(2);

  const totalAmount = workspace.pricePerHour * duration;

  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    const [openHour] = workspace.openTime.split(":").map(Number);
    const [closeHour] = workspace.closeTime.split(":").map(Number);
    
    for (let hour = openHour; hour < closeHour; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
    }
    return slots;
  }, [workspace.openTime, workspace.closeTime]);

  const handleSubmit = () => {
    onBook(selectedDate, startTime, duration);
  };

  return (
    <div className="space-y-4">
      {/* Date Selection */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Select Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={today}
          className="w-full h-12 px-4 rounded-lg border-2 border-input bg-card focus:border-primary focus:outline-none transition-colors"
        />
      </div>

      {/* Time Selection */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Start Time
        </label>
        <select
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full h-12 px-4 rounded-lg border-2 border-input bg-card focus:border-primary focus:outline-none transition-colors"
        >
          {timeSlots.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Duration */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Duration (hours)
        </label>
        <div className="flex items-center justify-between bg-muted rounded-lg p-2">
          <button
            onClick={() => setDuration((d) => Math.max(1, d - 1))}
            className="w-10 h-10 rounded-lg bg-card flex items-center justify-center hover:bg-background transition-colors"
            disabled={duration <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-display text-2xl font-bold">{duration}</span>
          <button
            onClick={() => setDuration((d) => Math.min(8, d + 1))}
            className="w-10 h-10 rounded-lg bg-card flex items-center justify-center hover:bg-background transition-colors"
            disabled={duration >= 8}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-muted rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">₹{workspace.pricePerHour} × {duration} hours</span>
          <span>₹{totalAmount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Service fee</span>
          <span>₹0</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-lg">₹{totalAmount}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button variant="hero" size="lg" className="w-full" onClick={handleSubmit}>
          Confirm Booking
        </Button>
        <Button variant="ghost" size="sm" className="w-full" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;
