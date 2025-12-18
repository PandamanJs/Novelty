import { useState } from "react";
import { Tag, Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface Tag {
  id: string;
  name: string;
  color: string;
}

const defaultColors = [
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
  "#f97316",
];

export function TagsManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", name: "Fiction", color: "#3b82f6" },
    { id: "2", name: "Adventure", color: "#10b981" },
  ]);
  const [newTagName, setNewTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState(defaultColors[0]);

  const addTag = () => {
    if (newTagName.trim()) {
      setTags([
        ...tags,
        {
          id: Date.now().toString(),
          name: newTagName.trim(),
          color: selectedColor,
        },
      ]);
      setNewTagName("");
    }
  };

  const removeTag = (id: string) => {
    setTags(tags.filter((t) => t.id !== id));
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start text-gray-600 hover:text-black hover:bg-gray-100"
      >
        <Tag className="w-4 h-4 mr-2" />
        <span>Tags & Categories</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-96 p-4 z-50 shadow-lg border border-gray-200 bg-white max-h-96 overflow-y-auto fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5" style={{ color: "#0071e3" }} />
          <h3 className="font-semibold text-black">Tags & Categories</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="h-6 w-6 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {/* Current Tags */}
        {tags.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-foreground uppercase opacity-70 mb-2">
              Applied Tags
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-2 group"
                  style={{ backgroundColor: tag.color }}
                >
                  <span>{tag.name}</span>
                  <button
                    onClick={() => removeTag(tag.id)}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Tag */}
        <div className="p-3 rounded-lg border border-border/50 bg-secondary/30 space-y-3">
          <div>
            <label className="text-xs font-semibold text-foreground uppercase opacity-70">
              New Tag
            </label>
            <Input
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTag()}
              placeholder="Tag name"
              className="h-8 text-sm mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground uppercase opacity-70">
              Color
            </label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {defaultColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    selectedColor === color ? "scale-125 ring-2 ring-offset-1" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <Button
            onClick={addTag}
            size="sm"
            disabled={!newTagName.trim()}
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white gap-2 rounded-lg font-semibold border-0"
          >
            <Plus className="w-4 h-4" />
            Add Tag
          </Button>
        </div>

        {/* Popular Tags */}
        <div>
          <p className="text-xs font-semibold text-foreground uppercase opacity-70 mb-2">
            Popular Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {["Fantasy", "Mystery", "Romance", "Sci-Fi", "Horror", "Drama"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  if (!tags.find((t) => t.name === tag)) {
                    setTags([
                      ...tags,
                      {
                        id: Date.now().toString(),
                        name: tag,
                        color: defaultColors[Math.floor(Math.random() * defaultColors.length)],
                      },
                    ]);
                  }
                }}
                className="px-2 py-1 rounded-full text-xs border border-border/50 hover:bg-secondary/40 transition-colors text-muted-foreground hover:text-foreground"
              >
                +{tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
