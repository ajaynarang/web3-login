import Layout from "@/components/layout";
import AccountSummary from "@/pages/features/account-summary/account-summary";
import { getCsrfToken, useSession } from "next-auth/react";
import { useState } from "react";
import SignIn from "./features/users/signin";

function Home() {
  const { data: session }: { data: any; status: string } = useSession();

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
