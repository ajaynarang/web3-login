export default function NoSessionHeader() {
  return (
    <header
      className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap 
    z-[48] w-full  border-b text-sm py-2.5 sm:py-4 
    lg:pl-5 bg-gray-100 border-gray-700"
    >
      <nav className="flex basis-full items-center w-full " aria-label="Global">
        <h1 className="block text-2xl text-orange-500 ">
          POC: Passwordless login with Web3 wallet
        </h1>
      </nav>
    </header>
  );
}
