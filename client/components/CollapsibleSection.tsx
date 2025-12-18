import { ChevronDown, ChevronRight } from "lucide-react";

export function CollapsibleSection({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 border-t border-gray-200 first:border-t-0 pt-3 first:pt-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-1 hover:opacity-80 transition-opacity"
      >
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        )}
        <p className="text-xs font-bold text-gray-900 uppercase tracking-wide opacity-60 flex-1">
          {title}
        </p>
      </button>
      {expanded && <div className="space-y-2">{children}</div>}
    </div>
  );
}
