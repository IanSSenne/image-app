import { useSession } from "next-auth/react";

export function useUserUid() {
  const { data } = useSession();
  // @ts-ignore
  if (data) return data.user.id;
  return null;
}
