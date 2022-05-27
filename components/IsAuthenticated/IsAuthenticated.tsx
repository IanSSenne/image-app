import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";

export type IIsAuthenticatedProps = React.PropsWithChildren<{
  // TODO: Add props here
  is?: boolean;
  loading?: React.ReactElement<any, any> | false | undefined;
  render?: (session: Session) => JSX.Element | null;
}>;

export const IsAuthenticated: React.FC<IIsAuthenticatedProps> = ({
  is = true,
  children,
  render: RenderComponent,
  loading = false,
}: IIsAuthenticatedProps) => {
  const { status, data } = useSession();
  if (status === "loading") {
    return loading ? loading : null;
  }
  const render = () => {
    if (typeof RenderComponent === "function") {
      return RenderComponent(data as Session);
    } else {
      return children;
    }
  };
  return is === (status === "authenticated")
    ? (render() as React.ReactElement)
    : null;
};
