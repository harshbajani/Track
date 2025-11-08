"use server";

import { createAdminClient } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export async function signUpWithGithub(callbackUrl?: string) {
  const { account } = await createAdminClient();

  const origin = headers().get("origin");
  const oauthCallback = callbackUrl
    ? `${origin}/oauth?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : `${origin}/oauth`;

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Github,
    oauthCallback,
    `${origin}/sign-up`
  );

  return redirect(redirectUrl);
}

export async function signUpWithGoogle(callbackUrl?: string) {
  const { account } = await createAdminClient();

  const origin = headers().get("origin");
  const oauthCallback = callbackUrl
    ? `${origin}/oauth?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : `${origin}/oauth`;

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    oauthCallback,
    `${origin}/sign-up`
  );

  return redirect(redirectUrl);
}
