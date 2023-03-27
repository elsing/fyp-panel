"use client";

import Link from "next/link";
import Logout from "@/components/Navbar/Logout";
import UserDetails from "@/components/Navbar/UserDetails";
import Darkmode from "@/components/Navbar/DarkMode";
import { Navbar } from "flowbite-react";
import { NavbarBrand } from "flowbite-react/lib/esm/components/Navbar/NavbarBrand";

export default function RenderNavbar() {
  return (
    <Navbar fluid={false} rounded={true}>
      <Navbar.Brand href="https://watershed.singer.systems/dashboard">
        Watergate
      </Navbar.Brand>
      {/* <UserDetails /> */}
      <Navbar.Collapse>
        <Navbar.Link href="/dashboard/flows">Flows</Navbar.Link>
        <Navbar.Link href="/dashboard/streams">Streams</Navbar.Link>
        <Navbar.Link href="/dashboard/deltas">Deltas</Navbar.Link>
        <Navbar.Link href="/dashboard/settings">Settings</Navbar.Link>
      </Navbar.Collapse>
      <div className="flex md:order-2">
        <Logout />
        <Darkmode />
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
