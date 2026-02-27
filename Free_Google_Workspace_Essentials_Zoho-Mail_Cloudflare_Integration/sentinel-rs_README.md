# Sentinel-RS

DNS & Identity Health Checker for Google/Zoho Integration.

## Quick Start
1. Ensure you have Rust installed.
2. Run `cargo run`.

## Current Logic
- Compares Google Workspace Users (9) with Zoho Mail Licenses (5).
- Identifies gaps where users are active in Google but lack Zoho mailboxes.
