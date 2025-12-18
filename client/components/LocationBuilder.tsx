import { useState } from "react";
import { MapPin, Plus, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface Location {
  id: string;
  name: string;
  type: string;
  description: string;
}

interface LocationBuilderProps {
  onInsert?: (location: string) => void;
}

export function LocationBuilder({ onInsert }: LocationBuilderProps) {
  const [locations, setLocations] = useState<Location[]>([
    { id: "1", name: "Castle", type: "Building", description: "" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [newLoc, setNewLoc] = useState({ name: "", type: "", description: "" });

  const addLocation = () => {
    if (newLoc.name.trim()) {
      setLocations([
        ...locations,
        {
          id: Date.now().toString(),
          ...newLoc,
        },
      ]);
      setNewLoc({ name: "", type: "", description: "" });
    }
  };

  const deleteLocation = (id: string) => {
    setLocations(locations.filter((l) => l.id !== id));
  };

  const insertLocation = (location: Location) => {
    const text = `[Location: ${location.name} (${location.type})]`;
    onInsert?.(text);
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start text-gray-600 hover:text-black hover:bg-gray-100"
      >
        <span>View Locations</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-96 p-4 z-50 shadow-lg border border-gray-200 bg-white max-h-96 overflow-y-auto fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" style={{ color: "#0071e3" }} />
          <h3 className="font-semibold text-black">Locations</h3>
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

      <div className="space-y-2 mb-4">
        {locations.map((loc) => (
          <div key={loc.id} className="p-3 rounded-lg border border-border/50 hover:bg-secondary/20 group">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{loc.name}</p>
                <p className="text-xs text-muted-foreground">{loc.type}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => insertLocation(loc)}
                  className="h-6 w-6 p-0 text-xs"
                >
                  +
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteLocation(loc.id)}
                  className="h-6 w-6 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
            {loc.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {loc.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Add Location Form */}
      <div className="space-y-3 p-3 rounded-lg bg-secondary/30 border border-border/50">
        <Input
          placeholder="Location name"
          value={newLoc.name}
          onChange={(e) => setNewLoc({ ...newLoc, name: e.target.value })}
          className="h-8 text-sm"
        />
        <Input
          placeholder="Type (e.g., City, Forest, Castle)"
          value={newLoc.type}
          onChange={(e) => setNewLoc({ ...newLoc, type: e.target.value })}
          className="h-8 text-sm"
        />
        <Textarea
          placeholder="Description..."
          value={newLoc.description}
          onChange={(e) =>
            setNewLoc({ ...newLoc, description: e.target.value })
          }
          className="min-h-16 text-sm resize-none"
        />
        <Button
          onClick={addLocation}
          size="sm"
          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white gap-2 rounded-lg font-semibold border-0"
        >
          <Plus className="w-4 h-4" />
          Add Location
        </Button>
      </div>
    </Card>
  );
}
