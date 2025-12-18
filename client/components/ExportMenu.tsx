import { Download, FileText } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { exportAsText, exportAsMarkdown, exportAsHTML } from "@/lib/export";

interface ExportMenuProps {
  title: string;
  content: string;
}

export function ExportMenu({ title, content }: ExportMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary/40"
        >
          <span>Export as...</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => exportAsText(title, content)}
          className="gap-2"
        >
          <FileText className="w-4 h-4" />
          Plain Text (.txt)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => exportAsMarkdown(title, content)}
          className="gap-2"
        >
          <FileText className="w-4 h-4" />
          Markdown (.md)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => exportAsHTML(title, content)}
          className="gap-2"
        >
          <FileText className="w-4 h-4" />
          HTML (.html)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
