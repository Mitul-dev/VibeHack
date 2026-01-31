import { LayoutGrid, Users, BookOpen, Coffee, Video, Lock } from "lucide-react";
import { categories } from "@/lib/data";

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutGrid,
  Users,
  BookOpen,
  Coffee,
  Video,
  Lock,
};

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const Icon = iconMap[category.icon];
        const isSelected = selected === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
              ${isSelected
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{category.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
