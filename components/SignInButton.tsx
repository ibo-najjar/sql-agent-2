"use client";

import { FC } from "react";
import { signIn } from "next-auth/react";

interface SignInButtonProps {
  children: React.ReactNode;
}

const SignInButton: FC<SignInButtonProps> = ({ children }) => {
  return (
    <button
      onClick={() => {
        signIn("github");
      }}
      className="w-full text-left"
    >
      {children}
    </button>
  );
};

export default SignInButton;
