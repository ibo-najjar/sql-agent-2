import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="mt-16 h-[calc(100vh-64px)] w-full max-w-5xl  flex flex-col pb-10">
        <ChatMessages className="flex-1 px-2 py-3" user={session?.user} />
        <ChatInput className="px-4" />
      </div>
    </main>
  );
}
