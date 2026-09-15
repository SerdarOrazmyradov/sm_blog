import Parser from 'rss-parser';
import TurndownService from 'turndown';
import slugify from 'slugify';
import fs from 'fs';
import path from 'path';

const parser = new Parser();
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

const RSS_URL = 'https://dbushell.com/merge/rss.xml';
const OUTPUT_DIR = './content/posts'; // Hugo postlar bukjaňyz

async function fetchAndGeneratePosts() {
  try {
    console.log('RSS feed çekiilýär...');
    const feed = await parser.parseURL(RSS_URL);

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Diňe iň sonky makalany almak üçin (ýa-da feed.items.forEach ulanyp ählisini alyp bilersiňiz)
    const latestItem = feed.items[0]; 

    const title = latestItem.title || 'Untitled Post';
    const date = new Date(latestItem.pubDate || Date.now()).toISOString();
    const slug = slugify(title, { lower: true, strict: true });
    const fileName = `${slug}.md`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    // HTML-y Markdown-a öwürmek
    const markdownContent = turndownService.turndown(latestItem['content:encoded'] || latestItem.content || '');

    // Hugo Front Matter döretmek
    const hugoPost = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${date}
draft: false
description: "Cross-post from dbushell.com"
tags: ["Frontend", "Tech", "RSS"]
categories: ["Imports"]
cover: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop"
canonicalURL: "${latestItem.link}"
---

> **Bellik:** Bu maqala [David Bushell-iň sahypasyndan](${latestItem.link}) awtomatiki çekildi.

${markdownContent}
`;

    fs.writeFileSync(filePath, hugoPost, 'utf-8');
    console.log(`✅ Täze post döredildi: ${filePath}`);

  } catch (error) {
    console.error('❌ Mesele ýüze çykdy:', error);
  }
}

fetchAndGeneratePosts();