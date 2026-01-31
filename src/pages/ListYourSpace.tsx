
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Upload, DollarSign, Users, Mail, Phone, User } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Schema for form validation
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    spaceName: z.string().min(5, { message: "Space name must be at least 5 characters." }),
    location: z.string().min(5, { message: "Location address must be at least 5 characters." }),
    imageUrl: z.string().url({ message: "Please enter a valid image URL." }).optional().or(z.literal("")),
    price: z.coerce.number().min(1, { message: "Price must be greater than 0." }),
    totalSpaces: z.coerce.number().min(1, { message: "Total spaces must be at least 1." }),
    description: z.string().optional(),
});

const ListYourSpace = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Define form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            spaceName: "",
            location: "",
            imageUrl: "",
            price: 0,
            totalSpaces: 1,
            description: "",
        },
    });

    // Handle submit
    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            // Simulate API delay
            setTimeout(() => {
                // Create new workspace object
                const newSpace = {
                    id: crypto.randomUUID(),
                    name: values.spaceName,
                    address: values.location,
                    city: values.location.split(',')[0] || values.location, // Simple extraction
                    postCode: "", // Not asked for in form
                    country: "India", // Default
                    description: values.description || `A wonderful space hosted by ${values.name}`,
                    pricePerHour: values.price,
                    totalSeats: values.totalSpaces,
                    availableSeats: values.totalSpaces,
                    rating: 5.0, // Default for new spaces
                    reviewCount: 0,
                    images: [
                        values.imageUrl || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
                    ],
                    category: "private" as const, // Default category matching interface
                    amenities: ["Wi-Fi", "Coffee", "Power Backup"], // Default amenities
                    openTime: "09:00",
                    closeTime: "18:00",
                    hostName: values.name,
                    hostEmail: values.email,
                    hostPhone: values.phone
                };

                // Get existing spaces from localStorage
                const storedSpaces = localStorage.getItem("listedSpaces");
                const spaces = storedSpaces ? JSON.parse(storedSpaces) : [];

                // Add new space
                spaces.push(newSpace);

                // Save back to localStorage
                localStorage.setItem("listedSpaces", JSON.stringify(spaces));

                toast({
                    title: "Space Listed Successfully!",
                    description: "Your space has been added to our platform.",
                });

                setIsSubmitting(false);
                navigate("/");
            }, 1500);
        } catch (error) {
            console.error("Error listing space:", error);
            toast({
                title: "Something went wrong",
                description: "Please try again later.",
                variant: "destructive",
            });
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header
                user={null}
                onLogin={() => { }}
                onLogout={() => { }}
                onShowBookings={() => navigate('/')}
            />

            <main className="flex-grow py-12 lg:py-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-10">
                        <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">List Your Space</h1>
                        <p className="text-muted-foreground text-lg">
                            Maximize your earnings by listing your spare office space with LoSpace.
                        </p>
                    </div>

                    <div className="bg-card border rounded-xl p-6 lg:p-8 shadow-sm">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                {/* Personal Details Section */}
                                <div className="space-y-4">
                                    <h3 className="font-display text-xl font-semibold flex items-center gap-2 border-b pb-2">
                                        <User className="h-5 w-5 text-primary" /> Personal Details
                                    </h3>

                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="john@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+91 98765 43210" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Space Details Section */}
                                <div className="space-y-4 pt-4">
                                    <h3 className="font-display text-xl font-semibold flex items-center gap-2 border-b pb-2">
                                        <MapPin className="h-5 w-5 text-primary" /> Space Details
                                    </h3>

                                    <FormField
                                        control={form.control}
                                        name="spaceName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Space Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Downtown Co-working Desk" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Location</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="123 Main St, City, Country" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="imageUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Image URL</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Upload className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input className="pl-9" placeholder="https://example.com/image.jpg" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    Provide a URL for your space image.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Price per Hour (₹)</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                            <Input type="number" className="pl-9" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="totalSpaces"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Total Spaces</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                            <Input type="number" className="pl-9" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description (Optional)</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us a bit more about your space..."
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Listing your space..." : "List My Space"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ListYourSpace;
