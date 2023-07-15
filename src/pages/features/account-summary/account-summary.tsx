function AccountSummary() {
  return (
    <>
      <div className="bg-gray-50 p-4  dark:bg-slate-900">
        <header>
          <h1 className="block text-2xl font-bold text-gray-800 sm:text-2xl dark:text-white">
            Account Summary
          </h1>
        </header>
      </div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800  cursor-pointer">
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-x-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Total Deposits
                </p>
              </div>

              <div className="mt-1 flex items-center">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                  $10000
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800  cursor-pointer">
            <div className="p-4 md:p-5 ">
              <div className="flex items-center gap-x-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Loans and Credits
                </p>
              </div>

              <div className="mt-1 flex items-center">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                  $1000
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800  cursor-pointer">
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-x-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Investment
                </p>
              </div>

              <div className="mt-1 flex items-center">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                  $2000
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800  cursor-pointer">
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-x-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Total net worth
                </p>
              </div>

              <div className="mt-1 flex items-center">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                  $11000
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountSummary;
