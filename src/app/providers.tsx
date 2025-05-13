"use client";

import { ProgressProvider } from "@bprogress/next/app";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      color="#8a4eba"
      options={{ showSpinner: false }}
      shallowRouting>
      {children}
    </ProgressProvider>
  );
};

export default Providers;
