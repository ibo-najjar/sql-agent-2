import Markdown from "markdown-to-jsx";
import Button from "./mdx/Button";

export const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <Markdown
      options={{
        overrides: {
          Button: {
            component: Button,
          },
        },
      }}
    >
      {content}
    </Markdown>
  );
};
