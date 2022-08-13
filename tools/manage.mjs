import fs from "fs";
import inquirer from "inquirer";
import { exit } from "process";
import ArticleCreate from "./article.mjs";
import CategoryCreate from "./category.mjs";

inquirer
	.prompt([
		{
			type: "list",
			name: "task",
			message: "Maraho Menu",
			choices: [
				"New article",
				"New category",
				new inquirer.Separator(),
				"Quit",
			],
		},
	])
	.then((answers) => {
		switch (answers.task) {
			case "New article":
				ArticleCreate();
				break;
			case "New category":
				CategoryCreate();
				break;
			case "Quit":
				console.log("Have a nice day!");
				exit(0);
				break;
			default:
				break;
		}
	})
	.catch((error) => {
		if (error.isTtyError) {
			console.log("Not in tty enviroment.");
		} else {
			console.log("An unexpected error occurred.");
		}
	});
