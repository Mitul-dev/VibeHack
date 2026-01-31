import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategoryFilter from "@/components/home/CategoryFilter";
import WorkspaceGrid from "@/components/workspace/WorkspaceGrid";
import WorkspaceDetailModal from "@/components/workspace/WorkspaceDetailModal";
import PaymentModal from "@/components/booking/PaymentModal";
import MyBookingsPage from "@/components/booking/MyBookingsPage";
import { workspaces, Workspace, mockBookings, Booking } from "@/lib/data";

type View = "home" | "bookings";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [bookingDetails, setBookingDetails] = useState<{
    workspace: Workspace;
    date: string;
    startTime: string;
    duration: number;
  } | null>(null);

  const filteredWorkspaces = useMemo(() => {
    let filtered = workspaces.filter((workspace) => {
      const matchesCategory = selectedCategory === "all" || workspace.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workspace.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workspace.address.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    // If no exact matches found and search query exists, show all spaces as "nearby"
    if (filtered.length === 0 && searchQuery !== "") {
      filtered = workspaces.filter((workspace) => {
        return selectedCategory === "all" || workspace.category === selectedCategory;
      });
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  // Check if we're showing nearby results (no exact match)
  const isShowingNearby = useMemo(() => {
    if (searchQuery === "") return false;
    const exactMatches = workspaces.filter((workspace) =>
      workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workspace.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workspace.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return exactMatches.length === 0;
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Scroll to spaces section
    document.getElementById("spaces")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectWorkspace = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    setShowWorkspaceModal(true);
  };

  const handleBook = (workspace: Workspace, date: string, startTime: string, duration: number) => {
    setBookingDetails({ workspace, date, startTime, duration });
    setShowWorkspaceModal(false);
    setShowPaymentModal(true);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: "cancelled" }
        : booking
    ));
  };

  const handlePaymentSuccess = () => {
    if (bookingDetails) {
      const endTimeHour = parseInt(bookingDetails.startTime.split(":")[0]) + bookingDetails.duration;
      const endTime = `${endTimeHour.toString().padStart(2, "0")}:00`;

      const newBooking: Booking = {
        id: crypto.randomUUID(),
        workspaceId: bookingDetails.workspace.id,
        workspaceName: bookingDetails.workspace.name,
        workspaceImage: bookingDetails.workspace.images[0],
        date: bookingDetails.date,
        startTime: bookingDetails.startTime,
        endTime,
        duration: bookingDetails.duration,
        totalAmount: bookingDetails.workspace.pricePerHour * bookingDetails.duration,
        status: "upcoming",
        seatNumber: `A-${Math.floor(Math.random() * 20) + 1}`, // Random seat assignment
      };

      setBookings([newBooking, ...bookings]);
    }

    setShowPaymentModal(false);
    setBookingDetails(null);
    setCurrentView("bookings");
  };

  const handleLogin = (name: string) => {
    setUser({ name });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (currentView === "bookings") {
    return (
      <>
        <Header
          onShowBookings={() => setCurrentView("bookings")}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <MyBookingsPage
          onBack={() => setCurrentView("home")}
          bookings={bookings}
          onCancelBooking={handleCancelBooking}
        />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onShowBookings={() => setCurrentView("bookings")}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <main>
        {/* Hero Section */}
        <HeroSection onSearch={handleSearch} />

        {/* Spaces Section */}
        <section id="spaces" className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Section Header */}
            <div className="mb-8">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {searchQuery
                  ? isShowingNearby
                    ? `No exact matches for "${searchQuery}" — Showing nearby spaces`
                    : `Results for "${searchQuery}"`
                  : "Explore Workspaces"
                }
              </h2>
              <p className="text-muted-foreground">
                {searchQuery
                  ? `${filteredWorkspaces.length} space${filteredWorkspaces.length !== 1 ? 's' : ''} available`
                  : "Find the perfect space for your productivity needs"
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-accent text-sm font-medium hover:underline mt-2"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <CategoryFilter
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            {/* Workspace Grid */}
            <WorkspaceGrid
              workspaces={filteredWorkspaces}
              onSelectWorkspace={handleSelectWorkspace}
            />
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
                How It Works
              </h2>
              <p className="text-muted-foreground">
                Book your perfect workspace in 4 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Search", description: "Find spaces near you by location or category" },
                { step: "02", title: "Select", description: "Choose date, time, and duration that works for you" },
                { step: "03", title: "Pay", description: "Secure online payment with multiple options" },
                { step: "04", title: "Work", description: "Arrive, verify with phone number, and get productive" },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="text-center animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center">
                    <span className="font-display text-2xl font-bold text-primary-foreground">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Workspace Detail Modal */}
      <WorkspaceDetailModal
        workspace={selectedWorkspace}
        open={showWorkspaceModal}
        onOpenChange={setShowWorkspaceModal}
        onBook={handleBook}
      />

      {/* Payment Modal */}
      {bookingDetails && (
        <PaymentModal
          open={showPaymentModal}
          onOpenChange={setShowPaymentModal}
          workspace={bookingDetails.workspace}
          date={bookingDetails.date}
          startTime={bookingDetails.startTime}
          duration={bookingDetails.duration}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Index;
