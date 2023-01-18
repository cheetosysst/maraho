export function formatNumber(num) {
	if (num >= 1000000) return (num / 1000000).toFixed(1).toString() + " M";
	if (num >= 1000) return (num / 1000).toFixed(1).toString() + " K";
	return num;
}
