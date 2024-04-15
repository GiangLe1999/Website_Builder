import Navigation from "@/components/site/navigation";
import { FC, ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

interface Props {
  children: ReactNode;
}

const layout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main className="h-full">
        <Navigation /> {children}
      </main>
    </ClerkProvider>
  );
};

export default layout;
