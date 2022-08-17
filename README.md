# remark-flow-plugin

remark plugin to support flow for browser use, helpful for react-markdown

## Install

```sh
npm install remark-flow-plugin
```


## Usage

Our module `exampl.js` looks as follows:
```js
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkFlowPlugin from 'remark-flow-plugin';

const markdownContent = `
    ```flow
    st=>start: Start|past:>http://www.google.com[blank]
    e=>end: End|future:>http://www.google.com
    op1=>operation: My Operation|past
    op2=>operation: Stuff|current
    sub1=>subroutine: My Subroutine|invalid
    cond=>condition: Yes
    or No?|approved:>http://www.google.com
    c2=>condition: Good idea|rejected
    io=>inputoutput: catch something...|future

    st->op1(right)->cond
    cond(yes, right)->c2
    cond(no)->sub1(left)->op1
    c2(yes)->io->e
    c2(no)->op2->e
    ```
`

function Markdown() {

  return (
    <ReactMarkdown
      children={markdownContent}
      remarkPlugins={[
        [remarkFlowPlugin, { theme: "dark" }],
      ]}
      rehypePlugins={[
        rehypeRaw,
        rehypeStringify,
      ]}
    />
  );
}

```

or 

```js
<ReactMarkdown
  children={markdownContent}
  remarkPlugins={[
    remarkFlowPlugin
  ]}
  rehypePlugins={[
    rehypeRaw,
    rehypeStringify,
  ]}
/>
```