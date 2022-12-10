---
title: "Speeding Up MacOS Terminal Login - zsh Edition"
description: How to speed up terminal login times with zsh on MacOS.
date: 2022-12-07
tags:
  - MacOS
  - zsh
  - performance
author: Cleaver Barnes
hero_image: "./snail.jpg"
hero_caption: Snail slowly crawls over a pencil.
sidebar:
  title: Links
  body: |
    - [Gist to add to your .zshrc](https://gist.github.com/cleaver/28a20373161e3bc8bfa9a903c3fab32f)<br />
    - [Original article](https://www.growingwiththeweb.com/2018/01/slow-nvm-init.html)
  omit_default: false
---
*Image credit: [Pascal van de Vendel](https://unsplash.com/@pascalvendel)*

I use MacOS for most of my work and one annoying thing slowly creeping up on me is how slow it is to open a new terminal window. Finally, I reached the breaking point when it seemed like every new terminal login was taking several seconds. Small delays like this can really break you out of your flow. I had to take action.

<!-- more -->

Credit where credit is due: these were all just solutions I found when searching for a way to speed up my development process. I did make a small change to the script I found and I'll share that with you.

## Xcode Command Line Tools

The first thing I found when I started searching was that the Xcode Command Line Tools could be slowing things down. You might need to run the following from the shell to speed things up:

```bash
xcode-select --install
```

I had already done this, so that wasn't the problem.

## NVM Initialization

I use [NVM](https://github.com/nvm-sh/nvm) to manage the different versions of NodeJS on my systems. It turns out that NVM can sometimes take a long time to initialize when you first log in. I found a number of approaches to defer the initialization of NVM when you log in. The best thought-out one I discovered was this one: https://www.growingwiththeweb.com/2018/01/slow-nvm-init.html

If you use Bash, you can use this in your `.bashrc` and stop reading:

```bash
# Defer initialization of nvm until nvm, node or a node-dependent command is
# run. Ensure this block is only run once if .bashrc gets sourced multiple times
# by checking whether __init_nvm is a function.
if [ -s "$HOME/.nvm/nvm.sh" ] && [ ! "$(type -t __init_nvm)" = function ]; then
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
  declare -a __node_commands=('nvm' 'node' 'npm' 'yarn' 'gulp' 'grunt' 'webpack')
  function __init_nvm() {
    for i in "${__node_commands[@]}"; do unalias $i; done
    . "$NVM_DIR"/nvm.sh
    unset __node_commands
    unset -f __init_nvm
  }
  for i in "${__node_commands[@]}"; do alias $i='__init_nvm && '$i; done
fi
```
*(I'm copying the original snippet above for archival purposes.)*

### zsh Complications

I use `zsh` and this doesn't work for me. The issue is the `type -t` command in the first line doesn't work the same in `zsh`. I had to use `whence -w` to get this to work.

The working shell script which I added to my `.zshrc` file is here in [this Gist](https://gist.github.com/cleaver/28a20373161e3bc8bfa9a903c3fab32f), or just copy what I have below:

```bash
# Add this to your .zshrc file.
# adapted from: https://www.growingwiththeweb.com/2018/01/slow-nvm-init.html

if [ -s "$HOME/.nvm/nvm.sh" ] && [ ! "$(whence -w __init_nvm)" = "__init_nvm: function" ]; then
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
  declare -a __node_commands=('nvm' 'node' 'npm' 'yarn' 'gulp' 'grunt' 'webpack')
  function __init_nvm() {
    for i in "${__node_commands[@]}"; do unalias $i; done
    . "$NVM_DIR"/nvm.sh
    unset __node_commands
    unset -f __init_nvm
  }
  for i in "${__node_commands[@]}"; do alias $i='__init_nvm && '$i; done
fi
```

To use this, you'll need to add this to your `.zshrc` file. Make sure you replace or comment out the original NVM loader. It should look something like this:

```bash
# Remove this stuff
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Results

It still takes a second or two to open a new terminal session. I'd like it to be faster, but I think this about all I can get without upgrading hardware.
