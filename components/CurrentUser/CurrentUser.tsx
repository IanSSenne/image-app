import { useSession } from "next-auth/react";
import React from "react";
import { User } from "../User/User";

import styles from "./CurrentUser.module.scss";

interface ICurrentUserProps {
  // TODO: Add props here
}

export const CurrentUser: React.FC<ICurrentUserProps> = (
  props: ICurrentUserProps
) => {
  const { data } = useSession();
  return <User ico={data?.user?.image} name={data?.user?.name} />;
};
