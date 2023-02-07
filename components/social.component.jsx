import Link from "next/link";

import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaMastodon } from "@react-icons/all-files/fa/FaMastodon";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLink } from "@react-icons/all-files/fa/FaLink";

const icons = {
	linkedin: FaLinkedin,
	youtube: FaYoutube,
	facebook: FaFacebook,
	twitter: FaTwitter,
	mastodon: FaMastodon,
	github: FaGithub,
};

function Sublink({ linkType, link }) {
	if (!(typeof link === "string" || link instanceof String)) return undefined;
	return (
		<Link href={link}>
			<div className="btn btn-ghost text-3xl">{getIcon(linkType)}</div>
		</Link>
	);
}

function getIcon(linkType) {
	if (icons[linkType] === undefined) return <FaLink />;
	return icons[linkType]();
}

export default function SocialLinks({ links }) {
	const socialLinkArray = [];

	for (let item of Object.keys(links)) {
		socialLinkArray.push(
			<Sublink
				linkType={item}
				link={links[item]}
				key={`socialLink-${item}`}
			/>
		);
	}

	return (
		<div className="grid grid-rows-2 md:grid-rows-1 grid-flow-col justify-center gap-3">
			{socialLinkArray}
		</div>
	);
}
