---
title: "uart transceiver implementation in verilog"
description: "wave to your friend in the lab with numbers in a 7 segment display"
publishDate: 05 May 2024
tags: ["verilog", "uart", "fpga", "digital design", "altera"]
draft: true
---

## exposition

yeah i went with a serious title there, cause i'm serious when it comes to digital design. or so i thought. until i couldn't remember a god damn thing about verilog i learned in a 6 months course. so i had to start from scratch. and i'm glad i did. i learned a lot more than i did in that course. and i'm gonna share it with you. another good thing that encouraged me to do this was the module assignment that wanted us to implement a uart transceiver. only thing i hate about this is you have to use intel quartus. i'm a xilinx guy. but i'm not gonna complain. i'm gonna do it. and i'm gonna do it good. let's get started.

## uart

> a.k.a. serial port, rs-232, com port, rs-485

> uart stands for universal asynchronous receiver transmitter. it's a serial communication protocol.

a uart is an interface that sends out usually a byte at a time over a single wire. it does not forward along a clock with the data, which is why it is called asynchronous as opposed to synchronous. uart can operate in either half-duplex (two transmitters sharing a line) or full-duplex (two transmitters each with their own line). uart have several parameters that can be set by the user. these are:

    baud rate           : 9600, 19200, 115200, etc.
    number of data bits : 7, 8
    parity bit          : on, off
    stop bits           : 0, 1, 2
    flow control        : none, on, hardware

these settings need to be the same on both sides of the interface (the receiver and transmitter) for communication to work correctly. when the settings are incorrect, strange and unusual characters can appear on the screen. let’s look at each of these settings individually.

baud rate is the rate at which the serial data is transmitted. 9600 baud means 9600 bits per second. number of data bits is almost always set to eight. a parity bit can be appended after the data is sent. parity is always computed by doing an xor operation on all of the data bits. a stop bit always set to 1, and there can be 0, 1, or 2 stop bits. flow control is not typically used in present day applications and will likely be set to none.

as mentioned previously, there is no clock that gets sent along with the data. in any interface that does not have a clock, the data must be sampled to recover it correctly. it needs to be sampled at least eight times faster than the rate of the data bits. this means that for an 115200 baud uart, the data needs to be sampled at at least 921.6 khz (115200 baud \* 8). a faster sampling clock can be used.

what does the above fancy words mean? `asynchronous` means that the sender and the receiver don't have to be synchronized. they don't have to have the same clock signal. they just have to agree on a few things like baud rate, number of data bits, stop bits, parity, voltage levels and the protocol. alright, they have to agree on a lot of things. but they don't have to have a clock signal. why having the same clock signal is such a big dealbreaker? because it's hard to maintain the same clock signal in two different devices at a certain distance. the clock signal can be distorted by the noise in the environment. so it's better to not have a clock signal. that's why uart is asynchronous.

it's serial because it sends data bit by bit. that means you can't send `i love you` at the same time for your friend at the lab to see, you'll have to make it suspenseful. you'll have to send `i` first, then ` `, then `l`, you get it right? that's 10? bits. 8 bits for the ascii characters and 1 start bit and 1 stop bit. we'll get to that later. so when you type `i love you` the whole bits are going to be stored in a buffer cause you entered them all parallely now since you can't throw all of them through a single pipe at once you have chop the sentence and sent bit by bit. that's why it's serial. and that's why we need parallel to serial and serial to parallel converters in uart.

## debugging

Often time when debugging UARTs it is difficult to know if your computer serial port is not working or if it’s your FPGA code. Here’s a trick: Take your 9-pin cable and jumper pins 2 and 3 together. You can use a paperclip or whatever you have handy. Pins 2 and 3 are TX and RX. If you connect them together, any command you send from the computer will be received by the computer. You have created serial loopback!

Open your terminal program, try to connect to your serial cable. Hit any key on your keyboard. Baud rate and things don’t matter because it’s a loopback. If you see the character you sent out received on the terminal, your serial cable works! If not, you have a problem with your cable or with your serial program. I have had good luck using Tera Term in the past and recommend that. If you are having trouble with your serial cable, try this USB to RS-232 Cable at Amazon. I’ve used it and it works great with Windows.
