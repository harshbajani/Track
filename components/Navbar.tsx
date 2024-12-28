"use client";
import UserButton from "./UserButton";
import MobileSidebar from "./MobileSidebar";
import { usePathname } from "next/navigation";

const pathnameMap = {
  tasks: { title: "My-Tasks", description: "View all of your task here" },
  projects: {
    title: "My-Projects",
    description: "View tasks of your projects here",
  },
};

const defaultMap = {
  title: "Home",
  description: "Monitor all of your project and tasks here",
};

const Navbar = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;
  const { title, description } = pathnameMap[pathnameKey] || defaultMap;
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};

export default Navbar;
