# Managing contents

Maraho have a built-in tool for simple content managing tasks.

## Manage Tool

To use the built-in manage tool, run the following command:

```shell
npm run manage
```

You can manage categories and articles from here.

## Creating Categories

To create a category, execute the manage tool, choose the "New categories" option, and enter all required informations.

```plaintext
> maraho@0.1.0 manage
> node tools/manage.mjs

? Maraho Menu New category
? New category name: test
? Enter category title test
? Enter category description test
New category now avalible in content/test
```

## Creating Articles

To create a category, execute the manage tool, choose the "New article" option, and enter all required informations.

```plaintext
> maraho@0.1.0 manage
> node tools/manage.mjs

? Maraho Menu New article
[ 'demos', 'docs' ]
? Choose category docs
? New article name (url): manage
? New article name (full): Managing contents
? Article description: Instruction on how to manage your contents in Maraho
? Article authors name: thect
? Article tags (seperate by spaces): docs manage
New article now avalible in content/docs/manage/index.md
```

## Delete

Deleting a category or article can be achieve by deleting corresponding directory.
