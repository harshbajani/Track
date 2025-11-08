import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = (callbackUrl?: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login["$post"]({ json });
      if (!response.ok) {
        throw new Error("failed to login");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success(" Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["current"] });
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.refresh();
      }
    },
    onError: () => {
      toast.error("Failed to login");
    },
  });
  return mutation;
};
