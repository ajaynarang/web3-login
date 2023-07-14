import { getCsrfToken, useSession } from "next-auth/react";

function Register({ laterCallback }: { laterCallback: any }) {
  const { data: session, status }: { data: any; status: string } = useSession();

  return (
    <main className="w-full max-w-md mx-auto p-6 ">
      <div className="mt-7 bg-white border  border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              New User Registeration
            </h1>
          </div>

          <div>
            It seems like this is your first time logging in. To contine, kindly
            request you to provide us with below details to link it with your
            Wallet Id!
          </div>

          <div className="mt-5">
            <form>
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
                      value={session?.user?.id}
                      className="py-3 px-4 block w-full border border-gray-500 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      disabled
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
                      className="py-3 px-4 block w-full border border-gray-500 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    ></input>
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Continue
                </button>

                <button
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  onClick={laterCallback}
                >
                  Setup Later
                </button>
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

export default Register;
