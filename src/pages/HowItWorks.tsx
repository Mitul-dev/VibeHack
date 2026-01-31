import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle, MapPin, Clock, CreditCard, Building, Calendar, Receipt } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              🧭 How LoSpace Works
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              LoSpace helps you find and book work or study spaces for a few hours — quickly, easily, and without long-term commitments.
            </p>
            <p className="text-muted-foreground mt-4">
              Whether you're a student, freelancer, or remote worker, LoSpace gives you a quiet place to focus when you need it.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3">
                    1️⃣ Find a Workspace
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Open LoSpace and browse available study or work spaces near you.
                  </p>
                  <p className="text-foreground font-medium mb-2">You can:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      View spaces on a map or list
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Compare prices
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Check available facilities like Wi-Fi, AC, silent zones, or private seating
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      See real photos and user reviews
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3">
                    2️⃣ Choose Your Time
                  </h2>
                  <p className="text-muted-foreground mb-4">Select:</p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      The date you want to visit
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Your start time
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      How many hours you want to use the space
                    </li>
                  </ul>
                  <p className="text-accent font-medium">
                    You only pay for the time you need — hourly usage, no monthly lock-in.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <CreditCard className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3">
                    3️⃣ Book & Pay Online
                  </h2>
                  <p className="text-muted-foreground mb-4">Once you select your time:</p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      The total price is shown clearly
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      You complete payment online
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Your booking is instantly confirmed
                    </li>
                  </ul>
                  <p className="text-accent font-medium">
                    No calling. No waiting. No manual confirmation.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <Building className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3">
                    4️⃣ Visit the Location
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Go to the workspace at your booked time.
                  </p>
                  <p className="text-foreground font-medium mb-2">When you arrive:</p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Simply share your registered phone number with the owner or staff
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      They verify your booking in their system
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      You're checked in and can start using the space
                    </li>
                  </ul>
                  <p className="text-accent font-medium">
                    No QR codes. No scanning. No app complications.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3">
                    5️⃣ Work, Study, and Focus
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Use the space for your booked duration:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Study peacefully
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Work productively
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Attend online meetings
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Prepare for exams
                    </li>
                  </ul>
                  <p className="text-muted-foreground">
                    When your time is complete, your session ends automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <Receipt className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3">
                    6️⃣ Manage Your Bookings
                  </h2>
                  <p className="text-muted-foreground mb-4">Inside LoSpace, you can:</p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      View upcoming bookings
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Check past bookings
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Download receipts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Rebook your favorite spaces easily
                    </li>
                  </ul>
                  <p className="text-accent font-medium">
                    Everything stays organized in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why LoSpace */}
          <div className="mt-16 bg-primary/5 rounded-2xl p-6 lg:p-8 border border-primary/20">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6 text-center">
              ✅ Why LoSpace?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Pay only by the hour",
                "No long-term commitments",
                "Easy booking",
                "Verified entry using phone number",
                "Perfect for students and professionals",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-12 text-center">
            <p className="text-lg font-medium text-foreground">
              In short:
            </p>
            <p className="text-xl lg:text-2xl font-display font-bold text-accent mt-2">
              Find a space → Book hours → Pay → Visit → Get verified → Work peacefully
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
