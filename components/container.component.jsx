export default function Container({ children, className, ...props }) {
	return (
		<div className={`container mx-auto w-auto ${className}`} {...props}>
			{children}
		</div>
	);
}
