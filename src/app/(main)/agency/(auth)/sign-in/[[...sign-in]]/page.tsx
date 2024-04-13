import { SignIn } from "@clerk/nextjs";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = () => {
  return <SignIn />;
};

export default Page;
