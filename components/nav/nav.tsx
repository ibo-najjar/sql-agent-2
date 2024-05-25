import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Navbar from "./Navbar";

const Nav = async ({}) => {
  const session = await getServerSession(authOptions);
  return <Navbar session={session ?? undefined} />;
};

export default Nav;
