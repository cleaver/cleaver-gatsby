---
title: "Is Promise-chaining Better Than async/await?"
description: Which is the better programming practice for JavaScript? Promise chain or async/await.
date: 2023-04-24
tags:
  - JavaScript
  - TypeScript
  - asynchronous
  - promises
  - async-await
  - opinion
author: Cleaver Barnes
hero_image: "./promise-chain.jpg"
hero_caption: Padlocks locked to a cable.
sidebar:
  title: Links
  body: |
    - [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) documentation on MDN.
    - [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)/[await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) documentation on MDN.
  omit_default: false
---
*Image credit: [marcos mayer](https://unsplash.com/@mmayyer) on [Unsplash](https://unsplash.com/photos/8_NI1WTqCGY)*


> "When I was your age, we used to do callback functions all the way down and be happy with it!"
>
> -Someone (Possibly me.)

If you've written JavaScript for a while, you've probably seen code that needed several asynchronous steps and used callbacks within callbacks. This often led to the dreaded [Pyramid of doom](https://en.wikipedia.org/wiki/Pyramid_of_doom_(programming)) and made the logic very difficult to understand. Things are easier since ES2015 with the introduction of [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), and then [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)/[await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) in ES2017. I often wonder though: "Do we really need `async/await`?

<!-- more -->

**tl;dr: I have an opinion. (And I encourage you to have your own differing opinion.)**

## Why I Favour Promise-chaining

### 1. Readability
Code is more readable and easier to understand. Coming from the callback era, I'm used to thinking about these things as a chain where each step is dependent on the success of the previous step. Adding `.then()` for each step also feels similar to method chaining used by so many libraries.

For example:

```javascript
function printOnlyGoodFilms() {
  return fetch('https://swapi.dev/api/films')
    .then((response) => response.json())
    .then((data) => {
      return data.results
        .filter((film) => film.episode_id >= 4)
        .map((film) => {
          return { id: film.episode_id, title: film.title };
        });
    })
    .then((films) => {
      films.forEach((film) => {
        console.log(`Episode ${film.id}: ${film.title}`);
      });
    })
    .catch((error) => console.error(error));
}
// prints:
//   Episode 4: A New Hope
//   Episode 5: The Empire Strikes Back
//   Episode 6: Return of the Jedi
```

This chaining feels a lot like the code we write when manipulating strings and arrays:

```javascript
const tagString = 'foo,Bar, Baz';
const tagArray = tagString
  .toLowerCase()
  .split(',')
  .map((tag) => tag.trim())
  .sort();
// gives us: [ 'bar', 'baz', 'foo' ]
```

You and do the same with  `async/await`, but it's just an extra layer of syntactic sugar and aren't promises sweet enough?

### 2. Pipes are a Great Metaphor

I'm a big fan of functional programming in general and the idea of chaining reminds me of the [pipe operator](https://elixir-lang.org/getting-started/enumerables-and-streams.html#the-pipe-operator) in Elixir, one of my favourite languages. I don't want to make this about Elixir, but here's a taste of the pipe operator `|>`:

```elixir
"foo,Bar, Baz"
  |> String.downcase()
  |> String.split(",")
  |> Enum.map(&String.trim/1)
  |> Enum.sort()
```
This is the equivalent of the JavaScript method chaining example.

The important thing is that the pipeline is clear... the output of one step is the input of the next step. There can be nothing in between. If you do something similar using `async/await`, you can stray off path and the result could be less functional.

```javascript
const thing = await first_async();
// go do something else, maybe non-functional
thing.property = 'arbitrary value';

const nextThing = await second_async();
```
In the above example the chain is broken and the flow of the code may not be clear. This won't be a problem if you carefully organize your code, but I prefer to force things to be very clear.

### 3. Those Damned asyncs!

The `await` operator promises a lot. (No pun intended.) Take that messy asynchronous logic and slap an `await` in front of it. Magically your function is as simple as a synchronous function! Except, not quite. You can only use `await` if it's contained in an async function.

This will fail:

```javascript
function foo() {
  const result = await fetch('https://swapi.dev/api/people/1');
}
```

For this to work, you cannot forget the `async` operator on the function:

```javascript
async function foo() {
  const result = await fetch('https://swapi.dev/api/films');
}
```

This just pushes the async further up the stack. You have to handle that async eventually and that's either going to be a promise or a callback.

However, when you have a library that expects the async function, you're all good. In those cases you can just use `await` and it's someone else's problem.

### 4. Performance?

I've read about performance advantages of both promise chaining and async/await. Likely it doesn't matter. Because we have an asynchronous operation, it probably takes much more time to do the HTTP request, or write to a database than a few microseconds difference between one approach or another.

If you think it will matter to you, benchmark your particular use case and base your decision on actual data.

## Which Do I Use?

I use both. I like promises, but `async/await` has it's uses. If you're looking for some rules to decide, I'd suggest the following:

1. What is the convention followed by the team I'm working with, or the project I'm working on? Use that. I value consistency above most other considerations.
2. What is the convention of the framework or library I'm using? If you stick closer to the examples of the framework, you are less likely to cause a problem and it's more likely to be readable.
3. Does one make a particular function simpler? Consider that.
4. Use promises because I like it better.

Feel free to modify rule 4 for your own purposes.