/**
 * Format a timestamp to a human-readable date in local time.
 * @param isoTimestamp - The timestamp to format.
 * @returns {string} - The formatted date. Eg. 'Jan 1, 2025'.
 */
const formatTimestamp = (isoTimestamp: string): string => {
   const date = new Date(isoTimestamp);
   const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
   };
   const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
   return formattedDate;
};

export { formatTimestamp };