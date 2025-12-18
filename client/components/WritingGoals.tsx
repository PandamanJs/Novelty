import { useState } from "react";
import { Target, Plus, Trash2, X, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  completed: boolean;
}

interface WritingGoalsProps {
  wordCount?: number;
}

export function WritingGoals({ wordCount = 0 }: WritingGoalsProps) {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Daily Writing",
      target: 1000,
      current: wordCount,
      deadline: "Today",
      completed: false,
    },
    {
      id: "2",
      title: "Weekly Goal",
      target: 7000,
      current: wordCount,
      deadline: "This Week",
      completed: false,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleGoal = (id: string) => {
    setGoals(
      goals.map((g) =>
        g.id === id ? { ...g, completed: !g.completed } : g
      )
    );
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const totalProgress = Math.round(
    (goals.reduce((sum, g) => sum + (g.current / g.target), 0) / goals.length) *
      100
  );

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="text-muted-foreground hover:text-foreground gap-2"
      >
        <Target className="w-4 h-4" />
        <span className="hidden sm:inline">{completedCount}/{goals.length}</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-96 p-4 z-50 shadow-lg border border-border bg-background">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5" style={{ color: "#91b2c7" }} />
          <h3 className="font-semibold text-foreground">Writing Goals</h3>
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

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-medium text-foreground">{totalProgress}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all"
            style={{
              width: `${totalProgress}%`,
              backgroundColor: "#789cac",
            }}
          />
        </div>
      </div>

      <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="p-3 rounded-lg border border-border/50 hover:bg-secondary/20"
          >
            <div className="flex items-start gap-3 mb-2">
              <button
                onClick={() => toggleGoal(goal.id)}
                className="mt-1 flex-shrink-0"
              >
                <CheckCircle2
                  className="w-5 h-5 transition-colors"
                  style={{
                    color: goal.completed ? "#789cac" : "#6c7c80",
                  }}
                />
              </button>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${goal.completed ? "line-through opacity-60" : ""}`}>
                  {goal.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {goal.current}/{goal.target} words • {goal.deadline}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteGoal(goal.id)}
                className="h-5 w-5 p-0"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            <div className="ml-8 w-full bg-secondary rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                  backgroundColor: "#91b2c7",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
