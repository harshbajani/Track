import SignInCard from "@/components/SignInCard";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

const SignIn = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) => {
  const user = await getCurrent();
  const { callbackUrl } = await searchParams;
  if (user) {
    redirect(callbackUrl || "/");
  }
  return <SignInCard callbackUrl={callbackUrl} />;
};

export default SignIn;
