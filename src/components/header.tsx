import { signOut, useSession } from "next-auth/react";
import { useDisconnect } from "wagmi";
import styles from "./header.module.css";

export default function Header() {
  const { data: session, status } = useSession();
  const { disconnect } = useDisconnect();

  console.log("session", session);

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
            <strong>{session?.user?.email ?? session?.user?.name}</strong>
          </span>
          <a
            href={`/api/auth/signout`}
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              disconnect();
              signOut();
            }}
          >
            Sign out
          </a>
        </div>
      </nav>
    </header>
  );
}
