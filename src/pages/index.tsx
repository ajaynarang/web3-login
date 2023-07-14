import Layout from "@/components/layout";
import AccountSummary from "@/pages/features/account-summary/account-summary";
import { getCsrfToken, useSession } from "next-auth/react";
import SignIn from "./features/auth/signin";
import Register from "./features/auth/register";
import { useState } from "react";

function Home() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const [isRegisterLater, setIsRegisterLater] = useState(false);

  function updateSession(e: any) {
    if (session) {
      setIsRegisterLater(true);
    }
  }

  return (
    <>
      {!session && <SignIn></SignIn>}
      {(session?.user?.name || isRegisterLater) && (
        <Layout>
          <AccountSummary></AccountSummary>
        </Layout>
      )}
      {session?.user?.id && !isRegisterLater && (
        <Register laterCallback={updateSession}></Register>
      )}
    </>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Home;
