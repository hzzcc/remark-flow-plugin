import { visit } from "unist-util-visit";
import type { Parent } from "mdast";
import type { Plugin } from "unified";
import flowchart, { DrawOptions } from "flowchart.js";

export interface RemarkFlowOptions extends DrawOptions {
  theme?: "default" | "dark";
}

const remarkFlow: Plugin<[RemarkFlowOptions?], any> = function remarkFlow({
  theme,
  ...options
} = {}) {
  return (ast) => {
    const instances: [string, number, Parent][] = [];
    visit(ast, { type: "code", lang: "flow" }, (node, index, parent) => {
      instances.push([node.value, index as number, parent as Parent]);
    });

    // Nothing to do. No need to start puppeteer in this case.
    if (!instances.length) {
      return ast;
    }

    // set href for link
    const traverse = (node: HTMLElement) => {
      if (node.tagName?.toLowerCase() === "a") {
        const href = node.getAttribute("xlink:href");
        node.setAttribute("href", href);
      }
      node.childNodes.forEach((n) => {
        traverse(n as HTMLElement);
      });
    };

    const results = instances.map((ins) => {
      const code = ins[0];

      const div = document.createElement("div");
      document.body.append(div);
      const diagram = flowchart.parse(code);
      let drawOptions = options;
      if (theme === "dark") {
        drawOptions = {
          "font-color": "#fff",
          "line-color": "white",
          "element-color": "white",
          fill: "#444",
          "yes-text": "yes",
          "no-text": "no",
          "arrow-end": "block",
          scale: 1,
          symbols: {
            start: {
              "font-color": "#fff",
              "element-color": "#fff",
              fill: "#888",
            },
            end: {
              class: "end-element",
            },
          },
          flowstate: {
            past: { fill: "#888" },
            current: {
              fill: "#7ccfd7",
              "font-color": "#fff",
              "font-weight": "bold",
            },
            future: { fill: "#888" },
            request: { fill: "blue" },
            invalid: { fill: "#888" },
            approved: {
              fill: "#58C4A3",
              "yes-text": "APPROVED",
              "no-text": "n/a",
            },
            rejected: {
              fill: "#C45879",
              "yes-text": "n/a",
              "no-text": "REJECTED",
            },
          },
          ...options,
        };
      }
      diagram.drawSVG(div, drawOptions);
      div.innerHTML = `<pre><code class="language-flow">${div.innerHTML}</code></pre>`;
      traverse(div);
      div.remove();
      return div.innerHTML;
    });

    instances.forEach(([, index, parent], i) => {
      let value = results[i];
      parent.children.splice(index, 1, {
        type: "html",
        value,
      });
    });
  };
};

export default remarkFlow;
