import { SignUp } from "@clerk/nextjs";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = () => {
  return <SignUp />;
};

export default Page;
