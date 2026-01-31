import { Workspace } from "@/lib/data";
import WorkspaceCard from "./WorkspaceCard";

interface WorkspaceGridProps {
  workspaces: Workspace[];
  onSelectWorkspace: (workspace: Workspace) => void;
}

const WorkspaceGrid = ({ workspaces, onSelectWorkspace }: WorkspaceGridProps) => {
  if (workspaces.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="font-display font-semibold text-lg text-foreground mb-2">
          No spaces found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workspaces.map((workspace, index) => (
        <div
          key={workspace.id}
          className="animate-fade-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <WorkspaceCard
            workspace={workspace}
            onClick={() => onSelectWorkspace(workspace)}
          />
        </div>
      ))}
    </div>
  );
};

export default WorkspaceGrid;
