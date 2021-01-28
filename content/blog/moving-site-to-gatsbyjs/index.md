---
title: "Moving this Site to Gatsby"
description: Switching away from Drupal.
date: 2021-01-27
tags:
  - Drupal 7
  - GatsbyJS
author: Cleaver Barnes
hero_image: "./gatsby.jpg"
hero_caption: Gatsby
sidebar:
  title: Links
  body: "[Gatsby](https://gatsbyjs.org) static site generator.<br /> [Source code](https://github.com/cleaver/cleaver-gatsby) for this site.<br /> [How to GraphQL](https://www.howtographql.com/) on querying content.<br /> [Tailwind CSS](https://tailwindcss.com/)."
  omit_default: false
---
## Why Switch from Drupal?

This site has been running on Drupal 7 for almost exactly 10 years. I originally created it to get a [free beer](/blog/drupal-hookpagealter-example) at the [Drupal 7 release party](https://groups.drupal.org/node/113014) on January 11, 2011. Not a bad run and Drupal 7 still has nearly [2 years left before EOL](https://www.drupal.org/psa-2019-02-25).

The main reasons to switch away from Drupal are:

- Drupal has become more of an enterprise-level tool and this site isn't exactly "enterprise". I don't even need a CMS.
- I've been working on a lot of other technologies since 2011.
- It's hard to beat the performance and security of a static site.
- Upgrading to a new version of Drupal is quite a lot of work.

## Why Switch to Gatsby?

I wanted to go with a static site generator, since I liked the speed and simplicity. Also, I wanted to get rid of cookies entirely. I'm not trying to get customers and track conversions, so there's no need for Google Analytics. My Drupal site hasn't been hacked--I even survived [Drupalgeddon](https://www.drupal.org/forum/newsletters/security-advisories-for-drupal-core/2014-10-15/sa-core-2014-005-drupal-core-sql), but you do have to keep up with patches. A static site is less likely to be hacked than a CMS.

I initially considered a conventional static site generator that takes markdown and spits out HTML. [Jekyll](https://jekyllrb.com/) was a front-runner, since I'm fairly comfortable in Ruby and it seems well suited to a simple blog. This would have been the simplest solution, but I decided to keep looking.

Next, I looked at JavaScript site generators that build a cross between a static site and a Single-Page App. I looked at [VuePress](https://vuepress.vuejs.org/), since I'm familiar with Vue. It could do the job, but it is focused on building documentation sites. I don't like forcing frameworks to do what they're not intended to, so I dropped this one.

Gatsby was always a consideration, since it is popular and has a wide array of plugins and integrations. It also uses React for its JavaScript framework. Out of the major JS frameworks, React is the one I'm least familiar with. For basic components, React is extremely easy to use and this would be a great opportunity to get some more experience. In addition to React,

In summary:

- Speed - one of the best things I can do for people reading the blog is to make it fast.
- Simplicity - no database, no cookies, just a web page.
- Learning - beef up my React experience.

The one thing I might be stretching a bit is "simplicity". The [source code](https://github.com/cleaver/cleaver-gatsby) for this site shows it's not so simple. More on that in a future post.

## What Has Changed?

The site is a lot **faster**. Even in develop mode, page transitions are almost instant. This is because there isn't a CMS doing dozens of SQL queries for each page load and because Gatsby prefetches links, pages are displayed as quickly as a SPA.

I'm getting rid of **cookies**. The fairly innocuous session cookie from the CMS is not needed--there are no logins. Google Analytics is gone. If I was trying to monetize page views, I would have a reason to use it. I had it installed on Drupal out of curiosity, but it has a privacy cost.

The **Twitter widget** and **social sharing links** are gone. I don't really care about that stuff and there is a privacy cost. If you want to share a link, I have faith that you'll be able to copy and paste.

There are new **previous and next page links** at the bottom of each article. This came for free with the [Gatsby Starter Blog template](https://github.com/gatsbyjs/gatsby-starter-blog). A simple thing, but it was more complicated that it should have been in Drupal.

You won't notice unless you look under the hood, but I used [Tailwind CSS](https://tailwindcss.com/) for the first time. I was a bit sceptical of this approach, but it makes more sense once you pair it with [PostCSS](https://postcss.org/).

## What Next?

I'd like to write a bit about the major differences between using a JavaScript static site generator and a traditional CMS like Drupal. There are some important things to consider if you're making the switch.