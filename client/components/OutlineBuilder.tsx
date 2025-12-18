import { useState } from "react";
import { BookOpen, Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface OutlineItem {
  id: string;
  title: string;
  notes: string;
  expanded: boolean;
  children: OutlineItem[];
}

interface OutlineBuilderProps {
  onInsert?: (outline: string) => void;
}

export function OutlineBuilder({ onInsert }: OutlineBuilderProps) {
  const [outline, setOutline] = useState<OutlineItem[]>([
    {
      id: "1",
      title: "Act I - Setup",
      notes: "Introduce characters and conflict",
      expanded: true,
      children: [],
    },
    {
      id: "2",
      title: "Act II - Rising Action",
      notes: "Escalate tension and stakes",
      expanded: true,
      children: [],
    },
    {
      id: "3",
      title: "Act III - Climax",
      notes: "Peak moment of conflict",
      expanded: true,
      children: [],
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = () => {
    const newItem: OutlineItem = {
      id: Date.now().toString(),
      title: "New Section",
      notes: "",
      expanded: true,
      children: [],
    };
    setOutline([...outline, newItem]);
  };

  const deleteItem = (id: string) => {
    setOutline(outline.filter((item) => item.id !== id));
  };

  const toggleExpanded = (id: string) => {
    setOutline(
      outline.map((item) =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="text-muted-foreground hover:text-foreground gap-2"
      >
        <BookOpen className="w-4 h-4" />
        <span className="hidden sm:inline">Outline</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-96 p-4 z-50 shadow-lg border border-border bg-background max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" style={{ color: "#817395" }} />
          <h3 className="font-semibold text-foreground">Story Outline</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="h-6 w-6 p-0"
        >
          ✕
        </Button>
      </div>

      <div className="space-y-2 mb-4">
        {outline.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 p-2 rounded hover:bg-secondary/30 group">
              <button
                onClick={() => toggleExpanded(item.id)}
                className="p-0 hover:bg-secondary/50 rounded"
              >
                {item.expanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {item.notes}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteItem(item.id)}
                className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={addItem}
        className="w-full gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Section
      </Button>
    </Card>
  );
}
