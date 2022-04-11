---
title: Getting started
---

### Prerequisites

- Node LTS
- Npm 8+
- Ubuntu or macos (windows, some days)

### Develop

```sh
git clone git@github.com:genolis/outp0st.git
npm i
npm run dev
```

### Structure

- **apps/payload** forked terrastation with outp0st ui
- **apps/rover** cli tool
- **apps/web** landing page and this docs
- **packages/core** core npm lib for all stuff

_we are not using cz-commit for now so just commit with [convenctional commit notation](https://www.conventionalcommits.org/en/v1.0.0/#summary)_