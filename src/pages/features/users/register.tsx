import Layout from "@/components/layout";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function Register() {
  const { data: session }: { data: any; status: string } = useSession();
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function register(e: any) {
    const user = { id: username, name, username, password, walletId: null };

    setIsLoading(true);
    fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { ...user } }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });

    e.preventDefault();
  }

  const primaryButtonClasses = classnames(
    `py-3  my-2 px-4 w-full inline-flex justify-center items-center gap-2 rounded-md border 
    border-transparent font-semibold  text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800`,
    {
      "bg-orange-500": !isLoading,
      "bg-gray-300": isLoading,
    }
  );

  return (
    <Layout>
      <main className="w-full max-w-md mx-auto p-6 ">
        <div className="mt-7 bg-white border  border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Add New User
              </h1>
            </div>
            <div className="mt-5">
              <form>
                <div>
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="username"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      User Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                      className="py-3 px-4 block w-full border border-gray-500 rounded-md text-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
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
                <div>
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="name"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="py-3 px-4 block w-full border border-gray-500 rounded-md text-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      required
                    ></input>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={register}
                  className={primaryButtonClasses}
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
                </button>

                <button
                  type="button"
                  className="w-full my-1 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold  hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  <Link href="/">Back</Link>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Register;
