import { useState } from "react";
import { Zap, Plus, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface CharacterArc {
  id: string;
  characterName: string;
  startTraits: string;
  endTraits: string;
  keyMoments: string;
}

export function CharacterArcTracker() {
  const [arcs, setArcs] = useState<CharacterArc[]>([
    {
      id: "1",
      characterName: "Protagonist",
      startTraits: "Fearful, Uncertain",
      endTraits: "Brave, Confident",
      keyMoments: "Faces first challenge",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [newArc, setNewArc] = useState({
    characterName: "",
    startTraits: "",
    endTraits: "",
    keyMoments: "",
  });

  const addArc = () => {
    if (newArc.characterName.trim()) {
      setArcs([
        ...arcs,
        {
          id: Date.now().toString(),
          ...newArc,
        },
      ]);
      setNewArc({
        characterName: "",
        startTraits: "",
        endTraits: "",
        keyMoments: "",
      });
    }
  };

  const deleteArc = (id: string) => {
    setArcs(arcs.filter((a) => a.id !== id));
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start text-gray-600 hover:text-black hover:bg-gray-100"
      >
        <span>View Arcs</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-96 p-4 z-50 shadow-lg border border-gray-200 bg-white max-h-96 overflow-y-auto fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5" style={{ color: "#0071e3" }} />
          <h3 className="font-semibold text-black">Character Arcs</h3>
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

      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
        {arcs.map((arc) => (
          <div key={arc.id} className="p-3 rounded-lg border border-border/50 hover:bg-secondary/20 group text-sm">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="font-semibold text-foreground">{arc.characterName}</p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => deleteArc(arc.id)}
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-muted-foreground font-medium">Start: </span>
                <span className="text-foreground">{arc.startTraits}</span>
              </div>
              <div className="text-center text-muted-foreground">↓</div>
              <div>
                <span className="text-muted-foreground font-medium">End: </span>
                <span className="text-foreground">{arc.endTraits}</span>
              </div>
              <div>
                <span className="text-muted-foreground font-medium">Key moments: </span>
                <span className="text-foreground line-clamp-1">{arc.keyMoments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Arc Form */}
      <div className="space-y-3 p-3 rounded-lg bg-secondary/30 border border-border/50">
        <Input
          placeholder="Character name"
          value={newArc.characterName}
          onChange={(e) => setNewArc({ ...newArc, characterName: e.target.value })}
          className="h-8 text-sm"
        />
        <Input
          placeholder="Start traits (e.g., Weak, Uncertain)"
          value={newArc.startTraits}
          onChange={(e) => setNewArc({ ...newArc, startTraits: e.target.value })}
          className="h-8 text-sm"
        />
        <Input
          placeholder="End traits (e.g., Strong, Confident)"
          value={newArc.endTraits}
          onChange={(e) => setNewArc({ ...newArc, endTraits: e.target.value })}
          className="h-8 text-sm"
        />
        <Input
          placeholder="Key transformation moments"
          value={newArc.keyMoments}
          onChange={(e) => setNewArc({ ...newArc, keyMoments: e.target.value })}
          className="h-8 text-sm"
        />
        <Button
          onClick={addArc}
          size="sm"
          className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white gap-2 rounded-lg font-semibold border-0"
        >
          <Plus className="w-4 h-4" />
          Add Arc
        </Button>
      </div>
    </Card>
  );
}
