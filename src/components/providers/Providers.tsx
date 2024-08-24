"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC } from "react";
interface ProvidersProps {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const queryClient = new QueryClient();

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
