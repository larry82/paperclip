import type { Issue } from "@paperclipai/shared";

function parseDateParts(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const [, year, month, day] = match;
  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
  };
}

export function formatIssueDeadline(value: string): string {
  const parts = parseDateParts(value);
  if (!parts) return value;
  return new Date(parts.year, parts.month - 1, parts.day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function compareIssueDeadlines(a: Pick<Issue, "deadline">, b: Pick<Issue, "deadline">, dir: "asc" | "desc") {
  const left = a.deadline;
  const right = b.deadline;
  if (!left && !right) return 0;
  if (!left) return 1;
  if (!right) return -1;
  return dir === "asc" ? left.localeCompare(right) : right.localeCompare(left);
}
