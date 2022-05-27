import React from "react";
import Image from "next/image";
import styles from "./UserIcon.module.scss";
export interface IUserIconProps {
  // TODO: Add props here
  src: string;
  alt: string;
}
export const UserIcon: React.FC<IUserIconProps> = (props: IUserIconProps) => {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      width={32}
      height={32}
      className={styles.UserIcon}
    />
  );
};
