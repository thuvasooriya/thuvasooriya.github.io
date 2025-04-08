---
title: markdown demo
description: "dummy content page for testing all the features of markdown rendering in my site"
publishDate: 20 Feb 2130
updatedDate: 24 Feb 2130
coverImage:
 src: "./covers/md-demo.jpg"
 alt: "trapped in the endless web of thoughts"
tags: [test, markdown, demo]
draft: true
---

this document demonstrates various markdown elements to test the site's rendering capabilities and styles.

## text formatting

plain text looks like this.

**bold text** looks like this.

*italic text* looks like this.

***bold and italic text*** looks like this.

~~strikethrough text~~ looks like this.

`inline code` looks like this.

> blockquotes look like this.
>
> they can span multiple lines.
>
> > and can be nested.

## heading 2
we don't really use heading 1 in markdown for various reasons

### heading 3
text for comparison.
text for comparison.
text for comparison.
text for comparison.
text for comparison.
text for comparison.
#### heading 4
text for comparison.
text for comparison.
text for comparison.
text for comparison.
text for comparison.
text for comparison.
##### heading 5
text for comparison.
text for comparison.
text for comparison.
text for comparison.
text for comparison.
text for comparison.
###### heading 6
text for comparison.
text for comparison.
text for comparison.
text for comparison.
text for comparison.
text for comparison.

## lists

### todo

- [ ] way to highlight content
- [ ] image captions
- [ ] block-quote marker in mobile fix
- [ ] math support
- [ ] emoji support
- [ ] font distinction
    - [ ] block-quotes 
    - [ ] links
    - [ ] inline code and code block?
- [ ] tool-tips
- [ ] better toc
- [ ] expressive code styling to match theme
- [ ] abbreviations like footnotes
- [ ] better table styles
- [ ] accent divide between front-matter and content
- [ ] inline code style mod
- [ ] better checkbox styles
- [ ] better embedded html components
- [x] heading styles
- [x] basic checkbox styles
- [x] bold, italic, strikethrough styles
- [x] remove quotes from block-quote

### unordered lists

- item 1
- item 2
  - nested item 1
  - nested item 2
    - deeply nested item
- item 3

### ordered lists

1. first item
2. second item
    1. nested item 1
    2. nested item 2
3. third item


## admonitions

:::note[custom title]
highlights information that users should take into account, even when skimming.
:::

:::tip
optional information to help a user be more successful.
:::

:::important
crucial information necessary for users to succeed.
:::

:::caution
crucial information necessary for users to succeed.
:::

:::warning
crucial information necessary for users to succeed.
:::

## code blocks

inline code: `const greeting = "hello, world!";`

```js
// javascript code block
function sayHello() {
  console.log("hello, world!");
  return true;
}

const result = sayHello();
```

<br>

```py
# python code block
def say_hello():
    print("Hello, world!")
    return True

result = say_hello()
```

## tables

| header 1 | header 2 | header 3 |
|----------|----------|----------|
| cell 1   | cell 2   | cell 3   |
| cell 4   | cell 5   | cell 6   |
| cell 7   | cell 8   | cell 9   |

### table alignment

| left-aligned | center-aligned | right-aligned |
|:-------------|:-------------:|-------------:|
| left         | center        | right        |
| text         | text          | text         |

## links

[external link](https://example.com)

[link with title](https://example.com "example website")

auto-linked url: https://example.com

## images

![jjk wall](https://p325k7wa.twic.pics/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg)

![solo leveling wall](https://sgimage.netmarble.com/images/netmarble/sololv/20240105/kpf91704430388393.jpg "arise")

## horizontal rules

above the rule

---

below the rule

## footnotes

here is a sentence with a footnote reference[^1].

[^1]: this is the footnote content.

## definition lists

term
: definition for the term
: another definition for the term

another term
: definition for another term

## collapsible section (html extension)

<details>
<summary>click to expand</summary>

this content is hidden by default but can be expanded by clicking.

it can contain **formatted text** and other markdown elements.
</details>

## special characters escaping

\*this text is not in italics\*

\`this is not inline code\`

\# this is not a heading

## line breaks

this is the first line.
this is the second line (with two spaces at the end of the first line).

this is another paragraph.

## math

inline math: $E=mc^2$

block math:

$$
\frac{d}{dx}(x^n) = nx^{n-1}
$$

### with html
H<sub>2</sub>O and E=mc<sup>2</sup>

## embedded html

<div style="color: blue; padding: 10px; border: 1px solid gray;">
  <p>this is a custom html block with styling</p>
  <ul>
    <li>item one</li>
    <li>item two</li>
  </ul>
</div>
