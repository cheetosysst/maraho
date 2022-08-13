import inquirer from "inquirer";
import fs from "fs";

function CategoryCreate() {
	inquirer
		.prompt([
			{
				type: "input",
				name: "category",
				message: "New category name:",
			},
		])
		.then((answers) => {
			if (answers.category === undefined) {
				console.log("Error, undefined string");
				exit(128);
			}
			if (answers.category === "") {
				console.log("Empty category name");
				exit(128);
			}

			const categories = fs
				.readdirSync("content")
				.filter((dirname) => dirname.slice(-3) !== ".md")
				.concat(
					fs
						.readdirSync("pages")
						.filter((dirname) => dirname[0] !== "_")
						.filter((dirname) => dirname[0] !== "[")
						.filter((dirname) => dirname !== "index.js")
				);
			if (categories.includes(answers.category)) {
				console.log("Category already exists");
				exit(128);
			}

			inquirer
				.prompt([
					{
						type: "input",
						name: "name",
						message: "Enter category title",
					},
					{
						type: "input",
						name: "description",
						message: "Enter category description",
					},
				])
				.then((data) => {
					fs.mkdir(`content/${answers.category}`, (err) => {
						if (err) return err;
					});
					fs.writeFileSync(
						`content/${answers.category}/category.json`,
						`{
	"name": "${data.name}",
	"description": "${data.description}"
}`,
						{ flag: "wx" },
						(err) => {
							if (err) return err;
						}
					);
					console.log(
						`New category now avalible in content/${answers.category}`
					);
				});
		})
		.catch((error) => {
			if (error.isTtyError) {
				console.log("Not in tty enviroment.");
			} else {
				console.log("An unexpected error occurred.");
			}
		});
}

export default CategoryCreate;
