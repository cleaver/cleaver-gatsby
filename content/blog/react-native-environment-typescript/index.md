---
title: "Access Environment Variables in React Native with TypeScript"
description: The right way to access environment variables in React Native and Expo with TypeScript.
date: 2023-05-02
tags:
  - JavaScript
  - TypeScript
  - React Native
  - notes archive
author: Cleaver Barnes
hero_image: "./yellow-lockers.jpg"
hero_caption: Close up of numbered yellow mini-lockers.
sidebar:
  title: Links
  body: |
    - [Expo](https://expo.dev) for creating React Native apps.
    - [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv) on NPM.
  omit_default: false
---
*Image credit: [Claudio Schwarz](https://unsplash.com/@purzlbaum) on [Unsplash](https://unsplash.com/photos/UqBxsMLiQ5g)*

React Native with Expo gives you a familiar JavaScript approach to developing native apps. Some things are quite different, however, since your app will be running on completely different hardware. You can't just reference `process.env.MY_API_URL` like you might expect. So how are you supposed to do it?

<!-- more -->

*My notes archive: I recently realized that I have actually written many blog posts that have never been published. Usually when I research a topic or resolve an issue, I write it up in a note which I keep filed away. This is one of those notes.*

## What I'm Trying To Do

I was writing a simple React Native app using [Expo](https://expo.dev/) that accesses an API. I didn't want to hard code the API URL, so I needed a way to set the value in a `.env` file as I would in other projects.

## The *react-native-dotenv* Package

Once I'd verified that `process.env.MY_API_URL` didn't work, a quick search led me to the [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv) package on NPM.

To install using with `npm`:

```bash
npm install -D react-native-dotenv
```

Or with `yarn` as I usually do:

```bash
yarn add -D react-native-dotenv
```

There's a little bit of setup in your `babel.config.js` file.

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "safe": true,
        "allowUndefined": false,
        "verbose": false
      }],
    ],
  };
};

```

You'll import `moduleName` in your TypeScript modules and `path` is the filename (usually `.env`) for your environment variables. The rest of the options are described in the [documentation](https://www.npmjs.com/package/react-native-dotenv).

Following this example, your variables will be set in a `.env` file in the project root.

```bash
MY_API_URL="https://pokeapi.co/api/v2/"
```

## Typescript Setup

Here's the part where I initially ran into trouble. There's some extra setup for TypeScript.

Create a type file, `types/env.d.ts`:

```ts
declare module '@env' {
  export const MY_API_URL: string;
}
```

## Use the Environment Variables in Your Modules

With the setup in place, all you have to do is import the `MY_API_URL` from the `@env` module we defined earlier.

```js
import { MY_API_URL } from '@env'
```

Not as simple as `process.env`, but things are a little different in the React Native world.