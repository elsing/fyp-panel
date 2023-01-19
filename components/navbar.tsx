import Link from "next/link";
import Logout from "@/components/logout";
import Username from "@/components/username";

export default function RenderNavbar() {
  return (
    // <Navbar fluid={true} rounded={true}>
    //   <Navbar.Brand href="https://watershed.singer.systems/dashboard">
    //     <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
    //       Watershed
    //     </span>
    //   </Navbar.Brand>
    // </Navbar>
    <div className="bg-gray-700 p-4 w-screen justify-items-stretch justify-between flex flex-row">
      <Link
        href="/dashboard"
        className="bg-gray-400 border-black border-2 font-bold px-2 text-xl w-1/6 items-center"
      >
        <h1>Watergate</h1>
      </Link>
      <div className="flex flex-row justify-around bg-gray-400 border-black border-2 px-4 w-4/5">
        <h1>Flows</h1>
        <h1>Streams</h1>
        <h1>Settings</h1>
      </div>
      <div className="flex justify-between bg-gray-400 w-1/3 px-4">
        <Username />
        {/* <Link href="/logout">
          <h1>Logout</h1>
        </Link> */}
        {/* <button onSubmit={Logout}>Logout</button> */}
        <Logout />
      </div>
    </div>
  );
}
