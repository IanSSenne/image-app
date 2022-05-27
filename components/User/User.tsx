import classnames from "classnames";
import { getProviders } from "next-auth/react";
import React from "react";
import { UserIcon, IUserIconProps } from "../UserIcon/UserIcon";

import styles from "./User.module.scss";

export interface IUserProps {
  // TODO: Add props here
  ico?: string | null;
  name?: string | null;
  email?: string | null;
}
function usePromise<T extends Promise<any>>(
  promise: T
): {
  value: (T extends Promise<infer R> ? R | null : null) | undefined;
  resolved: boolean;
  error: any;
} {
  const [value, setValue] =
    React.useState<T extends Promise<infer R> ? R | null : null>();
  const [resolved, setResolved] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>(null);
  React.useEffect(() => {
    promise
      .then(setValue)
      .catch(setError)
      .finally(() => setResolved(true));
  }, [promise]);
  return {
    value,
    resolved,
    error,
  };
}
export const User: React.FC<IUserProps> = (props: IUserProps) => {
  return (
    <div className={styles.User}>
      <div className={styles.ico}>
        <UserIcon
          src={props.ico || "https://via.placeholder.com/32x32"}
          alt={props.name + "'s profile picture"}
        />
      </div>
      <div
        className={classnames(
          styles.UserInfo,
          props.email ? styles.WithEmail : null
        )}
      >
        <div className={styles.UserName}>{props.name}</div>
        {props.email && <div className={styles.UserEmail}>{props.email}</div>}
      </div>
    </div>
  );
};
