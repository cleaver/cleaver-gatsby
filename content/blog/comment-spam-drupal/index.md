---
title: Comment Spam on Drupal
description: Dealing with all the junk.
date: 2014-06-27
tags:
  - Drupal
  - spam
  - security
author: Cleaver Barnes
hero_image: "./spam.jpg"
hero_caption: Bench tagged with "spam"
sidebar:
  title:
  body:
  omit_default: false
---
*Image credit: [Luc De Leeuw](https://www.flickr.com/photos/9619972@N08/2576214852)*

Back in the 90's when the web was fresh and new and full of promise, we imagined information shared freely around the globe in a technical utopia. Our lives would be immeasurably better and everyone would share cat photos and live in harmony. What happened? Spam happened. (At least if you ask me.)

I've done back-of-the-envelope calculations and figured that I've lost thousands of dollars to spam over the years. Not to some fake Nigerian prince, but in lost productivity. Today, I've got email spam to a manageable level, but I've seen the rise in comment spam on this blog. I like to keep comments open and not require registration or Disqus, but lately I've been needing to clear out the spam every few days. What to do?

<!-- more -->

### Comment Spam Countermeasures

As soon as I decided on having open comments, I installed [Mollom](https://www.drupal.org/project/mollom). It worked well, but recently either the volume or the evasiveness of spam has started to overwhelm Mollom. I knew I needed something more, but I was holding off on installing Disqus to manage the comments—I'd rather not force people to log in when it shouldn't be necessary.

It's important to identify the enemy... who are they? Actually, it's not *who*, but rather *what*. The enemy is a 'bot. Spammers develop [spambot](https://en.wikipedia.org/wiki/Spambot) software that scans webpages for text fields to fill out and link back to their sites. What if we give the 'bots a text field to fill out to satisfy their robotic work ethic, but guide them away from fields that will actually be displayed on the site. That's exactly what the [Honeypot module](https://www.drupal.org/project/honeypot) for Drupal does.

Honeypot uses a couple of techniques to confound spambots, but the main one is to create fake text fields on the page that are not visible to visitors. The fields are visible to the 'bots, however. They fill them out with their links to "enlargement products", or whatever it is and smugly move on to the next spam target. Little do they know, the links never make it onto the page.

There's a little bit more to how Honeypot does it's job. You can read a more in-depth article here: http://www.midwesternmac.com/blogs/jeff-geerling/introducing-honeypot-form-spam

### Does it work?

It works. Since I installed Honeypot, I've had zero comment spam actually make it through. I still have Mollom installed and it gives me statistics on the spam repelled. It's increased in quantity, but still nothing makes it through. I'd like to think that we're one step closer to that cat-photo-sharing technological utopia, but I'm not letting my guard down yet. The war against spam is an ongoing one with every measure answered by a countermeasure. It's not over yet.

### Update

Honeypot only worked for so long and comments are now gone from this site.
