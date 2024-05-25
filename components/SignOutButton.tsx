"use client";

import { FC } from "react";
import { signOut } from "next-auth/react";

interface SignOutButtonProps {
  children: React.ReactNode;
}

const SignOutButton: FC<SignOutButtonProps> = ({ children }) => {
  return (
    <button
      onClick={() => {
        signOut();
      }}
      className="w-full text-left"
    >
      {children}
    </button>
  );
};

export default SignOutButton;
