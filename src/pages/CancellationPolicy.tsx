import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

const CancellationPolicy = () => {
    // State management for Header compatibility
    const [user, setUser] = useState<{ name: string } | null>(null);

    const handleLogin = (name: string) => {
        setUser({ name });
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header
                user={user}
                onLogin={handleLogin}
                onLogout={handleLogout}
            />

            <main className="container mx-auto px-4 lg:px-8 py-12 lg:py-20 max-w-4xl">
                <h1 className="text-4xl font-display font-bold mb-8 text-primary">Cancellation Policy</h1>

                <div className="space-y-8 text-foreground/80 leading-relaxed">
                    <section>
                        <p className="mb-4">
                            At LoSpace, all bookings are made for specific time slots that are reserved exclusively for the user. Once a booking is confirmed, the selected seat or space is blocked and cannot be offered to other users.
                        </p>
                        <p className="font-semibold">
                            Because of this, all bookings are non-refundable.
                        </p>
                    </section>

                    <hr className="border-border/50" />

                    <section>
                        <h2 className="text-2xl font-display font-semibold mb-4 text-foreground">Important Terms</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Users may cancel their booking at any time before the scheduled start.</li>
                            <li>No refund will be issued for cancelled bookings.</li>
                            <li>Cancellation only releases the seat for operational purposes.</li>
                            <li>Payment made for the booking will not be returned or transferred.</li>
                        </ul>
                    </section>

                    <hr className="border-border/50" />

                    <section>
                        <h2 className="text-2xl font-display font-semibold mb-4 text-foreground">No-Show Policy</h2>
                        <p className="mb-2">If a user does not arrive at the workspace at the booked time:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>The booking will be marked as No-Show</li>
                            <li>The full amount will be charged</li>
                            <li>No refund or credit will be provided</li>
                        </ul>
                    </section>

                    <hr className="border-border/50" />

                    <section>
                        <h2 className="text-2xl font-display font-semibold mb-4 text-foreground">Partial Usage</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>If a user leaves early or uses the space for less time than booked, no partial refund will be issued.</li>
                        </ul>
                    </section>

                    <hr className="border-border/50" />

                    <section>
                        <h2 className="text-2xl font-display font-semibold mb-4 text-foreground">Late Arrival</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Late arrival does not extend the booking time.</li>
                            <li>The booking will still end at the originally scheduled time.</li>
                            <li>No compensation or refund will be provided for late entry.</li>
                        </ul>
                    </section>

                    <hr className="border-border/50" />

                    <section>
                        <h2 className="text-2xl font-display font-semibold mb-4 text-foreground">Exceptional Circumstances</h2>
                        <p className="mb-2">Refunds are not applicable in cases including but not limited to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Change of plans</li>
                            <li>Personal emergencies</li>
                            <li>Network or device issues</li>
                            <li>Delay in arrival</li>
                            <li>Incorrect time or date selection by the user</li>
                        </ul>
                    </section>

                    <hr className="border-border/50" />

                    <section>
                        <h2 className="text-2xl font-display font-semibold mb-4 text-foreground">Workspace Closure or Owner Issue</h2>
                        <p className="mb-2">In rare cases where a workspace is unable to provide access due to:</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>Operational issues</li>
                            <li>Temporary closure</li>
                            <li>Owner-side problems</li>
                        </ul>
                        <p className="mb-2">LoSpace may, at its discretion:</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>Reschedule the booking, or</li>
                            <li>Provide booking credit for future use</li>
                        </ul>
                        <p>(No cash refunds will be issued.)</p>
                    </section>

                    <hr className="border-border/50" />

                    <section>
                        <h2 className="text-2xl font-display font-semibold mb-4 text-foreground">Policy Acceptance</h2>
                        <p>
                            By confirming a booking on LoSpace, users acknowledge and agree to this cancellation and refund policy.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CancellationPolicy;
