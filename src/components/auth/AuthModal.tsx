import { useState } from "react";
import { X, Phone, ArrowRight, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import OTPInput from "./OTPInput";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (name: string) => void;
}

const AuthModal = ({ open, onOpenChange, onLogin }: AuthModalProps) => {
  const [view, setView] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (view === "signup" && (!formData.name || !formData.age)) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    const userName = view === "signup" ? formData.name : "Hardik Tomar";
    onLogin(userName);

    toast.success(view === "login" ? "Logged in successfully!" : "Account created successfully!");
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", age: "", email: "", password: "" });
    setView("login");
  };

  const handleClose = () => {
    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="bg-gradient-primary p-6 text-primary-foreground">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold text-primary-foreground">
              {view === "login" ? "Welcome Back" : "Create Account"}
            </DialogTitle>
            <p className="text-primary-foreground/80 text-sm mt-1">
              {view === "login"
                ? "Sign in to access your bookings"
                : "Join LoSpace to verify and book spaces"}
            </p>
          </DialogHeader>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {view === "signup" && (
              <>
                <div className="space-y-2">
                  <span className="text-sm font-medium">Full Name</span>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium">Age</span>
                  <Input
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <span className="text-sm font-medium">Email</span>
              <Input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">
                {view === "signup" ? "Create Password" : "Password"}
              </span>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full mt-2"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {view === "login" ? "Logging in..." : "Creating account..."}
                </>
              ) : (
                <>
                  {view === "login" ? "Log In" : "Sign Up"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            <div className="text-center pt-2">
              <button
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setView(view === "login" ? "signup" : "login")}
              >
                {view === "login"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Log in"}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
