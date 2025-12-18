import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import { Button } from "./ui/button";

interface WritingTimerProps {
  onComplete?: () => void;
}

export function WritingTimer({ onComplete }: WritingTimerProps) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsRunning(false);
          onComplete?.();
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, onComplete]);

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (!isExpanded) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(true)}
        className="w-full justify-start text-gray-600 hover:text-black hover:bg-gray-100"
      >
        <Clock className="w-4 h-4 mr-2" />
        <span className="font-mono">{formatTime}</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 fade-in-up">
      <Clock className={`w-4 h-4 text-gray-600 ${isRunning ? 'animate-pulse' : ''}`} />
      <span className={`text-sm font-mono font-semibold text-black ${isRunning ? '' : ''}`}>
        {formatTime}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTimer}
        className="h-6 w-6 p-0"
      >
        {isRunning ? (
          <Pause className="w-3 h-3" />
        ) : (
          <Play className="w-3 h-3" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleReset}
        className="h-6 w-6 p-0"
      >
        <RotateCcw className="w-3 h-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(false)}
        className="h-6 w-6 p-0 text-xs"
      >
        ✕
      </Button>
    </div>
  );
}
