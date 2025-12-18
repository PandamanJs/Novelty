import { useState } from "react";
import { BookMarked, Plus, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface Scene {
  id: string;
  chapterNum: number;
  title: string;
  summary: string;
}

export function ScenePlanner() {
  const [scenes, setScenes] = useState<Scene[]>([
    {
      id: "1",
      chapterNum: 1,
      title: "The Beginning",
      summary: "Introduce the main character",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [newScene, setNewScene] = useState({ chapterNum: 1, title: "", summary: "" });

  const addScene = () => {
    if (newScene.title.trim()) {
      setScenes([
        ...scenes,
        {
          id: Date.now().toString(),
          ...newScene,
        },
      ]);
      setNewScene({ chapterNum: 1, title: "", summary: "" });
    }
  };

  const deleteScene = (id: string) => {
    setScenes(scenes.filter((s) => s.id !== id));
  };

  const moveSceneUp = (id: string) => {
    const index = scenes.findIndex((s) => s.id === id);
    if (index > 0) {
      const newScenes = [...scenes];
      [newScenes[index], newScenes[index - 1]] = [
        newScenes[index - 1],
        newScenes[index],
      ];
      setScenes(newScenes);
    }
  };

  const moveSceneDown = (id: string) => {
    const index = scenes.findIndex((s) => s.id === id);
    if (index < scenes.length - 1) {
      const newScenes = [...scenes];
      [newScenes[index], newScenes[index + 1]] = [
        newScenes[index + 1],
        newScenes[index],
      ];
      setScenes(newScenes);
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
        <span>View Scenes</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-96 p-4 z-50 shadow-lg border border-gray-200 bg-white max-h-96 overflow-y-auto fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookMarked className="w-5 h-5" style={{ color: "#0071e3" }} />
          <h3 className="font-semibold text-black">Scene Planner</h3>
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

      <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
        {scenes.map((scene, index) => (
          <div
            key={scene.id}
            className="p-3 rounded-lg border border-border/50 hover:bg-secondary/20 group text-sm"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-secondary/50 text-xs font-medium">
                    Ch. {scene.chapterNum}
                  </span>
                  <p className="font-medium text-foreground truncate">{scene.title}</p>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {index > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveSceneUp(scene.id)}
                    className="h-6 w-6 p-0 text-xs"
                    title="Move up"
                  >
                    ↑
                  </Button>
                )}
                {index < scenes.length - 1 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveSceneDown(scene.id)}
                    className="h-6 w-6 p-0 text-xs"
                    title="Move down"
                  >
                    ↓
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteScene(scene.id)}
                  className="h-6 w-6 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
            {scene.summary && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {scene.summary}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Add Scene Form */}
      <div className="space-y-3 p-3 rounded-lg bg-secondary/30 border border-border/50">
        <Input
          placeholder="Chapter number"
          type="number"
          min="1"
          value={newScene.chapterNum}
          onChange={(e) =>
            setNewScene({ ...newScene, chapterNum: parseInt(e.target.value) || 1 })
          }
          className="h-8 text-sm"
        />
        <Input
          placeholder="Scene title"
          value={newScene.title}
          onChange={(e) => setNewScene({ ...newScene, title: e.target.value })}
          className="h-8 text-sm"
        />
        <Textarea
          placeholder="Scene summary..."
          value={newScene.summary}
          onChange={(e) =>
            setNewScene({ ...newScene, summary: e.target.value })
          }
          className="min-h-16 text-sm resize-none"
        />
        <Button
          onClick={addScene}
          size="sm"
          className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white gap-2 rounded-lg font-semibold border-0"
        >
          <Plus className="w-4 h-4" />
          Add Scene
        </Button>
      </div>
    </Card>
  );
}
