---
title: Quickstart
---

## Fastest way

1. Go to this [link](https://app.outp0st.io/outpost?state=https%3A%2F%2Fdweb.link%2Fipfs%2Fbafybeifkajmpjwfufflwryki3xa66hn3y5mlbamkla5rr45puzxp2xc3vy%2Frover_generated.json#CONFIG)
2. It's [terrain's](https://github.com/iboss-ptk/terrain) starter project, if you want to check more complex examples, go to [this](/docs/examples) page
3. Head to [next section](/docs/payload) to figure things out

## For cosmwasm developers

- You got your dev environment up and ready
- Create rover.config.json in root folder of your project from this template

```js
{
  "contractsPath": "./contracts", // where your contracts folders
  "artifactsPath": "artifacts", // where artficats
  "basePayloadUrl": "https://app.outp0st.io/",
  "env": "local", // more options: test, main
  "workspace": false // if false - rover will look for artficats inside contracts folder, else outside
}
```

- Go to [web3.storage/tokens](https://web3.storage/tokens/), and obtain token

```sh
# assuming you ar in root folder of repo
echo TOKEN_WEB3STORAGE=[Place your token here] > .env
npx @outp0st/rover
```

## For everybody

### Prerequisites

- Node LTS
- Npm 8+
- Token from [web3.storage/tokens](https://web3.storage/tokens/)

```sh
git clone git@github.com:genolis/outp0st.git
cd terra-outpost-mono/packages/examles/terrain-starter
echo TOKEN_WEB3STORAGE=[Place your token here] > .env
npx @outp0st/rover
```

Use link from output to check things out

## For everybody else trying to make things work

- Go to this tutorial from [terra.money](https://docs.terra.money/docs/develop/dapp/quick-start/initial-setup.html)
- Then [this](https://docs.terra.money/docs/develop/dapp/quick-start/using-terrain-localterra.html)
- You can stop [here](https://docs.terra.money/docs/develop/dapp/quick-start/using-terrain-localterra.html#scaffold-your-dapp) and proceed
- Create rover.config.json in root folder of your project from this template

```js
{
  "contractsPath": "./contracts",
  "artifactsPath": "artifacts",
  "basePayloadUrl": "https://app.outp0st.io/",
  "env": "local", // more options: test, main
  "workspace": false // if false - rover will look for artficats inside contracts folder, else outside
}
```

- Go to [web3.storage/tokens](https://web3.storage/tokens/), and obtain token
- Place .env file inside root folder with this contents
