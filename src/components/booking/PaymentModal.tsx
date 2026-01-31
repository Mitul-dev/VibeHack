import { useState } from "react";
import { Check, CreditCard, Smartphone, Building2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Workspace } from "@/lib/data";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspace: Workspace;
  date: string;
  startTime: string;
  duration: number;
  onSuccess: () => void;
}

type PaymentMethod = "upi" | "card" | "netbanking";

const PaymentModal = ({ open, onOpenChange, workspace, date, startTime, duration, onSuccess }: PaymentModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalAmount = workspace.pricePerHour * duration;
  const endTime = `${parseInt(startTime.split(":")[0]) + duration}:00`;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      toast.success("Booking confirmed! Check your email for details.");
      onSuccess();
      setIsSuccess(false);
    }, 1500);
  };

  const paymentMethods = [
    { id: "upi" as PaymentMethod, label: "UPI", icon: Smartphone, description: "Pay via any UPI app" },
    { id: "card" as PaymentMethod, label: "Card", icon: CreditCard, description: "Debit or Credit Card" },
    { id: "netbanking" as PaymentMethod, label: "Net Banking", icon: Building2, description: "All major banks" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {isSuccess ? (
          <div className="py-12 text-center animate-scale-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-success" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Payment Successful!
            </h3>
            <p className="text-muted-foreground">
              Your booking has been confirmed.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Complete Payment</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="bg-muted rounded-xl p-4">
                <div className="flex gap-4">
                  <img
                    src={workspace.images[0]}
                    alt={workspace.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{workspace.name}</h4>
                    <p className="text-sm text-muted-foreground">{workspace.city}</p>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">{date}</span>
                      <span className="text-muted-foreground"> • {startTime} - {endTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Payment Method</h4>
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;
                  
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{method.label}</div>
                        <div className="text-sm text-muted-foreground">{method.description}</div>
                      </div>
                      {isSelected && (
                        <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Amount */}
              <div className="flex justify-between items-center py-4 border-t border-border">
                <span className="text-lg font-medium">Total Amount</span>
                <span className="text-2xl font-display font-bold">₹{totalAmount}</span>
              </div>

              {/* Pay Button */}
              <Button
                variant="hero"
                size="xl"
                className="w-full"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ₹${totalAmount}`
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Secure payment powered by Razorpay
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
