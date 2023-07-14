import Layout from "@/components/layout";
import AccountSummary from "@/pages/features/account-summary/account-summary";
import { getCsrfToken, useSession } from "next-auth/react";
import SignIn from "./features/auth/signin";

function Home() {
  const { data: session, status } = useSession();
  return (
    <>
      {!session && <SignIn></SignIn>}
      {session?.user && (
        <Layout>
          <AccountSummary></AccountSummary>
        </Layout>
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
