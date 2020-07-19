# snipe-it.js

> Typescript/Node.JS API wrapper for Snipe-IT

## Usage

```bash
npm install snipe-it.js
```

## Example

Make sure to fill in the information needed. (`SNIPE_URL` and `API_TOKEN`)

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
