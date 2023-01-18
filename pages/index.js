import Head from "next/head";
import config from "../config";
import Layout from "../components/main.layout";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { getRepo, getUser } from "../libs/github";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineUserAdd } from "@react-icons/all-files/ai/AiOutlineUserAdd";
import { AiOutlineDatabase } from "@react-icons/all-files/ai/AiOutlineDatabase";
import { VscGitCommit } from "@react-icons/all-files/vsc/VscGitCommit";
import { AiOutlineGithub } from "@react-icons/all-files/ai/AiOutlineGithub";
import { AiOutlineTwitter } from "@react-icons/all-files/ai/AiOutlineTwitter";
import { AiOutlineLinkedin } from "@react-icons/all-files/ai/AiOutlineLinkedin";
import Markdown from "../components/markdown.component";
import MetaTags from "../components/meta.component";
import { sitemap, rss } from "../components/xml";
import RepoCard from "../components/repoCard.component";

export default function Home({ category, markdown, repoData, userData }) {
	const [username, setUsername] = useState("");
	const [twitter, setTwitter] = useState("/");
	const [avatar, setAvatar] = useState("/defaultuser.png");
	const [github, setGithub] = useState("/");
	const [repos, setRepos] = useState(0);
	const [followers, setFollowers] = useState(0);
	const [commits, setCommits] = useState(0);
	const [pinnedRepos, setPinnedRepos] = useState();

	const [repo, setRepo] = useState(repoData);
	const [user, setUser] = useState(userData);

	const getRepoCard = new Promise(async (res, rej) => {
		let tempPinnedRepos = [];
		for (let i = 0; i < config.repo.repos.length; i++) {
			const repoName = config.repo.repos[i].name.split("/");
			const tempRepoData = await getRepo(repoName[0], repoName[1]);
			const card = (
				<RepoCard
					key={`repoCard-${repoName}`}
					fullname={tempRepoData.data.full_name}
					description={tempRepoData.data.description}
					language={tempRepoData.data.language}
					stars={tempRepoData.data.stargazers_count}
					forks={tempRepoData.data.forks}
				/>
			);
			tempPinnedRepos.push(card);
		}
		res(tempPinnedRepos);
	});

	useEffect(() => {
		Promise.all([getRepoCard]).then((data) => setRepo(data));
	}, []);

	useEffect(() => {
		Promise.all([getUser(config.author.username)]).then((data) => {
			setUser(data[0]);
		});
	}, []);

	const githubAvatarLoader = ({ src, width, quality }) => {
		return `${src}?v=4?imwidth=${width}`;
	};

	return (
		<>
			<Head>
				<title>{`Home - ${config.name}`}</title>
				<MetaTags
					title={`Home - ${config.meta.name}`}
					url={`${config.url}/`}
					description={`${config.meta.description}`}
					name={`${config.name}`}
					image={`${config.url}/${config.meta.image}`}
				/>
			</Head>

			<main>
				<Layout>
					<div className="container mx-auto py-10 lg:px-20 md:px-10 px-5">
						<div className="grid grid-cols-4 lg:grid-cols-3 gap-5">
							<div className="card bg-base-300 lg:p-10 p-6 lg:col-span-1 md:col-span-2 col-span-4  shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-100">
								<div className="block">
									<Image
										className="rounded-xl shadow-lg"
										src={user.avatar}
										layout="responsive"
										width={256}
										height={256}
										alt="author avatar image"
									/>
								</div>
								<p className="text-xl text-center py-5">
									{config.author.name} ({username})
								</p>
								<div className="flex justify-center gap-4">
									<Link href={user.url} passHref>
										<a className="text-3xl cursor-pointer rounded-lg hover:bg-base-content/25 p-1 transition-all">
											<AiOutlineGithub />
										</a>
									</Link>
									<Link href={twitter} passHref>
										<a className="text-3xl cursor-pointer rounded-lg hover:bg-base-content/25 p-1 transition-all">
											<AiOutlineTwitter />
										</a>
									</Link>
									<Link href={""} passHref>
										<a className="text-3xl cursor-pointer rounded-lg hover:bg-base-content/25 p-1 transition-all">
											<AiOutlineLinkedin />
										</a>
									</Link>
								</div>
							</div>
							<div className="card bg-base-300 lg:p-10 p-6 lg:col-span-2 md:col-span-2 col-span-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-100">
								<p className="text-3xl capitalize mb-3">
									{config.author.provider} stats
								</p>
								<div className="stats xl:stats-horizontal stats-vertical shadow-lg hover:shadow-xl transition-all select-none">
									<Link
										href={
											"https://github.com/" +
											config.author.username +
											"?tab=followers"
										}
									>
										<div className="group stat cursor-pointer">
											<div className="stat-figure text-primary text-4xl group-hover:text-info-content  transition-all duration-300">
												<AiOutlineUserAdd />
											</div>
											<div className="stat-title capitalize">
												followers
											</div>
											<div className="stat-value text-primary-focus group-hover:text-info-content transition-all duration-300">
												{numberProcessing(
													user.followers
												)}
											</div>
										</div>
									</Link>
									<Link
										href={
											"https://github.com/" +
											config.author.username +
											"?tab=repositories"
										}
									>
										<div className="stat group cursor-pointer">
											<div className="stat-figure text-primary text-4xl group-hover:text-info-content  transition-all duration-300">
												<AiOutlineDatabase />
											</div>
											<div className="stat-title capitalize">
												repositories
											</div>
											<div className="stat-value text-primary-focus group-hover:text-info-content  transition-all duration-300">
												{numberProcessing(
													user.repositories
												)}
											</div>
										</div>
									</Link>
									<Link
										href={
											"https://github.com/" +
											config.author.username +
											""
										}
									>
										<div className="stat group cursor-pointer">
											<div className="stat-figure text-primary text-4xl group-hover:text-info-content  transition-all duration-300">
												<VscGitCommit />
											</div>
											<div className="stat-title capitalize">
												commits
											</div>
											<div className="stat-value text-primary-focus group-hover:text-info-content  transition-all duration-300">
												{numberProcessing(user.commits)}
											</div>
										</div>
									</Link>
								</div>
								<p className="text-3xl capitalize mb-3 mt-4">
									Top Repos
								</p>
								<div className="grid xl:grid-cols-2 gap-2 grid-cols-1">
									{repo}
								</div>
							</div>
						</div>
						<div className="grid grid-cols-3 gap-5">
							<div className="card bg-base-300 lg:p-10 p-6 col-span-3 mt-5  shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-100">
								<Markdown markdown={markdown} />
							</div>
						</div>
					</div>
					<footer></footer>
				</Layout>
			</main>
		</>
	);
}

export async function getStaticProps() {
	const category = fs.readdirSync(path.join(process.cwd(), "content"));
	const markdown = fs.readFileSync(
		path.join(process.cwd(), "content", "index.md")
	);

	const repoData = [];

	for (let i = 0; i < config.repo.repos.length; i++) {
		const repoName = config.repo.repos[i].name.split("/");
		const repoResponse = await getRepo(repoName[0], repoName[1]);
		repoData.push[
			{
				fullname: repoResponse.data.full_name,
				description: repoResponse.data.description,
				language: repoResponse.data.language,
				stars: repoResponse.data.stargazers_count,
				forks: repoResponse.data.forks_count,
			}
		];
	}

	const userData = await getUser(config.author.username);

	sitemap();
	rss();

	return {
		props: {
			category,
			markdown: markdown.toString(),
			repoData,
			userData,
		},
	};
}

function numberProcessing(num) {
	if (num >= 1000000) return (num / 1000000).toFixed(1).toString() + " M";
	if (num >= 1000) return (num / 1000).toFixed(1).toString() + " K";
	return num;
}
