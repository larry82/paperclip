// @vitest-environment node

import { describe, expect, it } from "vitest";
import type { Issue } from "@paperclipai/shared";
import { compareIssueDeadlines, formatIssueDeadline } from "./issue-deadlines";

function makeIssue(overrides: Partial<Issue> = {}): Issue {
  return {
    id: overrides.id ?? crypto.randomUUID(),
    companyId: overrides.companyId ?? "company-1",
    projectId: null,
    projectWorkspaceId: null,
    goalId: null,
    parentId: null,
    title: overrides.title ?? "Issue",
    description: null,
    deadline: overrides.deadline ?? null,
    status: overrides.status ?? "todo",
    priority: overrides.priority ?? "medium",
    assigneeAgentId: null,
    assigneeUserId: null,
    checkoutRunId: null,
    executionRunId: null,
    executionAgentNameKey: null,
    executionLockedAt: null,
    createdByAgentId: null,
    createdByUserId: null,
    issueNumber: null,
    identifier: overrides.identifier ?? null,
    requestDepth: 0,
    billingCode: null,
    assigneeAdapterOverrides: null,
    executionWorkspaceId: null,
    executionWorkspacePreference: null,
    executionWorkspaceSettings: null,
    startedAt: null,
    completedAt: null,
    cancelledAt: null,
    hiddenAt: null,
    createdAt: overrides.createdAt ?? new Date("2026-04-13T00:00:00Z"),
    updatedAt: overrides.updatedAt ?? new Date("2026-04-13T00:00:00Z"),
  };
}

describe("issue deadlines", () => {
  it("formats date-only deadlines without timezone drift", () => {
    expect(formatIssueDeadline("2026-04-21")).toBe("Apr 21, 2026");
  });

  it("sorts deadline ascending with undated issues last", () => {
    const sorted = [
      makeIssue({ id: "none", deadline: null, title: "No deadline" }),
      makeIssue({ id: "late", deadline: "2026-04-22", title: "Late" }),
      makeIssue({ id: "soon", deadline: "2026-04-15", title: "Soon" }),
    ].sort((a, b) => compareIssueDeadlines(a, b, "asc"));

    expect(sorted.map((issue) => issue.id)).toEqual(["soon", "late", "none"]);
  });

  it("sorts deadline descending with undated issues last", () => {
    const sorted = [
      makeIssue({ id: "none", deadline: null, title: "No deadline" }),
      makeIssue({ id: "late", deadline: "2026-04-22", title: "Late" }),
      makeIssue({ id: "soon", deadline: "2026-04-15", title: "Soon" }),
    ].sort((a, b) => compareIssueDeadlines(a, b, "desc"));

    expect(sorted.map((issue) => issue.id)).toEqual(["late", "soon", "none"]);
  });
});
