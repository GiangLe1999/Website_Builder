import { NextPage } from "next";

interface Props {
  params: { agencyId: string };
}

const Page: NextPage<Props> = ({ params }) => {
  return <div>{params.agencyId}</div>;
};

export default Page;
