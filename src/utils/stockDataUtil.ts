export function splitData(
	value: string
): { gap: string; percent: string } | null {
	const match = value.match(/([-+]?\d+\.\d+)(\d+\.\d+)([-+]?\d+\.\d+%)/);

	if (match) {
		const [, gap, _, percent] = match;
		return {
			gap,
			percent,
		};
	}
	return null;
}
