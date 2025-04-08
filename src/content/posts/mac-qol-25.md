---
title: welcome to the wall garden
description: a short guide to those who got into the walled garden by breaking out from their windows
publishDate: 30 Mar 2025
updatedDate: 31 Mar 2025
coverImage:
 src: "./covers/mac-qol-25.jpg"
 alt: "macbook says hi"
tags: [macos, tools]
draft: true
---

> recently many of my colleagues and friends were buying macbooks as their personal laptops, ditching their windows laptops. of course this has been happening throughout the world since 2020 when apple redefined what a mobile personal computer can do with their m series of chips. yet it's great to see people close to me break out of their windows to come outside (pun intended)

:::important
this post is solely about mac and macos, i hate iphones and ipads because of the software limitations they pose in the name of security. tbf macos does that too, but fortunately you can get around them thanks to some smart people in the community (no apple i'm not giving you credit for software).

i'm pretty excited about running linux on the m series chips with asashi linux too, but keep in mind i'm a person of acutely niche priorities, for many people who take on the macbook, once you get to navigating around some peculiarities in macos and start browsing then there is no stopping you.
:::

## macs are not just cool
they are awesome.

i know i'm not making you feel any better, but hear me out. let's say you have been using your mom's old laptop as your main pc for so many years. and suddenly you have a laptop at 999$ that is from apple. of course it's initially excitement but if you've used both a windows laptop and a macbook then you'd know the difference between them just in build quality. mac just feels so good and confident to work on just because of its build quality. i remember going back to some windows laptops to type on and instantly realizing the palm pressing the chasy down and feeling less confident about the product(i know that there are premium windows laptops for enterprise users that are built to last like the thinkpad series from lenovo and dell xps etc. but that's just one side of the story right? if you're around at 2020 looking for laptops i would've confidently said there is no laptop on the planet that will provide you with this much for this price).

## steppin on apple's toes

### the business strategy of a hardware first company

### getting around system defaults

#### keyboard shortcuts
cmd tab
cmd \`
ctrl arrow


#### the apple music situation
for the normal people ( people who don't use apple music ), it's really hard to adapt to apple's way of handling music. so i butted heads with them for a very long time. one annoying thing is whenever you press the play button their music player opens by itself and it makes me furious. the following tool prevents that and allows me to set another tool as the default tool to open in such cases. pretty nifty if you ask me.

[Music Decoy Github Link](https://github.com/FuzzyIdeas/MusicDecoy)

```sh frame="none"
defaults write com.lowtechguys.MusicDecoy mediaAppPath /Applications/Spotify.app
```

#### the peeping dot situation
you need to get your hands dirty for this one and go to system boot menu

[Apple Official Guide Link](https://support.apple.com/en-us/118449)

```sh frame="none"
system-override suppress-sw-camera-indication-on-external-displays=on
```

### apps and alternatives

#### devops
orbstack
parallels
crossover/wine
utm
zed
ghostty
obsidian
xcode tools
homebrew/nix
amethyst/aerospace
chatgpt
brave/arc/orion
please for the love of god use adblockers. and if you want to support a non invasive site then you can turn off adblocker for that specific site only
ollama
raycast


#### zoom app situation
for those who use zoom a lot while also use vim motions or esc keys. the share screen overlay keep annoying me by showing up whenever i press esc key. this [zoom hider](https://lowtechguys.com/zoomhider/) app makes it so that the overlay comes back only if you press esc thrice in a row. pretty small but pretty convenient.
