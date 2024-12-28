import { cn } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface workspaceAvatarProps {
  image?: string;
  name: string;
  className?: string;
}

const WorkspaceAvatar = ({ image, name, className }: workspaceAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn("size-10 rounded-md relative overflow-hidden", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-10 rounded-md", className)}>
      <AvatarFallback className="text-white bg-blue-600 font-semibold text-lg uppercase rounded-md">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default WorkspaceAvatar;
