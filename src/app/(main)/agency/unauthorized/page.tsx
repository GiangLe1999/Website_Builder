import Unauthorized from "@/components/unauthorized";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = () => {
  return <Unauthorized />;
};

export default Page;
