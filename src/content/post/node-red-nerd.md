---
title: "dealing with node-red like a nerd"
description: "my hard ass time with node-red when trying an embedded project"
publishDate: "02 May 2024"
updatedDate: "17 May 2024"
tags: ["embedded"]
draft: true
---

## exposition

by this time you probably know what node-red is and what is it used for if you really wanna know, ping me in x.
this post tells you how to install node-red in a way that you can use it like a modern day chad.

## installation

i use [bun](https://bun.sh/) for everything javascript nowadays. so i decided to install and manage node-red with it too. since i haven’t faced any issues yet and it’s way faster and cooler, i would recommend you to do that too. at the time of writing bun is relatively stable in windows and almost usable in unix. how bad can it be? if it's not your cup of tea just use node instead, it's not that hard. i'll update the instructions for that too when i get the time.

```bash
bunx --bun node-red
```

now visit your [local host url](http://127.0.0.1:1880/) to see the node-red interface.

### somethin extra

here are some of the few things that i do to make my life a teeny bit easier

#### installing themes

if you don't know already i'm a dark mode fanatic. i can't live with staring at a white screen for too long. so i installed a dark theme for node-red too. here's how you can do it too.

1. navigate to `$HOME/.node-red` in terminal and install community themes

   ```bash
   bun install @node-red-contrib-themes/theme-collection
   ```

2. modify the settings

   ```json
     editorTheme: {
       theme: "dracula",
       codeEditor: {
         lib: "monaco",
         options: {
           // theme: "",
         },
       },
     },
   ```
