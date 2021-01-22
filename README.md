# snipe-it.js

[![npm](https://img.shields.io/npm/v/snipe-it.js)](https://npmjs.com/package/snipe-it.js) [![GitHub](https://img.shields.io/github/license/stingalleman/snipe-it.js)](LICENSE.md) [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=9D298ENTTLRBJ&source=url)

> Typescript/Node.JS API wrapper for Snipe-IT

## Installation

```bash
yarn install snipe-it.js
```

Make sure to replace `SNIPE_URL` and `API_TOKEN` in this example

```ts
const { Snipe } = require('snipe-it.js');

const snipe = new Snipe(SNIPE_URL, API_TOKEN);

async function func() {
  const data = await snipe.hardware.get({
    limit: 50
  });
  console.log(data);
}

func();
```

Documentation is located [here](https://stingalleman.github.io/snipe-it.js/)
