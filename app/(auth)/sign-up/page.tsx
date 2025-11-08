import SignUpCard from "@/components/SignUpCard";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import React from "react";

const SignUp = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) => {
  const user = await getCurrent();
  const { callbackUrl } = await searchParams;
  if (user) {
    redirect(callbackUrl || "/");
  }
  return <SignUpCard callbackUrl={callbackUrl} />;
};

export default SignUp;
