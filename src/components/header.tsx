import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDisconnect } from "wagmi";

export default function Header() {
  const { data: session }: { data: any; status: string } = useSession();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full border-b text-sm py-2.5 sm:py-4 lg:pl-64 dark:bg-gray-800 dark:border-gray-700">
      <nav
        className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8"
        aria-label="Global"
      >
        <div className="w-full flex flex-row justify-end ml-auto sm:justify-between sm:gap-x-3 sm:order-3">
          <span>
            <small>Signed in as</small>
            <br />
            <strong>{`${session?.user?.username || session?.user?.id}`}</strong>
            {session?.user?.walletId
              ? ` (Wallet ID: ${session?.user?.walletId})`
              : ""}
          </span>

          <div className="flex flex-row justify-end ml-auto sm:justify-end sm:gap-x-3 sm:order-3">
            {!session?.user?.walletId && (
              <button
                type="button"
                className="py-3 px-4 inline-flex justify-center items-center gap-2
                rounded-md border border-transparent font-semibold
                hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              >
                <Link href="/features/users/link-wallet">Link Wallet</Link>
              </button>
            )}

            <button
              type="button"
              className="py-3 px-4 inline-flex justify-center items-center gap-2
                 rounded-md border border-transparent font-semibold
                hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              onClick={(e) => {
                e.preventDefault();
                disconnect();
                signOut({ redirect: false }).then(() => router.push(`/`));
              }}
            >
              <Link href="/features/users/link-wallet">Sign out</Link>
            </button>

            {/* <a
              href={`/api/auth/signout`}
              className="py-3 px-4 inline-flex justify-center items-center gap-2 hover:text-white
              rounded-md border border-transparent font-semibold
               hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              onClick={(e) => {
                e.preventDefault();
                disconnect();
                signOut();
                router.push(`/api/auth/signout`);
              }}
            >
              Sign out
            </a> */}
          </div>
        </div>
      </nav>
    </header>
  );
}
