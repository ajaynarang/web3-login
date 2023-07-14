import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useDisconnect, useNetwork, useSignMessage } from "wagmi";

function SignIn() {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: session, status } = useSession();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleWalletLogin = async () => {
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement:
          "Sign in with your digital wallet to login to Fiserv application.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      signIn("web3login", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
      });
    } catch (error) {
      disconnect();
      window.alert(error);
    }
  };

  const handleLogin = async (e: any) => {
    try {
      signIn("web2login", {
        username: userName,
        password: password,
        redirect: false
      });
      e.preventDefault();
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    console.log(isConnected);
    if (isConnected && !session) {
      handleWalletLogin();
    }
  }, [isConnected]);

  return (
    <main className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign in
            </h1>
          </div>

          <div className="mt-5">
            <form>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="py-3 px-4 block w-full border border-gray-500 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      required
                      aria-describedby="email-error"
                    ></input>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Password
                    </label>
                    <a
                      className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                      href="../examples/html/recover-account.html"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="py-3 px-4 block w-full border border-gray-500 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      required
                      aria-describedby="password-error"
                    ></input>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    ></input>
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="remember-me"
                      className="text-sm dark:text-white"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <button
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  onClick={handleLogin}
                >
                  Sign in
                </button>

                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                  Or
                </div>

                <ConnectButton
                  label="Sign In with Web3 Wallet"
                  chainStatus="name"
                  showBalance={false}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default SignIn;
function userState(): { data: any; status: any } {
  throw new Error("Function not implemented.");
}
