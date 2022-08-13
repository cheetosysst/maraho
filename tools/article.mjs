import inquirer from "inquirer";
import fs from "fs";

function ArticleCreate() {
	const categories = fs
		.readdirSync("content")
		.filter((dirname) => dirname.slice(-3) !== ".md");
	console.log(categories);
	inquirer
		.prompt([
			{
				type: "list",
				name: "category",
				message: "Choose category",
				choices: categories,
			},
			{
				type: "input",
				name: "article",
				message: "New article name (url):",
			},
			{
				type: "input",
				name: "article_full",
				message: "New article name (full):",
			},
			{
				type: "input",
				name: "description",
				message: "Article description:",
			},
			{
				type: "input",
				name: "author",
				message: "Article authors name:",
			},
			{
				type: "input",
				name: "tags",
				message: "Article tags (seperate by spaces):",
			},
		])
		.then((answers) => {
			fs.mkdir(
				`content/${answers.category}/${answers.article}`,
				(err) => {
					if (err) return err;
				}
			);
			fs.writeFileSync(
				`content/${answers.category}/${answers.article}/article.json`,
				`
{
	"title": "${answers.article_full}",
	"description": "${answers.description}",
	"timestamp": "${new Date().toISOString()}",
	"author": "${answers.author}",
	"tags":[${answers.tags
		.split(" ")
		.map((item) => `"${item}"`)
		.toString()}]
}
			`,
				{ flag: "wx" },
				(err) => {
					if (err) return err;
				}
			);
			fs.writeFileSync(
				`content/${answers.category}/${answers.article}/index.md`,
				`# ${answers.article_full}`,
				{ flag: "wx" },
				(err) => {
					if (err) return err;
				}
			);
			console.log(
				`New article now avalible in content/${answers.category}/${answers.article}/index.md`
			);
		})
		.catch((error) => {
			if (error.isTtyError) {
				console.log("Not in tty enviroment.");
			} else {
				console.log(error);
				console.log("An unexpected error occurred.");
			}
		});
}

export default ArticleCreate;
