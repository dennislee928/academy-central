# RISC Zero

## Core Features
RISC Zero is a pioneering Zero-Knowledge Virtual Machine (ZKVM). It allows developers to write programs in standard, familiar languages like Rust and C++, and then automatically proves the execution of that code on a simulated RISC-V architecture without requiring custom circuit design.

## Primary Use Cases
Building scalable Layer 2 blockchains, generating off-chain proofs for on-chain verification, and ensuring computational integrity for general-purpose software without exposing the underlying data.

## Getting Started / Instructional Guide
To use RISC Zero, ensure you have Rust installed. Install the `cargo-risczero` tool. Create a new RISC Zero project using the provided templates. Write your core logic (the "guest" code) in Rust. The framework will handle compiling this into a RISC-V ELF and generating the zero-knowledge proofs of its execution, which you can then verify in your "host" application.