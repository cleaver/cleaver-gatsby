---
title: "Drupal hook_page_alter() Example"
description: Frypan module explained.
date: 2013-11-03
tags:
  - Drupal 7
  - render arrays
author: Cleaver Barnes
hero_image: "./frypan.jpg"
hero_caption: Wagner Ware cast-iron frying pan - circa 1960
sidebar:
  title: Links
  body: "[Bad judgement](https://www.drupal.org/project/bad_judgement) pretty much sums this up."
  omit_default: false
---
*Image: 1960's Wagner Ware cast-iron frying pan*

## Frypan Module Explained
Thanks to Pasada Media's generous offer of a free beer for anyone demonstrating a live Drupal 7 site at the Toronto D7 Release Party, I decided to upgrade this site.  Now I get to play with the new toys in D7!

After a few of those free beers Andre, one of the DUG-TO crew, received a text from a friend asking about the "Frypan party".  As every Drupalista with an iPhone has discovered, "Drupal" is autocorrected to "frypan".  Thanks to jovial atmosphere, the Drupal-love and some <a href="https://drupal.org/project/bad_judgement">bad judgement</a>, it was suggested writing a novelty module which would autocorrect all instances of "Drupal" on a page to "Frypan".

How to do this translation? Why not try out the new API hook: <a href="https://api.drupal.org/api/drupal/modules--system--system.api.php/function/hook_page_alter/7">`hook_page_alter()`</a>.

## About hook\_page\_alter()
What `hook_page_alter()` does is give you the entire page in a giant nested array.

```php
<?php
  $page['page_top']
  $page['header']
  $page['sidebar_first']
  $page['content']
  $page['sidebar_second']
  $page['page_bottom']
?>
```

You may then add to, remove or otherwise morph the contents of the page.  The single argument `$page` is an array that is passed by reference, so just make all the changes you want... no return value necessary.

## Sample Module
The full module code is on [Github](https://github.com/cleaver/Frypan) and [drupal.org](https://www.drupal.org/project/frypan), but here's most of it:

```php
<?php
function frypan_page_alter(&$page) {
  frypan_autocorrect($page);
}

function frypan_autocorrect(&$val) {
  if (is_array($val)) {
    foreach ($val as &$elem) {
      frypan_autocorrect($elem);
    }
  }
  elseif (is_string($val)) {
    $val = str_replace(array('Drupal', 'drupal'), array('Frypan', 'frypan'), $val);
  }
}
?>
```

First, the *frypan_page_alter()* function implements the hook.  All it does is call another function that does the autocorrection.

Next, the `frypan_autocorrect()` function recurses the array and substitutes "Frypan" for each instance of "Drupal".  Note that while you can do a replace on an entire nested array in PHP, but this did not work in this case.  The replace function changed all types in the nested array to string.  I had to put the `is_string()` check so that the replace would only operate on string elements.

Thanks to the DUG-TO group for the event, the booze and the silly idea.
