/**
 * Helper function to build paths for routes. This function will concatenate the path and segment
 * with a forward slash (/) between them and capable of handling any length of segments.
 */
export const concatSegmentHelper = (path: string, segment: string | string[]): string => {
	return `${path}/${Array.isArray(segment) ? segment.join('/') : segment}`;
};
