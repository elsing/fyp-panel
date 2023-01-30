"use client";

import { Avatar } from "flowbite-react";

export default function UserAvatar({ className }: { className: string }) {
  return (
    <Avatar
      className={className}
      img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
      rounded={true}
    />
  );
}
