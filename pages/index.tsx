import { Session } from "next-auth";
import {
  ClientSafeProvider,
  getProviders,
  signIn,
  signOut,
} from "next-auth/react";
import Image from "next/image";

import { FileUploader, IsAuthenticated, User } from "../components";
const items: { width: number; height: number; img: string }[] = [];
for (let i = 0; i < 32; i++) {
  const width = (1 + Math.floor(Math.random() * 2)) * 100;
  const height = (1 + Math.floor(Math.random() * 2)) * 100;
  items.push({
    width,
    height,
    img: `https://placeimg.com/${width}/${height}/tech`,
  });
}
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
            <FileUploader></FileUploader>
            <div className=" z-10">
              <User
                ico={session.user?.image}
                name={session.user?.name || "Unknown User"}
                // email={session.user?.email}
              />
              <button onClick={() => signOut()}>Sign Out</button>
            </div>
          </>
        )}
        loading={<div>Loading...</div>}
        is={true}
      ></IsAuthenticated>
      <IsAuthenticated
        render={() => (
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
      {/* <div className="flex flex-wrap justify-center">
        {Array.from({ length: 32 }, (_, i) => (
          <div className=" max-w-sm min-w-max w-full h-auto">
            <Image
              src="https://placeimg.com/720/1400/tech"
              alt=""
              width={384}
              height={747}
            />
          </div>
        ))}
      </div> */}
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
