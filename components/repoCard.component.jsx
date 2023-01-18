import Link from "next/link";
import { MdLanguage } from "@react-icons/all-files/md/MdLanguage";
import { AiOutlineDatabase } from "@react-icons/all-files/ai/AiOutlineDatabase";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { AiOutlineFork } from "@react-icons/all-files/ai/AiOutlineFork";
import { formatNumber } from "../libs/misc";

export default function RepoCard({
	fullname,
	description,
	language,
	stars,
	forks,
}) {
	return (
		<Link href={"https://github.com/" + fullname}>
			<div className="card py-3 px-6 group bg-base-100 shadow-lg hover:shadow-xl transition-all cursor-pointer">
				<div className="card-title text-neutral-content text-[1em]">
					<AiOutlineDatabase />
					<div className="group-hover:text-primary transition-all duration-200">
						{fullname}
					</div>
				</div>
				<div className="card-body p-0 mt-1 text-sm text-base-content/70 group-hover:text-base-content/100 transition-all duration-200">
					{description}
				</div>
				<div className="card-actions mt-1 text-sm text-base-content/70 justify-left gap-10">
					<div>
						<MdLanguage className="fill-current inline-block first:inline-block first:align-middle" />
						<span className="px-1">
							{language === null ? "None" : language}
						</span>
					</div>
					<div>
						<AiOutlineStar className="fill-current inline-block first:inline-block first:align-middle" />
						<span className="px-1">{formatNumber(stars)}</span>
					</div>
					<div>
						<AiOutlineFork className="fill-current inline-block first:inline-block first:align-middle" />
						<span className="px-1">{formatNumber(forks)}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
