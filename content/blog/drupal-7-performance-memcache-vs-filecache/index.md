---
title: "Drupal 7 Performance: Memcache vs. Filecache"
description: Dealing with all the junk.
date: 2013-11-03
tags:
  - Drupal 7
  - performance
  - filecache
  - memcache
author: Cleaver Barnes
hero_image: "./pig-racing.jpg"
hero_caption: Pigs racing
sidebar:
  title: Links
  body: Video of [pig racing](https://youtu.be/xauekLnz0P8).
  omit_default: false
---
If you've worked on a few Drupal sites, no doubt you've run into one of those horrendously slow sites. To call it a pig, would be unfair. Pigs can actually be quite fast. (http://en.wikipedia.org/wiki/Pig_racing)

<!-- more -->

*Image Credit: [Calibas](http://commons.wikimedia.org/wiki/User:Calibas)*

There are a few common speed enhancements. To start with, you can make sure that Drupal's native database caching is turned on and Javascript and CSS aggregation are enabled (IE. your basic settings under admin/config/development/performance.) If you have time and resources there's Nginx, Varnish, APC and Memcache—these are general-purpose web technology and all require a degree of configuration. They may not be possible in all hosting situations.

One other option that is specific to Drupal is Filecache (http://drupal.org/project/filecache). While Drupal core stores cache information to the database, filecache will store it directly in the filesystem. The idea here is that the database is already pretty busy and has some overhead that's not really necessary for storing cache. Filecache avoids that complexity and as a result can make your site faster.

## Memcache vs. Filecache
I thought I would compare Filecache to its big brother to see how they stack up. To do so, I set up a server at [Digital Ocean](https://www.digitalocean.com/?refcode=0601bc016218)—a 2GB virtual server with 2 cores and 40GB SSDs.

### The Setup
I wanted a fairly standard setup of LAMP + Memcache running on Ubuntu 12.04 32-bit. This gave me a chance to work a bit more with [Chef Solo](http://docs.opscode.com/chef_solo.html) to provision the server.

The Drupal site itself was basically just core Drupal, plus Views and the Memcache and Filecache modules. I also included APC for good measure. I used Devel Generate (part of the Devel module http://drupal.org/projects/devel) to generate 500 random nodes. Using Views, I created a view that was a clone of the default "frontpage" view, with 100 nodes per page. The result was a fairly long page or about 190KB. All caching options for Drupal and for the view were enabled.

### Benchmarking
I used [ApacheBench](http://httpd.apache.org/docs/2.2/programs/ab.html) to run many simultaneous requests to the server. It is fairly basic in what it can do, but it does give fairly comprehensive statistics.

The ApacheBench command looks like this:

```bash
ab -n 500 -c 30 http://example.com/mypage
```

The -n option is the number of total requests. The -c option is concurrency—in other words, the maximum number of requests that could be sent at the same time. I did my tests with 500 total requests and concurrency of 1, 30 and 50. The median response time was recorded for each test. I ran each test several times to confirm the results.

### Surprising Results
The most surprising thing I found was that Memcache actually slowed things down. First, I had to check that it actually was working, so I enabled memcache_admin (part of the Drupal Memcache module) to confirm that I actually was getting cache hits. I was. Next, I increased the memory used by memcache from 64MB to 256MB. No difference. Finally, I noticed that memcache logging was enabled, so I commented out that and the "verbose" flag. This did make a bit of an improvement, but not a great one. For my simple test site, Memcache was not helping.

### Results: Core Drupal Cache
Median response times for the core Drupal database caching:

Concurrency 1: 5ms <br />
Concurrency 30: 89ms <br />
Concurrency 50: 156ms <br />

Not bad... That little VPS performs well. The main advantage of the core caching is that it is easy to set up... just a few checkboxes.

### Results: Memcache
The best I was able to wring out of memcache was still not better than core Drupal.

Concurrency 1: 5ms
Concurrency 30: 101ms
Concurrency 50: 166ms

Memcache is the most difficult to set up. You have to install the memcache daemon itself, you need a PHP mod installed and you have to add a few lines to your site's settings.php file. I have to assume I'd get a benefit in a more complex site, with a load that was more like real-world users.

### Results: Filecache
The median request times for Filecache were the best of the lot.

Concurrency 1: 5ms
Concurrency 30: 81ms
Concurrency 50: 134ms

Filecache is the winner here. In this test it did marginally better than core, but I've seen about 35% knocked off the response times of a complex Drupal site. Filecache is also very easy to install... just install the module and add two lines to the `settings.php` file.

### Conclusions
Easiest to install is core Drupal, with Filecache coming a close second. Memcache is not daunting, but it will definitely take some time to install and tune.

Fastest is Filecache, while Memcache was surprisingly slower than the standard core Drupal caching.

I'll be going with Filecache in most situations where the web performance stack is not predetermined and I don't have a lot of time to fuss with the ideal caching strategy.

### Things to Consider
I wouldn't consider my test to be entirely scientific. Off the top of my head, I can think of several things I'd want to control better:

- I did my testing a VPS, so I don't have control over the activity from other servers sharing the hardware.
- Digital Ocean uses SSD which might give an advantage to filecache that it wouldn't have on a conventional hard drive. SSDs are still much slower than RAM, however.
- ApacheBench only requests the page... the other resources such as images, Javascript and CSS are not retrieved. As a whole, it doesn't give a very accurate simulation of real-world users.

### Credits
Here's some articles that were helpful in getting things working with Chef and Memcache:

- http://adamcod.es/2013/06/04/deploy-a-basic-lamp-stack-digital-ocean-chef-solo.html
- http://andrewdunkle.com/how-install-memcached-drupal-7
