import type { NextPage } from "next";
import { Session } from "next-auth";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { IsAuthenticated, User } from "../components";
import styles from "../styles/Home.module.css";

const Home = ({
  providers,
}: {
  providers: Record<string, ClientSafeProvider>;
}) => {
  return (
    <>
      <IsAuthenticated
        render={(session: Session) => (
          <>
            <User
              ico={session.user?.image}
              name={session.user?.name || "Unknown User"}
              // email={session.user?.email}
            />
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        )}
        loading={<div>Loading...</div>}
        is={true}
      ></IsAuthenticated>
      <IsAuthenticated
        render={(session: Session) => (
          <>
            {Object.values(providers).map((provider) => (
              <button onClick={() => signIn(provider.id)} key={provider.id}>
                Sign In with {provider.name}
              </button>
            ))}
          </>
        )}
        is={false}
      ></IsAuthenticated>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default Home;
