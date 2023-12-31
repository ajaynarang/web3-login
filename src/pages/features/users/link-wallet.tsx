import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function LinkWallet({ laterCallback }: { laterCallback: any }) {
  const { data: session }: { data: any; status: string } = useSession();
  const [walletId, setWalletId] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function linkWallet(e: any) {
    setIsLoading(true);
    fetch("/api/users/link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        reloadSession();
        router.push("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });

    e.preventDefault();
  }
  //Hack to reload session, new version has add a way to update/reload.
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const primaryButtonClasses = classnames(
    `py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-white focus:outline-none focus:ring-2  focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800`,
    {
      "bg-orange-500": !isLoading,
      "bg-gray-300": isLoading,
    }
  );

  return (
    <main className="w-full max-w-md mx-auto p-6 ">
      <div className="mt-7 bg-white border  border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Link - Web3 Wallet ID
            </h1>
          </div>

          <div className="mt-5">
            <form>
              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="name"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    User Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    value={session?.user?.id}
                    disabled
                    className="py-3 px-4 block w-full border border-gray-500 rounded-md text-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  ></input>
                </div>
              </div>

              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="walletId"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Wallet ID
                  </label>
                  <div className="relative">
                    <input
                      id="walletId"
                      name="walletId"
                      value={walletId}
                      required
                      onChange={(e) => setWalletId(e.target.value)}
                      className="py-3 px-4 block w-full border border-gray-500 rounded-md text-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    ></input>
                  </div>
                </div>
                <div className="text-orange-400">
                  Please ensure that you verify your web3 wallet ID carefully,
                  as it serves as your authentication method for accessing the
                  application!
                </div>

                <button
                  type="submit"
                  onClick={linkWallet}
                  className={primaryButtonClasses}
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>

                <button className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold  hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                  <Link href="/"> Setup Later</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
export default LinkWallet;
