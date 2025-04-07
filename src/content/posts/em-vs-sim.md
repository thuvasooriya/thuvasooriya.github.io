---
title: emulators vs simulators
description: "fallin in love"
publishDate: 20 Feb 2025
# updatedDate: 24 Feb 2025
# coverImage:
#  src: "./covers/naked.png"
#  alt: "say what"
tags: []
draft: true
---
why do we do what we do

## say what
## emulators
from the very nice blog post on sifive
### emulation type

| Type           | Example               | Performance                                       |
| -------------- | --------------------- | ------------------------------------------------- |
| Functional     | QEMU                  | 100 million to >1 billion instructions per second |
| Trace-accurate | Spike                 | 10 to 100 million instructions per second         |
| Cycle-accurate | Verilator/rocket-chip | 10 to 100 thousand instructions per second        |
#### functional

QEMU is a binary translating emulator. QEMU translates RISC-V instructions to the host CPU instruction set on the fly and is therefore much faster than an interpreted simulator. However, it doesn’t provide an instruction-by-instruction trace as it spends much of its time executing native code. The focus of a binary translator is typically simulation performance and may be used for self-hosted builds.

#### trace-accurate

Spike aka `riscv-isa-sim` is an interpreting simulator that provides an instruction-by-instruction trace accurate simulation of a RISC-V processor. Spike is the “golden reference” simulator for the RISC-V ISA, and its behavior is the reference for hardware and software. The focus of an interpreter is typically behavioral accuracy for verification.

#### cycle-accurate

Cycle-accurate simulators are generally RTL (Register Transfer Level) implementations, which provide the exact cycle-by-cycle behavior of one particular RISC-V implementation. For example, Rocket’s Chisel can be compiled to Verilog, and then compiled to C++ by Verilator to create a cycle-accurate simulator. There are various levels of cycle accuracy depending on how detailed the model is, like whether it includes a detailed model of the full cache hierarchy, and DRAM using a DRAM simulator such as DRAMSimm2.

### emulation depth

There are also orthogonal simulation categories that cover the boundary and extent of the simulation:

- User Mode Simulation
- Full System Emulation

#### user mode simulation

The simulator emulates the instruction set architecture to run a binary from the target architecture but maps system calls to the host kernel. In this scenario, only the user-mode code of the application binary is emulated. In a binary translator, loads and stores can be translated directly and leverage the host MMU. QEMU supports user-mode simulation on Linux hosts, which allows running RISC-V Linux binaries on different host architectures.

#### full system emulation

The simulator emulates a full system, including MMU and emulated devices, such as UARTs, GPIOs, Storage and Network adapters. Full System Emulation is usually slower than User Mode Simulation due to software emulation of the MMU. In a binary translator, loads and stores need to emulate the MMU of the target system which may differ from the host. QEMU has a comprehensive device model and supports full system emulation with a variety of different devices.

### hardware emulation

The ultimate in simulation fidelity and speed besides an actual chip usually involves running a simulation on an FPGA (Field Programmable Gate Array). However, this can be relatively costly in time and synthesis; place and route are time-consuming activities often taking hours to test a single RTL change. There are, however, cases where small changes do not warrant testing with detailed hardware simulation but instead one can relay on fast functional simulation.