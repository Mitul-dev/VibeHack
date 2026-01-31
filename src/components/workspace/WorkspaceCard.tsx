import { Star, MapPin, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Workspace } from "@/lib/data";

interface WorkspaceCardProps {
  workspace: Workspace;
  onClick: () => void;
}

const WorkspaceCard = ({ workspace, onClick }: WorkspaceCardProps) => {
  const availabilityPercentage = (workspace.availableSeats / workspace.totalSeats) * 100;

  return (
    <Card
      onClick={onClick}
      className="overflow-hidden cursor-pointer group border-0"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={workspace.images[0]}
          alt={workspace.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {workspace.isPopular && (
            <Badge variant="popular">🔥 Popular</Badge>
          )}
          {availabilityPercentage > 50 && (
            <Badge variant="available">Available</Badge>
          )}
        </div>

        {/* Price */}
        <div className="absolute bottom-3 right-3 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <span className="font-display font-bold text-lg">₹{workspace.pricePerHour}</span>
          <span className="text-muted-foreground text-sm">/hr</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-lg text-foreground line-clamp-1 group-hover:text-accent transition-colors">
            {workspace.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="font-semibold text-sm">{workspace.rating}</span>
            <span className="text-muted-foreground text-sm">({workspace.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="line-clamp-1">{workspace.address}, {workspace.city}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{workspace.openTime} - {workspace.closeTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{workspace.availableSeats} seats</span>
          </div>
        </div>

        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {workspace.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground"
            >
              {amenity}
            </span>
          ))}
          {workspace.amenities.length > 3 && (
            <span className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">
              +{workspace.amenities.length - 3}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default WorkspaceCard;
