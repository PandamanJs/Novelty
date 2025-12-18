import { useState, useEffect } from "react";
import { Save, Trash2, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "sonner";

export interface Draft {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  savedAt: number;
}

const STORAGE_KEY = "wordcraft_drafts";

export function useDrafts() {
  const [drafts, setDrafts] = useState<Draft[]>([]);

  // Load drafts from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setDrafts(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load drafts:", e);
      }
    }
  }, []);

  const saveDraft = (title: string, content: string) => {
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    const draft: Draft = {
      id: Date.now().toString(),
      title,
      content,
      wordCount,
      savedAt: Date.now(),
    };

    const updated = [draft, ...drafts.filter((d) => d.title !== title)];
    setDrafts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    toast.success("Draft saved!");
    return draft;
  };

  const deleteDraft = (id: string) => {
    const updated = drafts.filter((d) => d.id !== id);
    setDrafts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    toast.success("Draft deleted!");
  };

  const loadDraft = (id: string) => {
    return drafts.find((d) => d.id === id);
  };

  return {
    drafts,
    saveDraft,
    deleteDraft,
    loadDraft,
  };
}

interface DraftManagerProps {
  drafts: Draft[];
  onLoad: (draft: Draft) => void;
  onDelete: (id: string) => void;
}

export function DraftManager({
  drafts,
  onLoad,
  onDelete,
}: DraftManagerProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-3">
      {drafts.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No saved drafts yet
        </p>
      ) : (
        drafts.map((draft) => (
          <Card
            key={draft.id}
            className="p-3 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <button
                onClick={() => onLoad(draft)}
                className="flex-1 text-left min-w-0"
              >
                <p className="font-medium text-sm text-foreground truncate">
                  {draft.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {draft.wordCount} words • {formatDate(draft.savedAt)}
                </p>
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(draft.id)}
                className="h-6 w-6 p-0 flex-shrink-0"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
