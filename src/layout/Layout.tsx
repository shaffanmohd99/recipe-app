import { ReactNode } from "react";

type LayoutProps = { children: ReactNode };

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex items-center justify-center w-full ">
      <div className="w-full max-w-5xl min-h-screen px-4 md:px-0  flex-col pt-16 pb-8">
        {children}
      </div>
    </div>
  );
}
