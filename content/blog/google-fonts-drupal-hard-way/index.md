---
title: Google Fonts for Drupal... The Hard Way
description: The easiest way to add fonts may not be the best way.
date: 2014-03-08
tags:
  - Web Development
  - Drupal
  - CSS
author: Cleaver Barnes
hero_image: "./movable-type.jpg"
hero_caption: Old-fashioned typesetting typefaces
sidebar:
  title: Modules in this Post
  body: "[@font-your-face](https://www.drupal.org/project/fontyourface)"
  omit_default: false
---
*Image credit: [Willi Heidelbach](https://en.wikipedia.org/wiki/File:Metal_movable_type.jpg)*

I may have turned into a Drupal curmudgeon. The signs were already there... I don't install WYSIWYG editors unless I have to. More and more I choose to write code rather than install a module.

I had been using the [Google Fonts](https://drupal.org/project/google_fonts) module and I wanted to switch fonts. There was a problem with the new font for some reason—I spent about 30 minutes troubleshooting before I gave up and decided to just do it manually.

<!-- more -->

### Sometimes, the Hard Way is the Easy Way

I know that the module really just provides a user interface to select a font and it adds a line of code to the <em>&lt;head&gt;</em> section of the page. For one line of output, why should I install an entire module? Here's what I did:

First, I went to the Google Fonts site (https://www.google.com/fonts and found the font I wanted. There's a nice interface for selecting the font variations you want. It gave me a single line of code that should go in the `<head>`:

```html
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700' rel='stylesheet' type='text/css'>
```

Drupal 7 uses the function `drupal_add_html_head()` to add code to the <em>&lt;head&gt;</em>, so I had to put everything into an array to be rendered. The array is then added using [`hook_page_alter()`](/blog/drupal-hookpagealter-example). In this case I added it to my theme's *template.php*, but it can also be added to a custom module. You can see the URL from the `<link>` above is used in the *href* element of the array.

```js
function mytheme_page_alter($page) {
  $element = array(
    '#tag' => 'link',
    '#attributes' => array(
      'href' => 'http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700',
      'rel' => 'stylesheet',
      'type' => 'text/css',
    ),
  );
  drupal_add_html_head($element, 'google_font_open_sans');
}
```

Done? Well, almost... I actually had two fonts. I could repeat the code above for each font, but decided to make it a little cleaner with a *foreach* loop. Here's the upgraded version that adds fonts for both *Open Sans* and *Short Stack*:

```php
function mytheme_page_alter($page) {
  $element = array();
  $element['google_font_short_stack'] = array(
    '#tag' => 'link',
    '#attributes' => array(
      'href' => 'http://fonts.googleapis.com/css?family=Short+Stack',
      'rel' => 'stylesheet',
      'type' => 'text/css',
    ),
  );
  $element['google_font_open_sans'] = array(
    '#tag' => 'link',
    '#attributes' => array(
      'href' => 'http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700',
      'rel' => 'stylesheet',
      'type' => 'text/css',
    ),
  );
  foreach($element as $key => $value) {
    drupal_add_html_head($value, $key);
  }
}
```

Often, as in this example, the hard way is actually quicker and easier. I could have saved the 30 minutes of troubleshooting, eliminate one of the many modules on the site and never have to install another module update.

NOTE: The Google Fonts module is no longer being developed. If you decide to do add Google Fonts the easy way, try the [@font-your-face](https://drupal.org/project/fontyourface) module instead.
