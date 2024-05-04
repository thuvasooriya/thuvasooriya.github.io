---
title: "triggered by trignometry"
description: "a cheatsheet to remember the lost art of trigonometric identities"
publishDate: "04 May 2024"
updatedDate: 04 May 2024
coverImage:
  src: "./triggered-cover.png"
  alt: "why tree why do you exist"
tags: ["math", "trigonometry"]
---

<!-- cover art is a unit circle with all the short cuts to trigonometric identities. i'll make sure to add it later. -->

## exposition

> note to self: just skip the exposition when you are in a hurry, i know you like reading your own stuff.

so i was brooding in the lecture hall trying to solve a simple integration problem in my signals and systems lectures, and i was stuck at a point where i had to integrate a trigonometric function. i was like, "i know this, i have done this before, why can't i remember this?" and then i realized that i had not done this in a long time. so i decided to make a cheatsheet for myself to remember the trig identities. little did i know that i'm too damn lazy to wait for another year to learn trigonometry. don't ask me how i passed my exams, i don't know either. but i wasn't happy so here we are.

---

## trigonometric identities

only after i realearned them i realized there are just a handful of them to remember. here is a quick test to see if you can remember all the trig identities in the next 2 mins.

> do you remember **unit circle**, **all silver tea cups**, **odd or even** functions, **pythagorean** theorem, **sin(x+y) and cos(x+y)**?

if the answer to the above question is an astounding yes, then you are good to go. feels strange? don't worry, i got you covered.

### basics

here are the 6 basic definitions of trigonometry

1. $$\sin(x) = \frac{opposite}{hypotenuse}$$
2. $\cos(x) = \frac{adjacent}{hypotenuse}$
3. $\tan(x) = \frac{opposite}{adjacent} = \frac{\sin(x)}{\cos(x)}$
4. $\cot(x) = \frac{1}{\tan(x)}$
5. $\sec(x) = \frac{1}{\cos(x)}$
6. $\csc(x) = \frac{1}{\sin(x)}$

### unit circle

the unit circle is a circle with radius 1. the trigonometric functions are defined as the coordinates of the point on the unit circle. the point $(\cos(x), \sin(x))$ is the point on the unit circle at angle $x$.

### all silver tea cups

<!-- TODO: summarize below in an image -->

this is a mnemonic to remember the signs of trigonometric functions in different quadrants.

1. **all** - all are positive in first quadrant
2. **silver** - $\sin(x)$ is positive in second quadrant
3. **tea** - $\tan(x)$ is positive in third quadrant
4. **cups** - $\cos(x)$ is positive in fourth quadrant

### odd or even functions

the trigonometric functions are either odd or even functions. the odd functions are symmetric about the origin and the even functions are symmetric about the y-axis.

1. $\sin(-x) = -\sin(x)$
2. $\cos(-x) = \cos(x)$
3. $\tan(-x) = -\tan(x)$
4. $\cot(-x) = -\cot(x)$
5. $\sec(-x) = \sec(x)$
6. $\csc(-x) = -\csc(x)$

### pythagorean theorem

the pythagorean theorem is a fundamental theorem in trigonometry. it states that the square of the hypotenuse is equal to the sum of the squares of the other two sides.
$\sin^2(x) + \cos^2(x) = 1$ is an identity derived from the pythagorean theorem.

### sin(x+y) and cos(x+y)

the trigonometric functions can be expressed in terms of sum of angles. the following identities are useful to remember.

7. $\sin(x \pm y) = \sin(x)\cos(y) \pm \cos(x)\sin(y)$
8. $\cos(x \pm y) = \cos(x)\cos(y) \mp \sin(x)\sin(y)$

