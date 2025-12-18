import { useState } from "react";
import { Users, Plus, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface Character {
  id: string;
  name: string;
  role: string;
  traits: string;
}

interface CharacterBuilderProps {
  onInsert?: (character: string) => void;
}

export function CharacterBuilder({ onInsert }: CharacterBuilderProps) {
  const [characters, setCharacters] = useState<Character[]>([
    { id: "1", name: "Protagonist", role: "Main character", traits: "" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [newChar, setNewChar] = useState({ name: "", role: "", traits: "" });

  const addCharacter = () => {
    if (newChar.name.trim()) {
      setCharacters([
        ...characters,
        {
          id: Date.now().toString(),
          ...newChar,
        },
      ]);
      setNewChar({ name: "", role: "", traits: "" });
    }
  };

  const deleteCharacter = (id: string) => {
    setCharacters(characters.filter((c) => c.id !== id));
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="text-muted-foreground hover:text-foreground gap-2"
      >
        <Users className="w-4 h-4" />
        <span className="hidden sm:inline">Characters</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-96 p-4 z-50 shadow-lg border border-border bg-background max-h-96 overflow-y-auto slide-in-right">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" style={{ color: "#789cac" }} />
          <h3 className="font-semibold text-foreground">Characters</h3>
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
        {characters.map((char) => (
          <div key={char.id} className="p-3 rounded-lg border border-border/50 hover:bg-secondary/20 group">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{char.name}</p>
                <p className="text-xs text-muted-foreground">{char.role}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteCharacter(char.id)}
                className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            {char.traits && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {char.traits}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-3 p-3 bg-secondary/20 rounded-lg">
        <Input
          placeholder="Character name"
          value={newChar.name}
          onChange={(e) => setNewChar({ ...newChar, name: e.target.value })}
          className="text-sm h-8"
        />
        <Input
          placeholder="Role (protagonist, antagonist...)"
          value={newChar.role}
          onChange={(e) => setNewChar({ ...newChar, role: e.target.value })}
          className="text-sm h-8"
        />
        <Textarea
          placeholder="Traits and details"
          value={newChar.traits}
          onChange={(e) => setNewChar({ ...newChar, traits: e.target.value })}
          className="text-sm h-16 resize-none"
        />
      </div>

      <Button
        size="sm"
        onClick={addCharacter}
        className="w-full gap-2"
        style={{ backgroundColor: "#817395" }}
      >
        <Plus className="w-4 h-4" />
        Add Character
      </Button>
    </Card>
  );
}
