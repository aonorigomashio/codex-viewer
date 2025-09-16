"use client";

import { FolderIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjects } from "../hooks/useProjects";

export const ProjectList: FC = () => {
  const { data: projects } = useProjects();

  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FolderIcon className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground text-center max-w-md">
            No Codex sessions found in your ~/.codex/sessions directory. Run a
            Codex conversation to populate this list.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderIcon className="w-5 h-5" />
              <span className="truncate">
                {project.meta.workspaceName ?? project.workspacePath}
              </span>
            </CardTitle>
            <CardDescription>{project.meta.workspacePath}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Last modified:{" "}
              {project.meta.lastSessionAt
                ? new Date(project.meta.lastSessionAt).toLocaleDateString()
                : ""}
            </p>
            <p className="text-xs text-muted-foreground">
              Messages: {project.meta.sessionCount}
            </p>
          </CardContent>
          <CardContent className="pt-0">
            <Button asChild className="w-full">
              <Link href={`/projects/${encodeURIComponent(project.id)}`}>
                View Sessions
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