one fun mnemonic to remember the above identities that i found on one of [patrickjmt's youtube video](https://www.youtube.com/watch?v=sGDbKmWmTDw) is,

> sine is **sum**thing that switches

say that again 5 times and imagine you switching handsigns until you put up your middle finger. now you won't forget this. i know i still can so i'll make sure to read this blog again.

> cosine is the opposite of sine, which means if sign is the same in sine so it will be opposite in cosine. and since sine switches, cosine doesn't.

> lhs and rhs begins with the same trig function.

here is a tan version. i wonder where did that come from.

$\tan(x \pm y) = \frac{\tan(x) \pm \tan(y)}{1 \mp \tan(x)\tan(y)}$

i won't be mentioning much about tan versions from now on since i find calculating in sine and cosine easier for mental models. and you can always derive tan from sin and cos

## the big dogs

### double angle identities

$x = y$

> $\sin(2x) = 2\sin(x)\cos(x)$

> $\cos(2x) = \cos^2(x) - \sin^2(x) = 2\cos^2(x) - 1 = 1 - 2\sin^2(x) $

> $\tan(2x) = \frac{2\tan(x)}{1 - \tan^2(x)}$

here pythagorean adds in a bonus which comes in handy for half angle identities.

### half angle identities

$\sin^2(x) = \frac{1 - \cos(2x)}{2}$

$\cos^2(x) = \frac{1 + \cos(2x)}{2}$

i know you've been spoiled in the previous section but it's still cool. if you face any difficulties deriving this, i recommend watching [patrickjmt's video](https://www.youtube.com/watch?v=5Q2nZ2b5b6k).

### product to sum identities

here is where the revelation happened to me. i always had trouble remembering these. but now i know that these are basically just using $\sin(x+y)$ and $\cos(x+y)$ identities in some fancy ways.

now, how do you feel about the identities below?

_hint: i've switched the side of the products to make it easy for you!_

> $\sin(x+y) + \sin(x-y) = 2\sin(x)\cos(y)$

now that you have a mental note of the sum of angles identity, you can add up $\sin(x)\cos(y) + \cos(x)\sin(y)$ with sign turned version of the same which will cut the last part off and you will be left with $2\sin(x)\cos(y)$. easy right?

> $\sin(x+y) - \sin(x-y) = 2\cos(x)\sin(y)$

this is not so different from the previous one, we all know what happens when negative meets negative right?

> $\cos(x+y) + \cos(x-y) = 2\cos(x)\cos(y)$

this is crazy twins version of the previous ones. begins with cos and last part sign is changed, hence its a goner. so you are left with $2\cos(x)\cos(y)$.

> $\cos(x+y) - \cos(x-y) = -2\sin(x)\sin(y)$

this is the odd one out. with a negative result but if you think from basics all terms are turned negative in $\cos(x-y)$ so when the positive thing in $\cos(x+y)$ ( $\cos(x)\cos(y)$ of course) is cut off we are left with $-2\sin(x)\sin(y)$.

i know you are feeling good about yourself.

### sum to product identities

so i've made some nifty changes in the presentation of above product to sum and below sum to product to make the relationship apparent to you.

> $\sin(a) + \sin(b) = 2\sin(\frac{a+b}{2})\cos(\frac{a-b}{2})$

> $\sin(a) - \sin(b) = 2\cos(\frac{a+b}{2})\sin(\frac{a-b}{2})$

> $\cos(a) + \cos(b) = 2\cos(\frac{a+b}{2})\cos(\frac{a-b}{2})$

> $\cos(a) - \cos(b) = -2\sin(\frac{a+b}{2})\sin(\frac{a-b}{2})$

do you see anything? just compare x and y with a and b and derive a relationship. it will only make you high when you git it yourself so i won't be spoiling the fun for you.

do you see god? don't bother, you are god now.

### other identities

here are some other identities that you might find useful. but i find them sparingly in use.

the below section is a bit of a mess. i'll make sure to clean it up later but for now it's a note for myself.

$\tan^2(x) = \frac{1 - \cos(2x)}{1 + \cos(2x)}$

$\cot^2(x) = \frac{1 + \cos(2x)}{1 - \cos(2x)}$

### inverse trigonometric functions

need to fill this void

### hyperbolic trigonometric functions

oops wrong page, but let them stay. they might prove useful.

$\sinh(x) = \frac{e^x - e^{-x}}{2}$

$\cosh(x) = \frac{e^x + e^{-x}}{2}$

$\tanh(x) = \frac{\sinh(x)}{\cosh(x)}$

$\coth(x) = \frac{1}{\tanh(x)}$

### hyperbolic trigonometric identities

$\sinh^2(x) - \cosh^2(x) = 1$

## conclusion

nothing is ever going to stick if you don't practice. so make sure to practice these identities. for now i lack in that regard too, i'll update this blog with some practice problems and applications later.

if you want something to print and have i recommend checking out [lamar's cheatsheets](https://tutorial.math.lamar.edu/Extras/CheatSheets_Tables.aspx)

i hope you find this cheatsheet useful. i know i will. i'll make sure to read this blog every now and then to remember the trigonometric identities. i hope you do too. if you have any suggestions or corrections, feel free open a github issue or ping me in x. i'll make sure to update this blog. until then, happy mathing!
