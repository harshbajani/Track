import { TaskStatus } from "@/config";
import { Project } from "@/features/projects/types";
import { cn } from "@/lib/utils";
import React from "react";
import MemberAvatar from "./MemberAvatar";
import ProjectAvatar from "./ProjectAvatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { Member } from "@/features/members/types";

interface EventCardProps {
  id: string;
  title: string;
  assignee: Member;
  project: Project;
  status: TaskStatus;
}

const satusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-pink-500",
  [TaskStatus.TODO]: "border-l-red-500",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
  [TaskStatus.IN_REVIEW]: "border-l-blue-500",
  [TaskStatus.DONE]: "border-l-emerald-500",
};

const EventCard = ({
  id,
  title,
  assignee,
  project,
  status,
}: EventCardProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
          satusColorMap[status]
        )}
      >
        <p>{title}</p>
        <div className="flex items-center gap-x-1">
          <MemberAvatar name={assignee?.name} />
          <div className="size-1 rounded-full bg-neutral-300" />
          <ProjectAvatar name={project?.name} image={project?.imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;