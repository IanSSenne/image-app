import classnames from "classnames";
import React from "react";
import { UserIcon, IUserIconProps } from "../UserIcon/UserIcon";

import styles from "./User.module.scss";

export interface IUserProps {
  // TODO: Add props here
  ico?: string | null;
  name?: string | null;
  email?: string | null;
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
