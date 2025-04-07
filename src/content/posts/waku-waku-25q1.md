---
title: waku waku - 2025 q1
description: "happy progress day!"
publishDate: 30 Mar 2025
updatedDate: 8 Apr 2025
coverImage:
 src: "./covers/waku-waku-25q1.jpg"
 alt: "happy progress day!"
tags: [waku-waku, ai, zig, hdl]
draft: false
---

> this is a moderately trimmed summary of **things i found out during the first quarter of the year 2025**. i hope to release these kinds of articles more frequently to avoid cramming stuff and to give myself some motivation. let's see how that goes. 

> if you didn't know already **waku waku (わくわく)** is a japanese onomatopoeia that expresses _excitement, anticipation, or a feeling of being thrilled_.

## what a decade!
![our world has made glorious progress](assets/waku-waku-25q1/file-20250407225051334.jpg)
recently [fireship mentioned in a video](https://www.youtube.com/watch?v=Bt-7YiNBvLE) that the week felt like a decade. much like that, to me this whole quarter felt like a few decades. let's go over a tiny fraction of the insurmountable progress that the world has made in multiple frontiers that i got to know of, shall we?

## yo! u still use chatgpt?
for a large number of people [chatgpt](https://chatgpt.com) by openai is an amazing tool and rightfully so. it does common things at an acceptable level and the initial boom of users introduced it as the go to ai tool for the [common man](https://www.youtube.com/watch?v=Al-Vt6SgdpQ).

have you ever been hit with the rate limit on chatgpt, recently they even stopped free users from selecting their preferred models. guess it is less confusing for people who know nothing about, but having no way to change it, makes it infuriating (especially for opinionated people like me). 

economy is being pincered on a pike and everyone is at each others throats about their financials and open ai expects us to pay them 200$/month[^1] to generate ghibili art ([hayao miyazaki be damned](https://timesofindia.indiatimes.com/technology/social/studio-ghibli-founder-hayao-miyazakis-old-utterly-disgusted-video-goes-viral-says-i-would-never-wish-to-/articleshow/119630114.cms)).

[^1]: i know that they charge 20\$/month to some stupid premium and 200\$/month for another big stupid premium, i'm just venting, don't mind me.

what if i say _there are even better tools and services_ that provide relatively the same or better user experience while bringing more intelligent systems. even if you are happy with chatgpt, knowing that these options exist will make you have some freedom of choice.

i don't want this to be a review article on AI, since it will age like milk. i'll just provide you with the list of links and hints about what to use them for ordered from the most commonly usable/preferable to niche use cases. let's go

:::important
some people prefer chatgpt's output for certain tasks ¯\\\_(ツ)\_/¯ over the other models. to me chatgpt's output always felt like vanilla (even with system prompts). what's wrong with vanilla, you ask?, i don't want to argue with you, just keep your vanilla and leave me alone.
:::

### gemini 2.5 pro

at the time of writing, this is the **best model by a significant margin** for most tasks that i've tested with. and grounding with google search works wonders. 

the pioneers of AI research were making slow and steady progress despite the glory ride of openai by their initial success. we can see some long standing seeds of deepmind bearing fruits through results from the recent models.

to try for yourself, go to https://aistudio.google.com and prompt!

:::tip
make sure to select the model and ground with google search option for better results.
![how to use ai studio](assets/waku-waku-25q1/ss0407@210600@2x.jpg)
:::


### grok3

the strength of grok3 comes from the **realtime access to the x (previously twitter) dataset**, the brilliant ai/system engineers that tesla/spacex[^2] has access to and the x guy[^3].  i'd just say that the model is solid and it works great for most of the tasks. i actually **prefer to do research in this** rather than any other model because of its capabilities in a functionality called _deep search_.

[^2]:now they have a separate company called xAI, but you get the point!
[^3]:i don't want to bring the name of the x guy in here since he's kind of a political figure now, dragging the reputation of these technologies. i think his current reputation does more damage to the model's actual capability than it helps.

go to https://grok.com and give it a go. _think mode_ is awesome too. 

### claude 3.7

**[the ceo of anthropic claimed](https://www.businessinsider.com/anthropic-ceo-ai-90-percent-code-3-to-6-months-2025-3) 90% of the code will be written by AI by the end of 2025**, it was taken somewhat seriously due to the fact that claude has been one of the best models for coding since claude 3.5.

with the introduction of claude 3.7 and the thinking model they took it to a whole another level. if you are into making _website frontends or some moderate backend and logic programming_, claude can give you a **one shot output that works** (provided that you give it a well constrained prompt).

go to https://claude.ai to test it out.

### into the weeds

into the weeds is not an actual model name, don't panic! these are some sprinkles for the initiated to go and explore on their own to get to know about some of the recent advancements in ai and agents

- [deepseek r1](https://github.com/deepseek-ai/DeepSeek-R1) - actual open(source) ai challenging makeshift openai
- [gemma 3](https://blog.google/technology/developers/gemma-3/) - google's deepmind proves they are the best again with really small open model beating the big dogs
- [notebooklm](https://notebooklm.google.com/) - awesome tool for researching by google
- cline extension in vscode - copilot is shit, this would feel like having JARVIS
- [sesame](https://www.sesame.com/research/crossing_the_uncanny_valley_of_voice) - insane voice model demo with nuances in voice, (knowledge context is pretty bad though)
- zed - great editor if you're on mac or linux, the context size of code you can input and asking claude about it directly inside editor _for free_ almost feels like cheating.
- [openrouter](https://openrouter.ai/) - don't get a chatgpt subscription, go for a prepaid plan (recharge and use whatever model you want)
- fish tts - open source text to speech model

:::caution[a word of advice]

these days, we’re drowning in info.
anything and everything is out there, all the time.
truth, half-truth, straight-up nonsense—you name it.
and figuring out what’s real? not as easy as it looks.

ai is cool. it’s powerful. it’s the future.
but if you offload all your thinking to it,
you’ll slowly lose the **edge/finesse/tact/intuition** that makes you you

use ai like a turbo-charged browser:
great for searching, researching, learning stuff faster.
but don’t let it do the actual work for you.
that’s like getting a gym membership and watching someone else lift.

if you stop using your brain, it stops showing up for you.
so yeah, let ai be the assistant—not the athlete
:::


## programming

if you're into computers and technology, there is a high chance you might've done some sort of programming and used some programs. some might've delighted you, some might make you frustrated and bang your head.

for better or for worse, i'm constantly exploring the options available in this space and i have some picks that i want you to know about. keep in mind that, priority is given to open source projects and if a closed source project is mentioned anyways then there is a high chance i couldn't find any better alternatives in open source or it's just that much awesome.

### open source software
open source software is awesome man! here are some of the best projects i've witnessed that might be relevant to you[^4]. 

[^4]:i haven't mentioned some legendary open source projects (like nodejs, ffmpeg, linux) just to keep this short and to introduce you to newer simpler things that are completely free.

- [blender](https://www.blender.org/) - industrial 3d artist tools be damned. check out [showcase reel](https://www.youtube.com/watch?v=TQElJP1AaS0&pp=ygUMYmxlbmRlciByZWVs0gcJCX4JAYcqIYzv) to get a grasp of what you can do
- [ollama](https://ollama.com/) - run open models on your pc locally, try running gemma3!
- [uv](https://docs.astral.sh/uv/) - modern pip/poetry/pyproject alternative by the creators of ruff
- [pixi](https://pixi.sh/latest/) - modern conda alternative
- [bun](https://bun.sh/) - nodejs alternative and a whole lot more
- [gimp](https://www.gimp.org/) - v3 recently got released, time to ditch adobe if you haven't already
- [kicad](https://www.kicad.org/) - awesome pcb design suite, fuck you altium
- [openwebui](https://openwebui.com/) - make your own chatgpt

### programming languages
my list here is kind of biased here. the current technologies i'm interested now are mostly related to systems programming and hardware description. if you want to know my suggestions regarding what languages i use for any other stack, (say web or scripting), just ping me and ask. i don't bite, the worst i can do is take forever to reply.

#### zig

let me say it. i love [zig](https://ziglang.org/). i absolutely adore what it can do, what it stands for, and the community. you might think that i should be very lonely to love a programming language, both can be true n_n.

before you say anything, if you have dealt with c and quit before the valley of despair, go ahead and try zig. even if you are a pro advocate for c, still go and checkout zig, cause zig can help with (building, writing) c better than even their own toolchains. i have absolutely zero chill over people who use cpp. i'm kind of mad at myself cause it's not even justified, the amount of hate i have for people using cpp. let's just end the cpp rant there.

last but not least if you're from rust or golang, use what works for you! just don't bother me for loving zig.

#### mojo
[mojo](https://www.modular.com/mojo) is like a new kid in town. but fear not! the team behind it is awesome![^5]. it's a python like language that has a good potential to become an alternative to cpp, cuda and all kinds of gpu programming. keep it on your lookout if you're into those fields. or you can use mojo if you just want to accelerate what you are already running on python! it's like what cpp is _supposed_ to be for c but for python.

[^5]:i have to admit that the ai generated images and stuff on their site and their licensing really ticks me off the wrong way

#### hardware description languages
i've been testing some of these out to see what they provide and these are some of the interesting ones that i think have some potential.

1. [spade](https://spade-lang.org/) -
    a modern, statically-typed hardware description language built with first-class support for modularity and abstraction. like rust for circuits — safe, powerful, and structured, letting you build reliable digital systems with fewer surprises.
2. [amaranth](https://github.com/amaranth-lang/amaranth) -
    a python-based hdl (formerly nmigen) focused on flexibility, metaprogramming, and rapid prototyping.

i've checked [spinalhdl](https://github.com/spinalhdl) as well. it's scala based and i don't like languages that even remotely look like java. so i didn't put much time into it. your mileage may vary.

## closing

there are a lot more things i wanted to show you. initially there were sections for _robotics, compute, and chemistry_ in this article, but then removed for brevity. this article is already way too long. let's wrap up. i'm planning on weekly newsletters on cool topics, let me know if you'll be into that.


if this has made you happy in some way, leave a like. if you have any suggestions or spotted a mistake, ping me or open a pr. why not give me a follow in instagram or x while your are at it. no pressure. have fun!