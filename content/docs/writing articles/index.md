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
