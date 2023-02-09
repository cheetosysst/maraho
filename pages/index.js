import Head from "next/head";
import config from "../config";
import Layout from "../components/main.layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import MetaTags from "../components/meta.component";
import { sitemap, rss } from "../components/xml";
import SocialLinks from "../components/social.component";
import Container from "../components/container.component";

export default function Home({}) {
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
					<Container>
						<div className="flex justify-center md:mt-[20%] mt-[30%]">
							<div className="avatar drop-shadow-xl overflow-hidden rounded-full select-none">
								<Image
									src={config.author.avatar}
									alt="avatar"
									width={128}
									height={128}
								/>
							</div>
						</div>
						<div className="flex justify-center mt-10">
							<div className="flex flex-col select-none">
								<h1 className="text-5xl mx-auto">
									{config.name}
								</h1>
								<p className="text-xl mx-auto mt-5">
									{config.description}
								</p>
							</div>
						</div>
						<div className="mt-10">
							<SocialLinks
								links={{
									linkedin: config.links.linkedin,
									facebook: config.links.facebook,
									twitter: config.links.twitter,
									youtube: config.links.twitter,
									mastodon: config.links.mastodon,
									github: config.links.github,
								}}
								linkedin={config.links.linkedin}
								facebook={config.links.facebook}
								twitter={config.links.twitter}
								youtube={config.links.twitter}
								mastodon={config.links.mastodon}
								github={config.links.github}
							/>
						</div>
					</Container>
				</Layout>
			</main>
		</>
	);
}

export async function getStaticProps() {
	sitemap();
	rss();

	return {
		props: {},
	};
}
