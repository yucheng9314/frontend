# A demo of `react-markdown`

Lorem ipsum dolor sit, amet
⭐️`react-markdown` is a markdown component for React.
![](../bigImages/45b632131413319.6194a2d1018db.jpg)
![](../bigImages/samy-seffadj-fsi-1030-walls-v026.gif)

**环境建模、lookdev、快照照明和合成**

![](../bigImages/samy-seffadj-fsi-trailer-frame-hd-00577.jpeg)![](../bigImages/samy-seffadj-fsi-trailer-frame-hd-01398.jpeg)![](../avatars/user-avatar001.jpg)![](../avatars/user-avatar002.jpg)![](../avatars/user-avatar003.jpg)![](../avatars/user-avatar004.jpg)

| ![](../bigImages/samy-seffadj-fsi-trailer-frame-hd-00577.jpeg) | ![](../bigImages/samy-seffadj-fsi-trailer-frame-hd-00577.jpeg) |
| -------------------------------------------------------------- | -------------------------------------------------------------- |

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure excepturi assumenda corrupti deserunt saepe id distinctio quibusdam illo voluptatum ratione, amet veniam alias consectetur inventore ullam. Molestiae quibusdam dolore inventore placeat porro facilis, laborum aut cumque eveniet praesentium temporibus assumenda, culpa minus, commodi distinctio enim. Quia nesciunt beatae ab itaque?

宫化忌入迁移，需要经常往外跑，外出自主奋斗比在家好(天魁坐命，做众生的贵人，也得贵人助。天刑坐命——有威严，遵纪守法，上天在看，行天道)，在外有是非，必须经过艰苦奋斗才能成功。跑出去干什么？看心情——武曲

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

- Follows [CommonMark](https://commonmark.org)
- Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
- Renders actual React elements instead of using `dangerouslySetInnerHTML`
- Lets you define your own components (to render `MyHeading` instead of `h1`)
- Has a lot of plugins

## onPositive()

| Parameter             | Type       | Default Value |
| --------------------- | ---------- | ------------- |
| text                  | String     | Empty String  |
| buttonBackgroundColor | Int        | Default Color |
| action                | () -> Unit | Empty         |

## Table of contents

- [Hello](#hello)
- [Hello World](#hello-world)
- [Another section](#new-section) <-- it's called 'Another section' in this list but refers to 'New section'

## Hello

### Hello World

## New section

Go to section

- [Syntax highlighting](#syntax-highlighting)

- [Charlie](#charlie)

- [Delta](#delta)

## Syntax highlighting

Here is an example of a plugin to highlight code:
[`rehype-highlight`](https://github.com/rehypejs/rehype-highlight).

```js
import React from "react";
import ReactDOM from "react-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

ReactDOM.render(
  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
    {"# Your markdown here"}
  </ReactMarkdown>,
  document.querySelector("#content")
);
```

Pretty neat, eh?

## GitHub flavored markdown (GFM)

For GFM, you can _also_ use a plugin:
[`remark-gfm`](https://github.com/remarkjs/react-markdown#use).
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.

These features **do not work by default**.
👆 Use the toggle above to add the plugin.

|    Feature | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
|        GFM | 100% w/ `remark-gfm` |

~~strikethrough~~

- [ ] task list
- [x] checked item

https://example.com

## HTML in markdown

⚠️ HTML in markdown is quite unsafe, but if you want to support it, you can use [`rehype-raw`](https://github.com/rehypejs/rehype-raw).
You should probably combine it with[`rehype-sanitize`](https://github.com/rehypejs/rehype-sanitize).

<blockquote>
  👆 Use the toggle above to add the plugin.
</blockquote>

## Components

You can pass components to change things:

```js
import React from "react";
import ReactDOM from "react-dom";
import ReactMarkdown from "react-markdown";
import MyFancyRule from "./components/my-fancy-rule.js";

ReactDOM.render(
  <ReactMarkdown
    components={{
      // Use h2s instead of h1s
      h1: "h2",
      // Use a component instead of hrs
      hr: ({ node, ...props }) => <MyFancyRule {...props} />,
    }}
  >
    # Your markdown here
  </ReactMarkdown>,
  document.querySelector("#content")
);
```

## More info?

Much more info is available in the
[readme on GitHub](https://github.com/remarkjs/react-markdown)!

---

A component by [Espen Hovlandsdal](https://espen.codes/)
