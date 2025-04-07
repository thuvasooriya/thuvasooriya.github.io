---
title: markdown test
description: "it begins now, when i say"
publishDate: 20 Feb 2130
updatedDate: 24 Feb 2130
coverImage:
 src: "./covers/md-test.jpg"
 alt: "screenshot of one of my notion pages"
tags: []
draft: true
---

This document demonstrates various Markdown elements to test rendering capabilities.

## Text Formatting

Plain text looks like this.

**Bold text** looks like this.

*Italic text* looks like this.

***Bold and italic text*** looks like this.

~~Strikethrough text~~ looks like this.

`Inline code` looks like this.

> Blockquotes look like this.
>
> They can span multiple lines.
>
> > And can be nested.

## Headings

### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Lists

### Unordered Lists

- Item 1
- Item 2
  - Nested item 1
  - Nested item 2
    - Deeply nested item
- Item 3

### Ordered Lists

1. First item
2. Second item
   1. Nested item 1
   2. Nested item 2
3. Third item

### Todo

- [x] Heading Styles
- [x] Basic Checkbox Styles
- [ ] Math Support
- [ ] Emoji Support
- [ ] Abbriviations
- [ ] image captions
- [ ] give bold a pop
- [ ] give italic a variant
- [ ] give underline a highlight
- [ ] accent divide between frontmatter and content
- [ ] remove quotes from blockquote
- [ ] inline quotes with a whomp
- [ ] better checkbox styles

## admonitions

:::note[custom title]
Highlights information that users should take into account, even when skimming.
:::

:::tip
Optional information to help a user be more successful.
:::

:::important
Crucial information necessary for users to succeed.
:::

:::caution
Crucial information necessary for users to succeed.
:::

:::warning
Crucial information necessary for users to succeed.
:::

## Code Blocks

Inline code: `const greeting = "Hello, world!";`

```javascript
// JavaScript code block
function sayHello() {
  console.log("Hello, world!");
  return true;
}

const result = sayHello();
```

```python
# Python code block
def say_hello():
    print("Hello, world!")
    return True

result = say_hello()
```

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
| Cell 7   | Cell 8   | Cell 9   |

### Table Alignment

| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:-------------:|-------------:|
| Left         | Center        | Right        |
| Text         | Text          | Text         |

## Links

[External link](https://example.com)

[Link with title](https://example.com "Example website")

Auto-linked URL: https://example.com

## Images

![jjk wall](https://p325k7wa.twic.pics/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg)

![solo leveling wall](https://sgimage.netmarble.com/images/netmarble/sololv/20240105/kpf91704430388393.jpg "arise")

## Horizontal Rules

Above the rule

---

Below the rule

## Footnotes

Here is a sentence with a footnote reference[^1].

[^1]: This is the footnote content.

## Definition Lists

Term
: Definition for the term
: Another definition for the term

Another term
: Definition for another term

## Collapsible Section (HTML extension)

<details>
<summary>Click to expand</summary>

This content is hidden by default but can be expanded by clicking.

It can contain **formatted text** and other Markdown elements.
</details>

## Special Characters Escaping

\*This text is not in italics\*

\`This is not inline code\`

\# This is not a heading

## Line Breaks

This is the first line.
This is the second line (with two spaces at the end of the first line).

This is another paragraph.

## Math (if supported)

Inline math: $E=mc^2$

Block math:

$$
\frac{d}{dx}(x^n) = nx^{n-1}
$$

### with html
H<sub>2</sub>O and E=mc<sup>2</sup>

## Embedded HTML

<div style="color: blue; padding: 10px; border: 1px solid gray;">
  <p>This is a custom HTML block with styling</p>
  <ul>
    <li>Item one</li>
    <li>Item two</li>
  </ul>
</div>
