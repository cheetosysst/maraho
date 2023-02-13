export default function customLoader({ src, width, quality }) {
	return `${src}?w=${width}&q=${quality || 75}`;
}
