[![headline](assets/repo_top.png)](https://outp0st.io)

# [Outp0st](https://outp0st.io)

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](<https://tldrlegal.com/license/apache-license-2.0-(apache-2.0)#summary>)
[![Outpost ci](https://github.com/genolis/outp0st/actions/workflows/outpost_main.yml/badge.svg)](https://github.com/genolis/outp0st/actions/workflows/outpost_main.yml)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/genolis/outp0st?filename=apps%2Fpayload%2Fpackage.json&label=payload)
![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/genolis/outp0st?color=green&filename=apps%2Frover%2Fpackage.json&label=rover)

## What is Outp0st?

Outp0st is an open-source UI tool to enable next-level team collaboration on dApp development over Terra blockchain.

Our vision for Outp0st is for it to become the trusted standard toolbox (read: UX layer) for the open source contracts infrastructure landscape. Think of it like Kubernetes for developer experience or CMS-like interface for blockchain entrepreneurs.

It consists of two modules: Payload (UI) and Rover (CLI)

### Main features

- Based on [Terra Station](https://station.terra.money) - including security mechanisms
- UI generation based on contracts source repository
- Contract deployment, instantiation and execution in organized, predictable way
- Contract and messages documentation
- Shareable UI
- IPFS as a storage layer

> ### 🚧 Outp0st is alpha software — in active but early development, battle tested on mainnet launches. You are welcome to try it out, but note there a number of [missing features and issues](https://github.com/genolis/outp0st/issues) that you may run into! 🚧

## Use cases

_TODO: Use [openzeppeling docs](https://docs.openzeppelin.com/defender/admin) as refrence to describe use cases_

### Contract development - quick contracts testing

- Developer coded a contract, compiled it and wants to test on localterra
- Create Rover config – place it in folder with contract project​
- Use Rover to generate UI for contracts developed
- Use link provided by Rover to check how contracts looks in integrated environment (user - react app - localterra)
- Using Payload modules developer can adjust messages and documentation on each contract and message

### Team contract development - share work to your teammates

- Everything above
- Using Payload module, developer can save adjusted contracts, messages and documentation and recieve a new link
- He can now share this link with teammates to show and discuss his work

### Mainnet deployments with separation of concerns

- Stakeholder wants to create mainnet deployment on TGE without the risk of main wallet exposure to other team members
- He will ask developer to provide link to outpost with his specific contracts and deplyment steps​
- After recieving this link he will do it step by step, using his wallet extension to approve every step​

## Project roadmap

Detailed roadmap will be available soon(tm)

## Getting Started

Check out [the documentation](https://outp0st.io/docs/quickstart) on how to start using outp0st.

## Documentation

- [Overview](https://outp0st.io/docs/overview)
- [Examples](https://outp0st.io/docs/examples)
- [Payload](https://outp0st.io/docs/payload/anatomy)
- [Rover](https://outp0st.io/docs/rover)

## Community

- [Discord chatroom](https://discord.gg/CQjDUyBz) - Get support or discuss the project
- [Contributing to Outp0st](https://github.com/genolis/Outp0st/blob/main/CONTRIBUTING.md) - Start here if you want to contribute
- [RFCs](https://github.com/genolis/Outp0st/labels/rfc) - Help shape the technical direction
- [FAQ](https://Outp0st.io/docs/FAQ) - Frequently Asked Questions
- [Code of Conduct](CODE_OF_CONDUCT.md) - This is how we roll
- [Adopters](ADOPTERS.md) - Companies already using Outp0st

_Give us a star ⭐️ - If you are using outp0st or think it is an interesting project, we would love a star ❤️_

## License

Copyright 2022-now © The Outp0st Authors. All rights reserved.
Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0

## Security


For further details please see our complete [security release process](SECURITY.md).

## Disclaimer

Outp0st IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND. No developer or entity involved in creating the Outp0st will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of Outp0st tooling, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
