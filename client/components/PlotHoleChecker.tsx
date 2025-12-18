import { useState } from "react";
import { BookOpen, Plus, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface PlotPoint {
  id: string;
  event: string;
  chapter: number;
  importance: "low" | "medium" | "high";
}

const commonWords = {
  synonyms: {
    said: ["whispered", "shouted", "exclaimed", "muttered", "replied", "stated"],
    happy: ["joyful", "delighted", "ecstatic", "pleased", "cheerful", "content"],
    sad: ["melancholy", "sorrowful", "dejected", "gloomy", "downhearted", "miserable"],
    angry: ["furious", "enraged", "livid", "incensed", "seething", "infuriated"],
    scared: ["terrified", "petrified", "frightened", "alarmed", "anxious", "uneasy"],
    beautiful: ["gorgeous", "stunning", "exquisite", "radiant", "magnificent", "lovely"],
    big: ["enormous", "massive", "gigantic", "vast", "colossal", "immense"],
    small: ["tiny", "petite", "minuscule", "diminutive", "compact", "wee"],
  },
};

export function PlotHoleChecker() {
  const [plotPoints, setPlotPoints] = useState<PlotPoint[]>([
    {
      id: "1",
      event: "Hero gets magical sword",
      chapter: 3,
      importance: "high",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [showThesaurus, setShowThesaurus] = useState(false);
  const [selectedWord, setSelectedWord] = useState<keyof typeof commonWords.synonyms | null>(null);
  const [newPoint, setNewPoint] = useState<{
    event: string;
    chapter: number;
    importance: "low" | "medium" | "high";
  }>({ event: "", chapter: 1, importance: "high" });

  const addPlotPoint = () => {
    if (newPoint.event.trim()) {
      setPlotPoints([
        ...plotPoints,
        {
          id: Date.now().toString(),
          ...newPoint,
        },
      ]);
      setNewPoint({ event: "", chapter: 1, importance: "high" });
    }
  };

  const deletePlotPoint = (id: string) => {
    setPlotPoints(plotPoints.filter((p) => p.id !== id));
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "text-red-500 bg-red-500/10";
      case "medium":
        return "text-yellow-500 bg-yellow-500/10";
      case "low":
        return "text-blue-500 bg-blue-500/10";
      default:
        return "text-muted-foreground";
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start text-gray-600 hover:text-black hover:bg-gray-100"
      >
        <span>Plot & Thesaurus</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-96 p-4 z-50 shadow-lg border border-gray-200 bg-white max-h-96 overflow-y-auto fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" style={{ color: "#0071e3" }} />
          <h3 className="font-semibold text-black text-sm">Writing Tools</h3>
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

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4 border-b border-border/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowThesaurus(false)}
          className={`text-xs rounded-none border-b-2 transition-colors ${
            !showThesaurus
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground"
          }`}
        >
          Plot Points
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowThesaurus(true)}
          className={`text-xs rounded-none border-b-2 transition-colors ${
            showThesaurus
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground"
          }`}
        >
          Thesaurus
        </Button>
      </div>

      {/* Plot Points Tab */}
      {!showThesaurus && (
        <div>
          <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
            {plotPoints.map((point) => (
              <div
                key={point.id}
                className="p-2 rounded border border-border/50 bg-secondary/20 text-sm group"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-xs">
                      {point.event}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deletePlotPoint(point.id)}
                    className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Ch. {point.chapter}</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${getImportanceColor(point.importance)}`}>
                    {point.importance}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Plot Point Form */}
          <div className="space-y-2 p-3 rounded-lg bg-secondary/30 border border-border/50">
            <Input
              placeholder="Plot event"
              value={newPoint.event}
              onChange={(e) => setNewPoint({ ...newPoint, event: e.target.value })}
              className="h-8 text-sm"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Chapter"
                type="number"
                min="1"
                value={newPoint.chapter}
                onChange={(e) =>
                  setNewPoint({ ...newPoint, chapter: parseInt(e.target.value) || 1 })
                }
                className="h-8 text-sm flex-1"
              />
              <select
                value={newPoint.importance}
                onChange={(e) =>
                  setNewPoint({
                    ...newPoint,
                    importance: e.target.value as "low" | "medium" | "high",
                  })
                }
                className="h-8 px-2 text-sm rounded border border-border bg-background"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <Button
              onClick={addPlotPoint}
              size="sm"
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white gap-2 rounded-lg font-semibold border-0"
            >
              <Plus className="w-4 h-4" />
              Add Point
            </Button>
          </div>
        </div>
      )}

      {/* Thesaurus Tab */}
      {showThesaurus && (
        <div>
          <div className="space-y-2 mb-4">
            {Object.keys(commonWords.synonyms).map((word) => (
              <Button
                key={word}
                variant="outline"
                size="sm"
                onClick={() =>
                  setSelectedWord(
                    selectedWord === word ? null : (word as keyof typeof commonWords.synonyms)
                  )
                }
                className="w-full justify-start font-medium"
              >
                {word}
              </Button>
            ))}
          </div>

          {selectedWord && (
            <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
              <p className="text-xs font-semibold text-foreground mb-2 uppercase">
                Alternatives to "{selectedWord}"
              </p>
              <div className="space-y-1">
                {commonWords.synonyms[selectedWord].map((syn) => (
                  <div
                    key={syn}
                    className="p-2 rounded bg-secondary/50 border border-border/50 hover:bg-secondary cursor-pointer transition-colors group"
                  >
                    <p className="text-sm text-foreground group-hover:text-purple-400">
                      {syn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
