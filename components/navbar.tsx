import Link from "next/link";
import Logout from "@/components/logout";
import UserDetails from "@/components/userDetails";
import Darkmode from "@/components/darkmode";

export default function RenderNavbar() {
  return (
    // <Navbar fluid={true} rounded={true}>
    //   <Navbar.Brand href="https://watershed.singer.systems/dashboard">
    //     <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
    //       Watershed
    //     </span>
    //   </Navbar.Brand>
    // </Navbar>
    <div className="bg-gray-200 dark:bg-gray-700 p-4 w-screen justify-items-stretch justify-between flex flex-row dark:text-gray-200">
      <Link
        href="/dashboard"
        className="border-black border-1 font-bold px-2 text-xl w-1/6 justify-center flex-col flex"
      >
        <h1>Watergate</h1>
      </Link>
      <div className="flex flex-row justify-around items-center border-black border-1 px-4 w-4/5 ">
        <Link href="/dashboard/flows">
          <h1>Flows</h1>
        </Link>
        <Link href="/dashboard/streams">
          <h1>Streams</h1>
        </Link>
        <Link href="/dashboard/settings">
          <h1>Settings</h1>
        </Link>
      </div>
      <div className="flex justify-between items-center w-1/3 px-4 border-black border-1">
        <UserDetails />
        <Logout />
        <Darkmode />
      </div>
    </div>
  );
}
