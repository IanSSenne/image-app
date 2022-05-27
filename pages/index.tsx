import type { NextPage } from "next";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { IsAuthenticated, User } from "../components";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <IsAuthenticated
        render={(session: Session) => (
          <User
            ico={session.user?.image}
            name={session.user?.name || "Unknown User"}
            // email={session.user?.email}
          />
        )}
        loading={<div>Loading...</div>}
        is={true}
      ></IsAuthenticated>
      <IsAuthenticated
        render={(session: Session) => (
          <button onClick={() => signIn()}>log in</button>
        )}
        is={false}
      ></IsAuthenticated>
    </>
  );
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <User
          ico={session.user?.image}
          name={session.user?.name || "Unknown User"}
          email={session.user?.email}
        />
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default Home;
