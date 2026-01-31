// Mock data for workspaces

import spaceLibrary from "@/assets/space-library.jpg";
import spaceCowork from "@/assets/space-cowork.jpg";
import spaceCafe from "@/assets/space-cafe.jpg";
import spaceMeeting from "@/assets/space-meeting.jpg";
import spacePod from "@/assets/space-pod.jpg";

export interface Workspace {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  availableSeats: number;
  totalSeats: number;
  openTime: string;
  closeTime: string;
  category: "coworking" | "library" | "cafe" | "meeting" | "private";
  isPopular?: boolean;
}

export interface Booking {
  id: string;
  workspaceId: string;
  workspaceName: string;
  workspaceImage: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalAmount: number;
  status: "upcoming" | "completed" | "cancelled";
  seatNumber: string;
}

export const workspaces: Workspace[] = [
  {
    id: "1",
    name: "Central Library Study Hub",
    description: "A quiet, focused environment perfect for deep work and studying. Features individual desks with reading lamps, access to reference materials, and a peaceful atmosphere conducive to concentration.",
    address: "123 Library Lane",
    city: "Mumbai",
    pricePerHour: 99,
    rating: 4.8,
    reviewCount: 234,
    images: [spaceLibrary],
    amenities: ["WiFi", "Power Outlets", "Air Conditioning", "Lockers", "Water Dispenser"],
    availableSeats: 15,
    totalSeats: 30,
    openTime: "08:00",
    closeTime: "22:00",
    category: "library",
    isPopular: true,
  },
  {
    id: "2",
    name: "SkyView Coworking",
    description: "Modern open-plan coworking space with stunning city views. Ergonomic furniture, high-speed internet, and a vibrant community of professionals. Perfect for remote workers and freelancers.",
    address: "456 Tech Park Tower, 15th Floor",
    city: "Bangalore",
    pricePerHour: 199,
    rating: 4.9,
    reviewCount: 456,
    images: [spaceCowork],
    amenities: ["High-Speed WiFi", "Standing Desks", "Meeting Rooms", "Coffee Bar", "Printer", "Phone Booths"],
    availableSeats: 28,
    totalSeats: 50,
    openTime: "07:00",
    closeTime: "23:00",
    category: "coworking",
    isPopular: true,
  },
  {
    id: "3",
    name: "Brew & Work Café",
    description: "A cozy café workspace combining the best of coffee culture with productivity. Enjoy artisan coffee while you work in a relaxed, creative atmosphere.",
    address: "789 Creative Street",
    city: "Pune",
    pricePerHour: 79,
    rating: 4.6,
    reviewCount: 189,
    images: [spaceCafe],
    amenities: ["WiFi", "Coffee Included", "Snacks Available", "Outdoor Seating", "Power Outlets"],
    availableSeats: 8,
    totalSeats: 20,
    openTime: "09:00",
    closeTime: "21:00",
    category: "cafe",
  },
  {
    id: "4",
    name: "Executive Meeting Suite",
    description: "Professional meeting room equipped with the latest technology. Ideal for client presentations, team meetings, and video conferences.",
    address: "101 Business Center",
    city: "Delhi",
    pricePerHour: 499,
    rating: 4.7,
    reviewCount: 87,
    images: [spaceMeeting],
    amenities: ["Video Conferencing", "Whiteboard", "Projector", "AC", "Water & Tea", "Reception Service"],
    availableSeats: 1,
    totalSeats: 1,
    openTime: "08:00",
    closeTime: "20:00",
    category: "meeting",
  },
  {
    id: "5",
    name: "FocusPod Private Booth",
    description: "Soundproof private work pods for maximum concentration. Perfect for important calls, interviews, or when you need complete privacy.",
    address: "202 Innovation Hub",
    city: "Hyderabad",
    pricePerHour: 149,
    rating: 4.5,
    reviewCount: 112,
    images: [spacePod],
    amenities: ["Soundproof", "High-Speed WiFi", "Monitor", "Webcam", "AC", "Adjustable Lighting"],
    availableSeats: 5,
    totalSeats: 8,
    openTime: "06:00",
    closeTime: "24:00",
    category: "private",
  },
];

export const mockBookings: Booking[] = [
  {
    id: "BK001",
    workspaceId: "2",
    workspaceName: "SkyView Coworking",
    workspaceImage: spaceCowork,
    date: "2026-02-01",
    startTime: "10:00",
    endTime: "14:00",
    duration: 4,
    totalAmount: 796,
    status: "upcoming",
    seatNumber: "A-15",
  },
  {
    id: "BK002",
    workspaceId: "1",
    workspaceName: "Central Library Study Hub",
    workspaceImage: spaceLibrary,
    date: "2026-01-28",
    startTime: "14:00",
    endTime: "18:00",
    duration: 4,
    totalAmount: 396,
    status: "completed",
    seatNumber: "L-08",
  },
];

export const categories = [
  { id: "all", label: "All Spaces", icon: "LayoutGrid" },
  { id: "coworking", label: "Coworking", icon: "Users" },
  { id: "library", label: "Library", icon: "BookOpen" },
  { id: "cafe", label: "Café", icon: "Coffee" },
  { id: "meeting", label: "Meeting Room", icon: "Video" },
  { id: "private", label: "Private Pod", icon: "Lock" },
];
