import Layout from "@/components/layout";
import AccountSummary from "@/pages/features/account-summary/account-summary";
import { getCsrfToken, useSession } from "next-auth/react";
import { useState } from "react";
import SignIn from "./features/auth/signin";
import { motion } from "framer-motion";

function Home() {
  const { data: session }: { data: any; status: string } = useSession();
  const [isRegisterLater, setIsRegisterLater] = useState(false);

  function updateSession(e: any) {
    if (session) {
      setIsRegisterLater(true);
    }
  }

  return (
    <Layout>
      {!session && <SignIn></SignIn>}
      {session?.user && <AccountSummary></AccountSummary>}
    </Layout>
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
