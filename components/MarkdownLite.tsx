import { FC } from "react";

interface MarkdownLiteProps {
  text: string;
}

const MarkdownLite: FC<MarkdownLiteProps> = ({ text }) => {
  const linkRegex = /\[(.+?)\]/;
  return <div>MarkdownLite</div>;
};

export default MarkdownLite;
