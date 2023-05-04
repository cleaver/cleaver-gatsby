---
title: "Two Models for Static Sites"
description: There's static, and there's sorta static.
date: 2021-02-25
tags:
  - GatsbyJS
  - Static site
  - Drupal
  - CMS
  - Introductory
author: Cleaver Barnes
hero_image: "./double.jpg"
hero_caption: Two Lisbon funicular cars on sloped street.
sidebar:
  title: Links
  body: "[Gatsby](https://gatsbyjs.org) static site generator.<br /> [Source code](https://github.com/cleaver/cleaver-gatsby) for this site.<br /> [How to GraphQL](https://www.howtographql.com/) on querying content.<br /> [Tailwind CSS](https://tailwindcss.com/)."
  omit_default: false
---
*Image credit: [rippchenmitkraut66](https://flic.kr/p/28BpNZN)*

Note: I started writing an article about [what you lose if you switch to a static site](/blog/what-do-you-lose-static-site), but realized that there were a few things I should explain first.

*Update: This is already a bit outdated. Since I've started working with NextJS, I realized there are more ways to look at static sites. With NextJS (or Nuxt or SvelteKit...) you can add in Server-Side Rendering (SSR) and other techniques to inject up-to-date content into your static site. I'll keep this article for now, as it focuses on the content sources, but I'll focus on topics beyond simple static sites in the future.*

## The Two Models

All static site generators take content stored _somehow_ and from that create a website that doesn't change until the next time the website is built. The difference is in how the content is stored. This leaves us with two main models.

The two main models for static sites are:

1. Static site with content stored in files.

2. Static site with headless CMS.

### 1) Content in Files

The simplest case is to have the content stored in files. That's what I use for this site. [Have a look at the Github Repo](https://github.com/cleaver/cleaver-gatsby/tree/main/content) to see. It does allow extra fields to track things like _author_ and _tags_, but it is just straightforward files that will be transformed into HTML.

This model is great for a simple blog site, but not really adequate for an enterprise site with multiple users and editorial workflow. The workflow for this site is as simple as the model:

1. Edit a file, or add new files. Typically done with a plain-text editor, in HTML or Markdown format.

2. Rebuild the website, creating a new collection of HTML, JavaScript, and CSS files.

3. Publish: Copy the new website files to the webserver.

This works great for me, but it wouldn't be great if there are many editors and multiple content updates per day.

### 2) Headless CMS

A Web Content Management System like Drupal *manages* content, plus it *presents* the content to users. For each page view, the CMS looks up all the content that makes up the page and then presents it in the HTML sent to the user. Even if the page is the same every time it's requested, the complex lookup of content is done again and again.

A headless CMS does *management* of content, but the *presentation* of content is handled by the static site generator. The workflow is similar, but a little bit different:

1. Edit or add new content in the headless CMS.

2. The build is triggered—this can be automatic, or manual.

3. Rebuild the website. This uses an API like GraphQL to pull the content from the headless CMS.

4. Publish.

The real differences are with step 1 and I've broken out step 2 for clarity. Step 1 is going to be the same as if you have a full CMS like Drupal, or Wordpress. You could have a nice rich-text editor, so you see the formatting before you publish. You could save an article as *draft* before you're ready to publish and you can use many of the other features a CMS offers.

There are many headless CMSs you could choose to manage static site content.

- **Drupal** or **Wordpress** – you can use a traditional web CMS to manage the content for a static site.

- Dedicated headless CMSs – There are many choices including [Strapi](https://github.com/strapi/strapi), [Prismic](https://prismic.io/), and [Contentful](https://www.contentful.com/).

## Which Do You Need?

If your needs are simple and you're comfortable working with files and Markdown, then go with a file-based static site. I always advocate the simpler solution if it fits your needs.

When should you consider the more complex headless CMS?

- You want a better interface. Not everyone is happy with editing Markdown and you just want something nicer.
- Your process is prone to mistakes. Whether your content is complex with many relationships or editors are not familiar with YAML and Markdown, a headless CMS will provide more structure and make it more difficult to colour outside the lines.
- You have multiple editors. As you add editors to a team, the number of possible conflicts increases much faster. (On the order of [*n(n-1)/2*](https://en.wikipedia.org/wiki/Complete_graph), in case you're interested.) A headless CMS has the capability to manage conflicts.
- You have a complex publishing workflow. Editing files will be a very inefficient and error-prone way to do any type of publishing workflow. Even just keeping drafts would require rules for renaming or moving files.
- You make frequent content updates. I'm never going to overwhelm a simple file-based approach, but if you're doing even a few updates a day, you're bound to run into problems.
- You want to try some new cool headless CMS. Go for it! I encourage you to learn new things.

Now that I've defined the two models for managing static site content, let's look at [what you lose when you move to a static site](/blog/what-do-you-lose-static-site) in the next article.