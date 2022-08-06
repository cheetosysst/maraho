# Markdown demo

This is a demo of markdown render result.

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

## Headings 2

### Headings 3

#### Headings 4

##### Headings 5

## Image

![alt](/Maraho.png)

## Lists

### List with "-"

- Never
  - Never gonna
  - Give you
  - Up
- What is love?
  - Baby don't hurt me
  - no more

### List with "*"

- Never
  - Never gonna
  - Give you
  - Up
- What is love?
  - Baby don't hurt me
  - no more

### List with "+"

- Never
  - Never gonna
  - Give you
  - Up
- What is love?
  - Baby don't hurt me
  - no more

### Ordered list

1. Never gonna
2. Give you
3. Up

With indent (Broken, I think)

1. What is love?
1. Baby don't hurt me
2. no more

### Link

Links are converted to [next/link](https://nextjs.org/docs/api-reference/next/link)

[This](/) link connects to the index page.

Sections is not implemented, yet.

### Code

You can use `InlineCode()`.

Or a code block with highlighted text.

<!-- markdownlint-disable MD010 -->
```js
export async function getStaticPaths() {
	const pathCategory = path.join(process.cwd(), "content");
	const categories = fs.readdirSync(pathCategory);

	let paths = [];
	categories.map((category) => {
		const articles = fs.readdirSync(path.join(pathCategory, category));

		articles.map((article) => {
			paths.push({
				params: {
					article,
					category,
				},
			});
		});
	});

	return {
		paths,
		fallback: false,
	};
}
```
<!-- markdownlint-enable MD010 -->
<!-- I suggest disabling markdownlint md010 because I hate this rule. -->

It automatically detects the languadge, but you really should specify it yourself.

### Horizontal Line

---

---

### Table

| | Lawful | Neutral | Chaotic |
|-|-|-|-|
| Good | Lawful Good | Neutral Good | Chaotic Good |
| Neutral | Lawful Neutral | True Neutral | Chaotic Neutral |
| Evil | Lawful Evil | Neutral Evil | Chaotic Evil |

### Checkbox

- [ ] Buy eggs
- [x] Buy milk
- [x] Buy toothbrush

These are not aligned properly

### Blockquotes

> This is a blockquote.
> > This is a blockquote inside a blockquote.
>
> #### you can even use header here
>
