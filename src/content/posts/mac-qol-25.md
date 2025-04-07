---
title: welcome to the wall garden
description: a short guide to those who looked into the walled garden through their windows
publishDate: 30 Mar 2025
# updatedDate: 31 Mar 2025
# coverImage:
#  src: "./covers/naked.png"
#  alt: "say what"
tags: [macos, tools]
draft: true
---
## steppin on apple's toes

### the music situation
for the normal people ( people who don't use apple music ), it's really hard to adapt to apple's way of handling music. so i butted heads with them for a very long time. one annoying thing is whenever you press the play button their music player opens by itself and it makes me furious. the following tool prevents that and allows me to set another tool as the default tool to open in such cases. pretty nifty if you ask me.

[Music Decoy Github Link](https://github.com/FuzzyIdeas/MusicDecoy)

```sh frame="none"
defaults write com.lowtechguys.MusicDecoy mediaAppPath /Applications/Spotify.app
```

### the peeping dot situation
you need to get your hands dirty for this one and go to system boot menu

[Apple Official Guide Link](https://support.apple.com/en-us/118449)

```sh frame="none"
system-override suppress-sw-camera-indication-on-external-displays=on
```

### zoom app situation
for those who use zoom a lot while also use vim motions or esc keys. the share screen overlay keep annoying me by showing up whenever i press esc key. this [zoom hider](https://lowtechguys.com/zoomhider/) app makes it so that the overlay comes back only if you press esc thrice in a row. pretty small but pretty convenient.
