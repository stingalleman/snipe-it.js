# snipe-it.js

![npm](https://img.shields.io/npm/v/snipe-it.js) ![GitHub](https://img.shields.io/github/license/stingalleman/snipe-it.js) [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=9D298ENTTLRBJ&source=url)

> Typescript/Node.JS API wrapper for Snipe-IT

## Installation

```bash
npm install snipe-it.js
```

Make sure to replace `SNIPE_URL` and `API_TOKEN` in this example

```js
const { Snipe } = require("snipe-it.js");

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
