import { useState } from "react";
import { Image as ImageIcon, Plus, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface CoverImage {
  id: string;
  url: string;
  title: string;
}

const sampleCovers = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop",
    title: "Mountain Landscape",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1488994622519-e21cc028cb29?w=500&h=300&fit=crop",
    title: "City Lights",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
    title: "Ocean",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    title: "Forest",
  },
];

interface CoverImageManagerProps {
  onImageSelect?: (imageUrl: string) => void;
}

export function CoverImageManager({ onImageSelect }: CoverImageManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCover, setSelectedCover] = useState<CoverImage | null>(null);
  const [customUrl, setCustomUrl] = useState("");

  const handleSelect = (cover: CoverImage) => {
    setSelectedCover(cover);
    onImageSelect?.(cover.url);
  };

  const handleCustomUrl = () => {
    if (customUrl.trim()) {
      const cover: CoverImage = {
        id: Date.now().toString(),
        url: customUrl,
        title: "Custom Cover",
      };
      handleSelect(cover);
      setCustomUrl("");
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary/40"
      >
        <ImageIcon className="w-4 h-4 mr-2" />
        <span>Cover Image</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-96 p-4 z-50 shadow-lg border border-border bg-background max-h-96 overflow-y-auto slide-in-right">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" style={{ color: "#f59e0b" }} />
          <h3 className="font-semibold text-foreground">Cover Image</h3>
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
        {/* Current Cover */}
        {selectedCover && (
          <div>
            <p className="text-xs font-semibold text-foreground uppercase opacity-70 mb-2">
              Current Cover
            </p>
            <div className="relative rounded-lg overflow-hidden border border-border/50">
              <img
                src={selectedCover.url}
                alt={selectedCover.title}
                className="w-full h-40 object-cover"
              />
            </div>
          </div>
        )}

        {/* Upload Custom */}
        <div className="p-3 rounded-lg border border-border/50 bg-secondary/30 space-y-2">
          <label className="text-xs font-semibold text-foreground uppercase opacity-70">
            Image URL
          </label>
          <Input
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="h-8 text-sm"
          />
          <Button
            onClick={handleCustomUrl}
            size="sm"
            disabled={!customUrl.trim()}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Use Custom URL
          </Button>
        </div>

        {/* Stock Images */}
        <div>
          <p className="text-xs font-semibold text-foreground uppercase opacity-70 mb-2">
            Stock Images
          </p>
          <div className="grid grid-cols-2 gap-2">
            {sampleCovers.map((cover) => (
              <button
                key={cover.id}
                onClick={() => handleSelect(cover)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                  selectedCover?.id === cover.id
                    ? "border-amber-500"
                    : "border-border/50 hover:border-border"
                }`}
              >
                <img
                  src={cover.url}
                  alt={cover.title}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Generate AI Cover */}
        <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold border-0">
          ✨ Generate AI Cover
        </Button>
      </div>
    </Card>
  );
}
