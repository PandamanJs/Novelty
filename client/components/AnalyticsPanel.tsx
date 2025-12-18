import { useState } from "react";
import { BarChart3, TrendingUp, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface AnalyticsData {
  views: number;
  reads: number;
  likes: number;
  shares: number;
  timeOnPage: number;
  bounceRate: number;
  avgViewDuration: number;
}

export function AnalyticsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [analytics] = useState<AnalyticsData>({
    views: 1250,
    reads: 842,
    likes: 156,
    shares: 43,
    timeOnPage: 4.5,
    bounceRate: 23,
    avgViewDuration: 3.2,
  });

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary/40"
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        <span>Analytics</span>
      </Button>
    );
  }

  return (
    <Card className="absolute top-full mt-2 right-0 w-96 p-4 z-50 shadow-lg border border-border bg-background max-h-96 overflow-y-auto slide-in-right">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" style={{ color: "#06b6d4" }} />
          <h3 className="font-semibold text-foreground">Analytics</h3>
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
        {/* Main Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-border/50 bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1 uppercase">Views</p>
            <p className="text-2xl font-bold text-cyan-400">{analytics.views}</p>
            <p className="text-xs text-green-500 mt-1">↑ 12% vs last week</p>
          </div>
          <div className="p-3 rounded-lg border border-border/50 bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1 uppercase">Reads</p>
            <p className="text-2xl font-bold text-blue-400">{analytics.reads}</p>
            <p className="text-xs text-green-500 mt-1">↑ 8% vs last week</p>
          </div>
          <div className="p-3 rounded-lg border border-border/50 bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1 uppercase">Likes</p>
            <p className="text-2xl font-bold text-pink-400">{analytics.likes}</p>
            <p className="text-xs text-red-500 mt-1">↓ 3% vs last week</p>
          </div>
          <div className="p-3 rounded-lg border border-border/50 bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1 uppercase">Shares</p>
            <p className="text-2xl font-bold text-purple-400">{analytics.shares}</p>
            <p className="text-xs text-green-500 mt-1">↑ 15% vs last week</p>
          </div>
        </div>

        {/* Read Through Rate */}
        <div className="p-3 rounded-lg border border-border/50 bg-secondary/30">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-foreground uppercase">Read-Through Rate</p>
            <span className="text-sm font-bold text-green-500">67%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: "67%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Most readers finish your stories</p>
        </div>

        {/* Engagement Metrics */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground uppercase opacity-70">
            Engagement
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 rounded bg-secondary/20">
              <span className="text-muted-foreground">Avg Time on Page</span>
              <span className="font-medium text-foreground">{analytics.timeOnPage.toFixed(1)} min</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-secondary/20">
              <span className="text-muted-foreground">Bounce Rate</span>
              <span className="font-medium text-foreground">{analytics.bounceRate}%</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-secondary/20">
              <span className="text-muted-foreground">Avg View Duration</span>
              <span className="font-medium text-foreground">{analytics.avgViewDuration.toFixed(1)} min</span>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Your Top Performer</p>
              <p className="text-xs text-muted-foreground">
                "The Journey Begins" is your most-read story with 2.3k views. Keep creating similar content!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
