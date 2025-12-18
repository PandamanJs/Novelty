import { useState, useMemo } from "react";
import { BarChart3, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface ReadabilityStats {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  avgWordLength: number;
  avgSentenceLength: number;
  readingTimeMinutes: number;
  gradeLevel: string;
  readabilityScore: number;
  complexSentences: number;
  passiveVoiceCount: number;
}

interface ReadabilityAnalyzerProps {
  content?: string;
}

export function ReadabilityAnalyzer({ content = "" }: ReadabilityAnalyzerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const stats = useMemo(() => {
    if (!content.trim()) {
      return {
        wordCount: 0,
        sentenceCount: 0,
        paragraphCount: 0,
        avgWordLength: 0,
        avgSentenceLength: 0,
        readingTimeMinutes: 0,
        gradeLevel: "N/A",
        readabilityScore: 0,
        complexSentences: 0,
        passiveVoiceCount: 0,
      };
    }

    const words = content.trim().split(/\s+/);
    const wordCount = words.length;
    const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const sentenceCount = sentences.length;
    const paragraphs = content.split(/\n\n+/).filter((p) => p.trim().length > 0);
    const paragraphCount = paragraphs.length;

    const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / wordCount;
    const avgSentenceLength = wordCount / Math.max(sentenceCount, 1);

    const readingTimeMinutes = Math.ceil(wordCount / 200);

    // Flesch-Kincaid Grade Level
    let gradeLevel = "Elementary";
    const fleschKincaid = 0.39 * avgSentenceLength + 11.8 * (avgWordLength / 5) - 15.59;
    if (fleschKincaid < 6) gradeLevel = "Elementary";
    else if (fleschKincaid < 9) gradeLevel = "Middle School";
    else if (fleschKincaid < 13) gradeLevel = "High School";
    else if (fleschKincaid < 16) gradeLevel = "College";
    else gradeLevel = "Graduate";

    const readabilityScore = Math.max(0, Math.min(100, 100 - fleschKincaid * 3.6));

    // Complex sentences (more than 20 words)
    const complexSentences = sentences.filter(
      (s) => s.split(/\s+/).length > 20
    ).length;

    // Passive voice detection (simple heuristic)
    const passiveVoiceCount = (content.match(/\b(is|are|was|were|be|been|being)\s+\w+ed\b/g) || [])
      .length;

    return {
      wordCount,
      sentenceCount,
      paragraphCount,
      avgWordLength: Math.round(avgWordLength * 10) / 10,
      avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
      readingTimeMinutes,
      gradeLevel,
      readabilityScore: Math.round(readabilityScore),
      complexSentences,
      passiveVoiceCount,
    };
  }, [content]);

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start text-gray-600 hover:text-black hover:bg-gray-100"
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        <span>Readability</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-96 p-4 z-50 shadow-lg border border-gray-200 bg-white max-h-96 overflow-y-auto fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" style={{ color: "#0071e3" }} />
          <h3 className="font-semibold text-black">Readability Analysis</h3>
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
        {/* Readability Score */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/10 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-foreground uppercase">Overall Score</p>
            <span className="text-3xl font-bold text-purple-400">{stats.readabilityScore}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${stats.readabilityScore}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {stats.readabilityScore > 70
              ? "✓ Excellent readability"
              : stats.readabilityScore > 50
              ? "→ Good readability"
              : "⚠ Improve readability"}
          </p>
        </div>

        {/* Grade Level */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-border/50 bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1 uppercase">Grade Level</p>
            <p className="text-lg font-bold text-foreground">{stats.gradeLevel}</p>
          </div>
          <div className="p-3 rounded-lg border border-border/50 bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1 uppercase">Reading Time</p>
            <p className="text-lg font-bold text-foreground">{stats.readingTimeMinutes} min</p>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between p-2 rounded bg-secondary/20">
            <span className="text-muted-foreground">Words</span>
            <span className="font-medium text-foreground">{stats.wordCount}</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-secondary/20">
            <span className="text-muted-foreground">Sentences</span>
            <span className="font-medium text-foreground">{stats.sentenceCount}</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-secondary/20">
            <span className="text-muted-foreground">Avg Sentence Length</span>
            <span className="font-medium text-foreground">{stats.avgSentenceLength} words</span>
          </div>
          <div className="flex justify-between p-2 rounded bg-secondary/20">
            <span className="text-muted-foreground">Avg Word Length</span>
            <span className="font-medium text-foreground">{stats.avgWordLength} chars</span>
          </div>
        </div>

        {/* Issues */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground uppercase opacity-70">
            Areas to Improve
          </p>
          <div className="space-y-1.5 text-xs">
            {stats.complexSentences > 0 && (
              <div className="p-2 rounded bg-yellow-500/10 border border-yellow-500/30">
                <span className="text-yellow-600">⚠</span>
                <span className="text-muted-foreground ml-2">
                  {stats.complexSentences} complex sentence{stats.complexSentences > 1 ? "s" : ""} - consider breaking them up
                </span>
              </div>
            )}
            {stats.passiveVoiceCount > 2 && (
              <div className="p-2 rounded bg-orange-500/10 border border-orange-500/30">
                <span className="text-orange-600">◆</span>
                <span className="text-muted-foreground ml-2">
                  {stats.passiveVoiceCount} instances of passive voice - use active voice more
                </span>
              </div>
            )}
            {stats.avgWordLength > 5.5 && (
              <div className="p-2 rounded bg-blue-500/10 border border-blue-500/30">
                <span className="text-blue-600">ℹ</span>
                <span className="text-muted-foreground ml-2">
                  Long words detected - consider simpler alternatives
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
