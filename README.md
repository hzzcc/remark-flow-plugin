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
    st=>start: 开始
    e=>end: 结束
    op=>operation: 操作
    sub=>subroutine: 子程序
    cond=>condition: 判断
    io=>inputoutput: 输出
    st(right)->op->cond
    cond(yes)->io(right)->e
    cond(no)->sub(right)->op
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