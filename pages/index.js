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
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { AiOutlineFork } from "@react-icons/all-files/ai/AiOutlineFork";
import { MdLanguage } from "@react-icons/all-files/md/MdLanguage";
import Markdown from "../components/markdown.component";
import MetaTags from "../components/meta.component";

export default function Home({ category, markdown }) {
	const [avatar, setAvatar] = useState("/defaultuser.png");
	const [username, setUsername] = useState("Unknown");
	const [github, setGithub] = useState("/");
	const [twitter, setTwitter] = useState("/");
	const [repos, setRepos] = useState(0);
	const [followers, setFollowers] = useState(0);
	const [commits, setCommits] = useState(0);
	const [pinnedRepos, setPinnedRepos] = useState();

	useEffect(() => {
		const getRepoPromise = new Promise(async (res, rej) => {
			let tempPinnedRepos = [];
			for (let i = 0; i < config.repo.repos.length; i++) {
				const repoName = config.repo.repos[i].name.split("/");
				const tempRepoData = await getRepo(repoName[0], repoName[1]);
				tempPinnedRepos.push(
					<Link
						href={
							"https://github.com/" + tempRepoData.data.full_name
						}
						key={"pinned_repo_" + i}
					>
						<div className="card py-3 px-6 group bg-base-100 shadow-lg hover:shadow-xl transition-all cursor-pointer">
							<div className="card-title text-neutral-content text-[1em]">
								<AiOutlineDatabase />
								<div className="group-hover:text-primary transition-all duration-200">
									{tempRepoData.data.full_name}
								</div>
							</div>
							<div className="card-body p-0 mt-1 text-sm text-base-content/70 group-hover:text-base-content/100 transition-all duration-200">
								{tempRepoData.data.description}
							</div>
							<div className="card-actions mt-1 text-sm text-base-content/70 justify-left gap-10">
								<div>
									<MdLanguage className="fill-current inline-block first:inline-block first:align-middle" />
									<span className="px-1">
										{tempRepoData.data.language === null
											? "None"
											: tempRepoData.data.language}
									</span>
								</div>
								<div>
									<AiOutlineStar className="fill-current inline-block first:inline-block first:align-middle" />
									<span className="px-1">
										{tempRepoData.data.stargazers_count}
									</span>
								</div>
								<div>
									<AiOutlineFork className="fill-current inline-block first:inline-block first:align-middle" />
									<span className="px-1">
										{tempRepoData.data.forks_count}
									</span>
								</div>
							</div>
						</div>
					</Link>
				);
			}
			res(tempPinnedRepos);
		});

		Promise.all([getUser(config.author.username), getRepoPromise]).then(
			(data) => {
				setAvatar(data[0].avatar);
				setUsername(data[0].username);
				setGithub(data[0].url);
				if (config.author.twitter)
					setTwitter("https://twitter.com/" + config.author.twitter);
				setRepos(data[0].repositories);
				setFollowers(data[0].followers);
				setCommits(data[0].commits);
				setPinnedRepos(data[1]);
			}
		);
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
										src={avatar}
										// loader={githubAvatarLoader}
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
									<Link href={github} passHref>
										<a className="text-3xl cursor-pointer rounded-lg hover:bg-base-content/25 p-1 transition-all">
											<AiOutlineGithub />
										</a>
									</Link>
									<Link href={twitter} passHref>
										<a className="text-3xl cursor-pointer rounded-lg hover:bg-base-content/25 p-1 transition-all">
											<AiOutlineTwitter />
										</a>
									</Link>
									<Link href={github} passHref>
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
												{numberProcessing(followers)}
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
												{numberProcessing(repos)}
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
												{numberProcessing(commits)}
											</div>
										</div>
									</Link>
								</div>
								<p className="text-3xl capitalize mb-3 mt-4">
									Top Repos
								</p>
								<div className="grid xl:grid-cols-2 gap-2 grid-cols-1">
									{pinnedRepos}
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

export function getStaticProps() {
	const category = fs.readdirSync(path.join(process.cwd(), "content"));
	const markdown = fs.readFileSync(
		path.join(process.cwd(), "content", "index.md")
	);

	return {
		props: {
			category,
			markdown: markdown.toString(),
		},
	};
}

function numberProcessing(num) {
	if (num >= 1000000) return (num / 1000000).toFixed(1).toString() + " M";
	if (num >= 1000) return (num / 1000).toFixed(1).toString() + " K";
	return num;
}
