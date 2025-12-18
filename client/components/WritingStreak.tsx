import { useState, useEffect } from "react";
import { Flame, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastWriteDate: string;
  totalWritingDays: number;
}

interface WritingStreakProps {
  wordCount?: number;
}

export function WritingStreak({ wordCount = 0 }: WritingStreakProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 3,
    longestStreak: 15,
    lastWriteDate: new Date().toISOString().split("T")[0],
    totalWritingDays: 42,
  });

  // Update streak if words written today
  useEffect(() => {
    if (wordCount > 0) {
      const today = new Date().toISOString().split("T")[0];
      setStreak((prev) => {
        if (prev.lastWriteDate === today) {
          return prev; // Already counted today
        }
        const isConsecutive = isYesterday(prev.lastWriteDate);
        return {
          ...prev,
          lastWriteDate: today,
          currentStreak: isConsecutive ? prev.currentStreak + 1 : 1,
          longestStreak: Math.max(
            prev.longestStreak,
            isConsecutive ? prev.currentStreak + 1 : 1
          ),
          totalWritingDays: prev.totalWritingDays + 1,
        };
      });
    }
  }, []);

  const isYesterday = (dateStr: string) => {
    const date = new Date(dateStr);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toISOString().split("T")[0] === yesterday.toISOString().split("T")[0];
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start text-gray-600 hover:text-black hover:bg-gray-100"
      >
        <Flame className="w-4 h-4 text-orange-500 mr-2" />
        <span>{streak.currentStreak} day streak</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-80 p-6 z-50 shadow-lg border border-gray-200 bg-white fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-black">Writing Streak</h3>
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
        {/* Current Streak */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/30">
          <p className="text-sm text-muted-foreground mb-2">Current Streak</p>
          <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text">
            {streak.currentStreak} days
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Keep writing to maintain your streak!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Longest Streak */}
          <div className="p-3 rounded-lg border border-border/50 bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1">Longest Streak</p>
            <p className="text-2xl font-bold text-foreground">
              {streak.longestStreak}
            </p>
          </div>

          {/* Total Days */}
          <div className="p-3 rounded-lg border border-border/50 bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1">Total Days</p>
            <p className="text-2xl font-bold text-foreground">
              {streak.totalWritingDays}
            </p>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Achievements</p>
          <div className="space-y-1.5 text-xs">
            {streak.totalWritingDays >= 7 && (
              <div className="flex items-center gap-2 p-2 rounded bg-secondary/30 border border-border/50">
                <span className="text-lg">🏅</span>
                <span className="text-muted-foreground">Week Warrior</span>
              </div>
            )}
            {streak.longestStreak >= 10 && (
              <div className="flex items-center gap-2 p-2 rounded bg-secondary/30 border border-border/50">
                <span className="text-lg">🔥</span>
                <span className="text-muted-foreground">10-Day Streak</span>
              </div>
            )}
            {streak.totalWritingDays >= 30 && (
              <div className="flex items-center gap-2 p-2 rounded bg-secondary/30 border border-border/50">
                <span className="text-lg">⭐</span>
                <span className="text-muted-foreground">Month Master</span>
              </div>
            )}
            {streak.totalWritingDays < 7 && (
              <div className="text-xs text-muted-foreground italic p-2">
                Write consistently to unlock achievements!
              </div>
            )}
          </div>
        </div>

        {/* Motivation */}
        <div className="p-3 rounded-lg bg-secondary/20 border border-border/50 text-sm text-muted-foreground">
          <p className="text-center">
            {streak.currentStreak === 1
              ? "You just started! Keep it going! 💪"
              : streak.currentStreak < 7
              ? `${7 - streak.currentStreak} days until a week! 🚀`
              : streak.currentStreak < 30
              ? `You're on fire! 🔥 ${30 - streak.currentStreak} days to a month!`
              : "You're a writing machine! Keep crushing it! 💯"}
          </p>
        </div>
      </div>
    </Card>
  );
}
