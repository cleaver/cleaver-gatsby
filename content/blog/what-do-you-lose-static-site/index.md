---
title: "What Do You Lose With a Static Site?"
description: Switching from a CMS to a static site.
date: 2021-03-07
tags:
  - GatsbyJS
  - Static site
  - Drupal
  - CMS
  - Introductory
author: Cleaver Barnes
hero_image: "./subway.jpg"
hero_caption: Man descends stairs in Tokyo subway.
sidebar:
  title: Links
  body: |
    - [Gatsby](https://gatsbyjs.org) static site generator.
    - [Source code](https://github.com/cleaver/cleaver-gatsby) for this site.
    - [NextJS](https://nextjs.org/) another great tool.
  omit_default: false
---
*Image credit: [Giuseppe Milo](https://flic.kr/p/22wz5ho)*

You may have thought about switching to a static site, but what do you give up? If you're moving from a fully-featured Content Management System, you lose a lot. Like many choices, it's a tradeoff. A CMS offers many features and capabilities, while a static site excels at speed and simplicity.

<!-- more -->

I recently moved this site from Drupal CMS to Gatsby and I learned a few things on the way. This site wasn't using the full capabilities of Drupal, but I've worked on a number of large-scale projects that do need the full power of a CMS. It got me thinking about exactly what you give up when you move away from a CMS.

**Note:** Before we start, there are two models for managing static site content: *file-based content*, and *headless CMS*. See [my previous articles](/blog/two-models-static-sites) if you want more details.

## Static Site Feature Comparison

Below is a list of features that a conventional CMS supports and whether they are supported by file-based or headless CMS static sites.

|Feature                         |File-based|Headless|
|--------------------------------|----|----|
|User logins                     | No | No |
|Define content types and fields | No | Yes|
|Enforced structure              | No | Yes|
|Content editing interface       | No | Yes|
|Content access control          | No | No |
|Publishing workflow             | No | Yes|
|Handle frequent updates         | No | Yes|
|User interaction                | No | No |
|Dynamic content                 | No | No |

First off, this makes file-based static sites look bad. This is not the case—there are strong reasons why this might be your best choice. (See: [Moving this Site to Gatsby.](/blog/moving-site-to-gatsbyjs)) Let's look a little closer at each of these:

### User Logins

For both types of static site, there are no user logins. Sites where a user logs in with their account to view personalized pages are not easily possible. Forums, memberships, comments, and personal messages are examples of these sites. There is often a way to work around these limitations, but if your site relies heavily on these features, a static site may not be the best for you.

### Define Content Types and Fields

A CMS allows you to define different content types with fields. Examples would be an `Article` type with `title`, `date`, `author`, and `body` fields, or an `Event` type with `name`, `description`, `date`, and `location` fields. Each field can be given a datatype, such as `text`, `date`, or `number`. This applies to a headless CMS as well.

The *frontmatter* (YAML at the beginning of a Markdown file) in a file-based static site does let you define fields without datatypes, but naming is not enforced which leads us to your next item.


### Enforced Structure

A CMS can provide validation, so that `Article` content has only the fields we defined. Additionally, you can specify that only a valid date is entered in the `date` field and `title` is mandatory. Again, this is for both a headless and a regular CMS.

A file-based CMS doesn't offer any of this validation. If you spell the field name wrong or enter erroneous data, the site will have errors.


### Content editing interface

File-based content management offers no editing interface. You simply edit files in a text editor. A headless CMS, however, will provide a content editing interface where you can search, list, or modify the content that is used to build the site.


### Dynamic Content

It's obvious that a file-based static site can't offer any access control, but this is also true for headless CMS backed static sites. This is because the HTML is generated in a batch before the pages are served. With a conventional CMS, the HTML is usually generated for each page request.


### Content Access Control

A CMS-backed site can evaluate access to content on each page request. An example would be that managers would be able to view content related to their direct reports, otherwise non-management employees would only be able to view their own.

In some cases a CMS can restrict access to individual fields. A good example would be that any visitor to a website could view the retail price of products, but only partners could view the wholesale price.


### Publishing Workflow

Some traditional CMS-powered websites feature very elaborate publishing workflow. This can include multiple rounds of proof-reading, approval, editing, scheduled release, and the ability to revert to an older version of a document. You don't need this for a personal blog, but it could be vital for content that has legal or regulatory restrictions. Just imagine safety documentation for heavy machinery... publishing the wrong information could be fatal!

You could implement the same workflows in a headless CMS without a problem, but it would be a cumbersome manual process with a file-based system.

### Handle Frequent Updates

There's no restriction on handling frequent updates from multiple authors with a headless CMS. The content-editing experience would not be terribly different. You don't sacrifice any features here.

However multiple users editing Markdown files would be inconvenient and potentially error-prone. I'm sure anyone who's collaborated on editing a Word document has encountered this. Exactly what version did you last edit? Best to avoid a file-based static site if you need to work with other writers on a regular basis.

### User Interaction

The type of interaction that is easy for a traditional CMS becomes difficult or even impossible when you switch to a static site. Need a comments section? That's going to require a JavaScript plugin. Your users can't use JavaScript, or the plugin is not accessible? Too bad! What about search? You could do it, but it's not a straightforward solution like in Wordpress or Drupal. You'll definitely give up some features with a static site.

The good news is that a lot of sites don't really need these interactive features. I gave up on comments [a long time ago](/blog/comment-spam-drupal/).

### A Static Site Seems *Almost* Right for Me

Maybe you like the idea of a static site, but need a bit more interactivity than I do. What then? You could stick with a traditional CMS, of course. However, there are other solutions that could be a great fit for you. One that's worth looking at is [NextJS](https://nextjs.org/). It lets you combine static content seamlessly with dynamic content that generated on-the-fly. There are a lot of great features that I plan to write about in the future.

### Conclusion

It might seem like you give up a lot when you switch to a static site, but as I wrote above, it's really not that negative. There are so many sites (like this one) where a static site is a great solution. Hopefully this comparison will help you decide if a static site is right for you.



