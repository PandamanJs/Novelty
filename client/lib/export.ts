export function exportAsText(title: string, content: string) {
  const text = `${title}\n${"=".repeat(title.length)}\n\n${content}`;
  const blob = new Blob([text], { type: "text/plain" });
  downloadFile(blob, `${title}.txt`);
}

export function exportAsMarkdown(title: string, content: string) {
  const markdown = `# ${title}\n\n${content}`;
  const blob = new Blob([markdown], { type: "text/markdown" });
  downloadFile(blob, `${title}.md`);
}

export function exportAsHTML(title: string, content: string) {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: serif; max-width: 800px; margin: 2em auto; line-height: 1.6; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <div>${content.split("\n").map((p) => `<p>${p}</p>`).join("")}</div>
</body>
</html>`;
  const blob = new Blob([html], { type: "text/html" });
  downloadFile(blob, `${title}.html`);
}

function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
