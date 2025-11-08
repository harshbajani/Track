import { Task } from "@/features/tasks/types";
import React from "react";
import TaskActions from "./TaskActions";
import { MoreHorizontal } from "lucide-react";
import { DottedSeparator } from "./Dotted-Separator";
import MemberAvatar from "./MemberAvatar";
import TaskDate from "./TaskDate";
import ProjectAvatar from "./ProjectAvatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useRouter } from "next/navigation";

const KanbanCard = ({ task }: { task: Task }) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/workspaces/${workspaceId}/tasks/${task.$id}`);
  };
  return (
    <div
      className="bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-sm line-clamp-2">{task.name}</p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition" />
        </TaskActions>
      </div>
      <DottedSeparator />
      <div className="flex items-center gap-x-1.5">
        <MemberAvatar
          name={task.assignee.name}
          fallbackClassname="text-[10px]"
        />
        <div className="size-1 rounded-full bg-neutral-300" />
        <TaskDate value={task.dueDate} className="text-xs" />
      </div>
      <div className="flex items-center gap-x-1.5">
        <ProjectAvatar
          name={task.project.name}
          image={task.project.imageUrl}
          fallbackClassName="text-[10px]"
        />
        <span className="text-xs font-medium">{task.project.name}</span>
      </div>
    </div>
  );
};

export default KanbanCard;
