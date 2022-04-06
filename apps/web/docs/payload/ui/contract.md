---
title: Contract
---

## Description

![Payload contract](/outpost/OPCo.png 'Payload contract')

1. Title - you can modify it - just click on it!
2. Controls - show, hide submit button with simulation, remove tab with contracts (CAUTION: It will delete contract and all messages attached to it)
3. Params
   1. BinUrl: link to contract compiled wasm binary - click to paste it, then you can submit to store it and automatically obtain Code ID
   <video width="100%" controls>
     <source src="/outpost/demo_code_id.mp4" type="video/mp4" />
   </video>
   2. Code id: you can edit it here, or obtain as mentioned above, correct code id and correct instantiate message is enough to recieve contract address automatically, more on that [here](/docs/payload/ui/message)
4. Doc - click on the description text, to open markdown editor, to document your contract!
5. Store contract- if BinUrl is ok - it will automatically make simulation request, to show gas fees or errors (not enough UST, for example). You can hide with controls.

   > _TODO: update issues link_ Outp0st is in early days of development, so sometimes you will encounter errors - it's harmless, just hit F5 - most likely it would be ok, but if not - contact us via [issues](https://github.com).
