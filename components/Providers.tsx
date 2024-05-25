"use client";

import { FC } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MessagesProvider } from "@/context/messages";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>
        {children}
        <Toaster position="bottom-left" />
      </MessagesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
