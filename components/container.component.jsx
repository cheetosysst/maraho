export default function Container({ children, className, ...props }) {
	return (
		<div
			className={`container mx-auto w-auto md:w-[70%] ${className}`}
			{...props}
		>
			{children}
		</div>
	);
}
