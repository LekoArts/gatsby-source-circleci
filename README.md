# gatsby-source-circleci

Source plugin for [CircleCI's API](https://circleci.com/docs/api/#circleci-api-reference-guide).

## Install

```shell
npm install --save gatsby-source-circleci
```

## How to use

### Prerequisites

Go to [Account dashboard](https://circleci.com/account/api) and create a new API token.

Save the API key in an environment file like:

```
CIRCLECI_KEY=your-access-token-here
```

### gatsby-config

Add the plugin and define the API key.

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-circleci',
      options: {
        apiKey: process.env.CIRCLECI_KEY,
      }
    }
  ]
}
```