import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

const getUser = async (username) => {
	if (!username.length) return {};

	const userData = await octokit.request("GET /users/" + username);

	const commitData = await octokit.search.commits({
		q: "author:" + username,
	});

	return {
		avatar: userData.data.avatar_url,
		bio: userData.data.bio,
		blog: userData.data.blog,
		followers: userData.data.followers,
		username: userData.data.name,
		repositories: userData.data.public_repos,
		url: userData.data.html_url,
		commits: commitData.data.total_count,
	};
};

const getRepo = async (owner, repo) => {
	const repoData = await octokit.repos.get({owner, repo});
	return repoData;
};

export { getUser, getRepo };
