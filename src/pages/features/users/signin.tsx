import { ConnectButton } from "@rainbow-me/rainbowkit";
import classnames from "classnames";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useDisconnect, useNetwork, useSignMessage } from "wagmi";

function SignIn() {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: session } = useSession();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleWalletLogin = async () => {
    try {
      setIsLoading(true);
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement:
          "Sign in with your linked digital wallet to login to Fiserv application.",
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

      setIsLoading(false);
    } catch (error: any) {
      disconnect();
      setError(error.toString());
    }
  };

  const handleLogin = async (e: any) => {
    try {
      setIsLoading(true);
      signIn("web2login", {
        username: userName,
        password: password,
        redirect: false,
      })
        .then(async ({ ok, error }: any) => {
          if (ok) {
          } else {
            console.log(error);
            setError("Invalid Username or password!");
          }
          setIsLoading(false);
        })
        .catch((e) => {
          setError(e.toString());
          setIsLoading(false);
        });
      e.preventDefault();
    } catch (error: any) {
      window.alert(error);
      setError(error.toString());
    }
  };

  useEffect(() => {
    if (isConnected && !session) {
      fetch(`api/users/${address}`)
        .then((response) => response.json())
        .then((data) => {
          if (data?.walletId) {
            handleWalletLogin();
          } else {
            setError(`Invalid Wallet ID!`);
            disconnect();
          }
        });
    }
  }, [isConnected]);

  const signInClasses = classnames(
    `py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent 
  font-semibold  text-white
  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 
  transition-all text-sm dark:focus:ring-offset-gray-800`,
    {
      "bg-orange-500": !isLoading,
      "bg-gray-300": isLoading,
    }
  );

  return (
    <main className="w-full max-w-md mx-auto p-6">
      {error && (
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <div className="mt-3 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
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
                      className="py-3 px-4 block w-full border border-gray-500 rounded-md text-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
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
                      className="text-sm text-orange-500 decoration-2 hover:underline font-medium"
                      href=""
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
                      className="py-3 px-4 block w-full border border-gray-500 rounded-md text-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
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
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-orange-500 pointer-events-none focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-orange-500 dark:checked:border-orange-500 dark:focus:ring-offset-gray-800"
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
                  className={signInClasses}
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>

                <div className="flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                  Or
                </div>

                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                  }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== "loading";
                    const connected =
                      ready &&
                      account &&
                      chain &&
                      (!authenticationStatus ||
                        authenticationStatus === "authenticated");

                    return (
                      <div
                        className="inline-flex justify-center items-center rounded-md border border-orange-500 font-semibold text-gray-800 hover:text-white 
                        hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 
                        focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                        {...(!ready && {
                          "aria-hidden": true,
                          style: {
                            opacity: 0,
                            pointerEvents: "none",
                            userSelect: "none",
                          },
                        })}
                      >
                        {(() => {
                          if (!connected) {
                            return (
                              <button
                                onClick={openConnectModal}
                                type="button"
                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 
                                rounded-md border border-transparent font-semibold  hover:text-orange-500 
                                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 
                                transition-all text-sm dark:focus:ring-offset-gray-800"
                              >
                                Sign In with Web3 Wallet
                              </button>
                            );
                          }

                          if (chain.unsupported) {
                            return (
                              <button onClick={openChainModal} type="button">
                                Wrong network
                              </button>
                            );
                          }

                          return (
                            <div style={{ display: "flex", gap: 12 }}>
                              <button
                                onClick={openChainModal}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                type="button"
                              >
                                {/* {chain.hasIcon && (
                                  <div
                                    style={{
                                      background: chain.iconBackground,
                                      width: 12,
                                      height: 12,
                                      borderRadius: 999,
                                      overflow: "hidden",
                                      marginRight: 4,
                                    }}
                                  >
                                    {chain.iconUrl && (
                                      <img
                                        alt={chain.name ?? "Chain icon"}
                                        src={chain.iconUrl}
                                        style={{ width: 12, height: 12 }}
                                      />
                                    )}
                                  </div>
                                )}
                                {chain.name} */}
                                <div className="text-green-500">Connected</div>
                              </button>

                              <button onClick={openAccountModal} type="button">
                                {account.displayName}
                              </button>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="py-3 w-full flex justify-end items-center ">
        <Link
          href="/features/users/register"
          className="text-sm text-orange-500 decoration-2 hover:underline font-medium"
        >
          New User?
        </Link>
      </div>
    </main>
  );
}

export default SignIn;
