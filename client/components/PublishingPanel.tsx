import { useState } from "react";
import { Clock, Plus, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface PublishSettings {
  status: "draft" | "scheduled" | "published";
  publishDate: string;
  publishTime: string;
  visibility: "private" | "friends" | "public";
  allowComments: boolean;
  pinned: boolean;
}

export function PublishingPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<PublishSettings>({
    status: "draft",
    publishDate: new Date().toISOString().split("T")[0],
    publishTime: "09:00",
    visibility: "public",
    allowComments: true,
    pinned: false,
  });

  const handleChange = (field: keyof PublishSettings, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start text-gray-600 hover:text-black hover:bg-gray-100"
      >
        <Clock className="w-4 h-4 mr-2" />
        <span>Publish Settings</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-96 p-4 z-50 shadow-lg border border-gray-200 bg-white max-h-96 overflow-y-auto fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" style={{ color: "#0071e3" }} />
          <h3 className="font-semibold text-black">Publishing</h3>
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
        {/* Status */}
        <div>
          <label className="text-xs font-semibold text-foreground uppercase opacity-70 block mb-2">
            Status
          </label>
          <div className="flex gap-2">
            {(["draft", "scheduled", "published"] as const).map((status) => (
              <Button
                key={status}
                size="sm"
                variant={settings.status === status ? "default" : "outline"}
                onClick={() => handleChange("status", status)}
                className="flex-1 capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* Schedule */}
        {settings.status === "scheduled" && (
          <div className="p-3 rounded-lg border border-border/50 bg-secondary/30 space-y-3">
            <div>
              <label className="text-xs font-semibold text-foreground uppercase opacity-70">
                Publish Date
              </label>
              <Input
                type="date"
                value={settings.publishDate}
                onChange={(e) => handleChange("publishDate", e.target.value)}
                className="h-8 text-sm mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground uppercase opacity-70">
                Publish Time
              </label>
              <Input
                type="time"
                value={settings.publishTime}
                onChange={(e) => handleChange("publishTime", e.target.value)}
                className="h-8 text-sm mt-1"
              />
            </div>
          </div>
        )}

        {/* Visibility */}
        <div>
          <label className="text-xs font-semibold text-foreground uppercase opacity-70 block mb-2">
            Visibility
          </label>
          <select
            value={settings.visibility}
            onChange={(e) =>
              handleChange("visibility", e.target.value as PublishSettings["visibility"])
            }
            className="w-full h-8 px-3 text-sm rounded border border-border bg-background text-foreground"
          >
            <option value="private">Private (Only me)</option>
            <option value="friends">Friends Only</option>
            <option value="public">Public</option>
          </select>
        </div>

        {/* Options */}
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 rounded border border-border/50 hover:bg-secondary/20 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={settings.allowComments}
              onChange={(e) => handleChange("allowComments", e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-foreground">Allow comments</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded border border-border/50 hover:bg-secondary/20 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={settings.pinned}
              onChange={(e) => handleChange("pinned", e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-foreground">Pin to top</span>
          </label>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2 border-t border-border/50">
          <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold">
            {settings.status === "published" ? "Update Published" : "Publish Now"}
          </Button>
          <Button variant="outline" className="w-full">
            Save as Draft
          </Button>
        </div>
      </div>
    </Card>
  );
}
