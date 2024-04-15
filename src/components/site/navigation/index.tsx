import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import { FC } from "react";
import LogoImg from "../../../../public/assets/plura-logo.svg";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/global/mode-toggle";

interface Props {
  user?: null | User;
}

const Navigation: FC<Props> = ({ user }): JSX.Element => {
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10">
      <aside className="flex items-center gap-2">
        <Image src={LogoImg} alt="Plura Logo" width={40} height={40} />
        <span className="text-xl font-bold">Plura.</span>
      </aside>
      <nav className="hidden md:block">
        <ul className="flex items-center justify-center gap-8">
          <Link href={"#"}>Pricing</Link>
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Documentation</Link>
          <Link href={"#"}>Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href="/agency"
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80"
        >
          Login
        </Link>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
