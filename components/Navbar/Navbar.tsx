import Link from "next/link";
import Logout from "@/components/Navbar/Logout";
import UserDetails from "@/components/Navbar/UserDetails";
import Darkmode from "@/components/Navbar/DarkMode";

export default function RenderNavbar() {
  return (
    // <Navbar fluid={true} rounded={true}>
    //   <Navbar.Brand href="https://watershed.singer.systems/dashboard">
    //     <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
    //       Watershed
    //     </span>
    //   </Navbar.Brand>
    // </Navbar>
    <div className="bg-gray-200 dark:bg-gray-700 p-4 w-screen justify-items-stretch justify-between flex flex-row dark:text-gray-200 h-16">
      <Link
        href="/dashboard"
        className="border-black border-1 font-bold px-2 text-xl w-1/6 justify-center flex-col hidden sm:block"
      >
        <h1>Watergate</h1>
      </Link>
      <div className="flex flex-row justify-around items-center border-black border-1 px-4 w-3/5 md:w-5/6">
        <Link
          href="/dashboard/flows"
          className="bg-gray-300 dark:bg-gray-600 rounded-xl px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-500"
        >
          <h1>Flows</h1>
        </Link>
        <Link
          href="/dashboard/streams"
          className="bg-gray-300 dark:bg-gray-600 rounded-xl px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-500"
        >
          <h1>Streams</h1>
        </Link>
        <Link
          href="/dashboard/deltas"
          className="bg-gray-300 dark:bg-gray-600 rounded-xl px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-500"
        >
          <h1>Deltas</h1>
        </Link>
        <Link
          href="/dashboard/settings"
          className="bg-gray-300 dark:bg-gray-600 rounded-xl px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-500"
        >
          <h1>Settings</h1>
        </Link>
      </div>
      <div className="flex justify-end items-center w-1/2 px-4 md:w-fit">
        {/* I need to remove the async from UserDetails! UseEffect */}
        <UserDetails />
        <Logout />
        <Darkmode />
      </div>
    </div>
  );
}
