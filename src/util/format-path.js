/**
 * Format a tag string which may contain caps and spaces to lower case and dashes.
 *
 * @param {string} path The path to be formatted. EG: "New Goodness"
 * @returns {string} The formatted path. EG: "new-goodness"
 */
const formatPath = (path) => path.toLowerCase().replace(/\s+/gi, '-');

export default formatPath;
