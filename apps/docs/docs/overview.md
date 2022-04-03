---
title: Overview
---

## What is Outp0st?

Outp0st is an open-source UI tool to enable next-level team collaboration on dApp development over Terra blockchain.

It consists of three modules: Payload (UI), Hub (Environments) and Rover (CLI)

### Main features

- Based on [Terra Station](https://station.terra.money) - including security mechanisms
- UI generation based on contracts source repository
- Contract deployment, instantiation and execution in organized, predictable way
- Contract and messages documentation
- Shareable UI
- IPFS as a storage layer

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
