import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import React from "react";
import WorkspaceIdJoinClient from "./client";

const WorkspaceIdJoinPage = async ({
  params,
}: {
  params: Promise<{ id: string; inviteCode: string }>;
}) => {
  const user = await getCurrent();
  const { id, inviteCode } = await params;
  if (!user) {
    const callbackUrl = `/workspaces/${id}/join/${inviteCode}`;
    redirect(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  return <WorkspaceIdJoinClient />;
};

export default WorkspaceIdJoinPage;
