"use client";

import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useContext, useEffect, useRef } from "react";
import { MDXRemote } from "next-mdx-remote";
import { MarkdownRenderer } from "../mdx-renderer";
import Image from "next/image";
import { Clipboard, Pin, RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {
  user?: any;
}

const ChatMessages: FC<ChatMessagesProps> = ({ className, user, ...props }) => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Couldn't copy to clipboard");
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the messages container
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",
        className
      )}
      ref={messagesContainerRef}
    >
      <div className="flex-1 flex-grow" />
      {inverseMessages.map((message) => (
        <div
          className={cn(
            "flex justify-end space-x-2 hover:bg-neutral-100 group px-2 py-2"
          )}
          key={message.id}
        >
          <div className="flex-shrink-0 ">
            <Image
              src={message.isUserMessage ? user?.image : "/bot.jpg"}
              width={40}
              height={40}
              className="rounded-lg object-cover flex-shrink-0 flex-grow-0 w-10 h-10"
              alt={user?.name}
              unoptimized={true}
            />
          </div>
          <div className="flex-1 flex flex-col space-y-1">
            <div className="leading-4 font-semibold flex justify-between items-center">
              <p>{message.isUserMessage ? "You" : "System"}</p>
              <div className="group-hover:flex space-x-2 hidden">
                <Clipboard
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => copyToClipboard(message.text)}
                />
                {message.isUserMessage && (
                  <RefreshCcw className="w-4 h-4 cursor-pointer" />
                )}
                <Pin className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
            <div
              className={cn(
                "flex flex-col text-sm overflow-x-hidden break-words"
              )}
            >
              <MarkdownRenderer content={message.text} />

              {/* <MarkdownLite text={message.text}/> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
