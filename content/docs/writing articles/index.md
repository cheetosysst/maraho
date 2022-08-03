# Writing articles

Maraho uses directories to seperate articles, and each directories' name correcsponds to it's url.

In side each article directory, is a `index.md` which contains the article itself, and a `article.json` for informations (timestamps, author, etc...)

Tools that automates generating these files is still WIP. Please just copy paste existing templates and modify them.

## Supported Syntaxes

We use [react-markdown](https://www.npmjs.com/package/react-markdown) and [remark-gfm](https://github.com/remarkjs/remark-gfm) for rendering articles. Most common markdown syntaxes is supported.

### Demo

Checkout [Demo](/demos/Markdown&#32;demo) to see rendering results. If the results didn't met your expetation, please submit an issue.

### Links

We suggest using underscore in your article directory instead of spaces. Although spaces works just fine in most situations, if you want to link one article to another, for example:

```markdown
[Demo](/demos/Markdown demo)
```

The link will not render properly, because of the space charactor. Instead, use the following format:

```markdown
[Demo](/demos/Markdown&#32;demo)
```

## Meta data

Each articles needs a `article.json` in the same directory. It contains some important data, for example timestamp, author, descriptions, etc ...

- `title`: This title will be the one displayed in category index pages and metadata.
- `description`: This description is used in the metadata. If the string is empty, maraho will automatically change the metadata to the default one in `config.js`.
- `timestamp`: Timestamp decides the order of articles. If you want to pin an article, you can change the data to something like 2100, but you need to make sure you edit it again in year 2101, assumming you somehow survived for that long.
- `tag`: A list of tags displayed on the category index pages.
