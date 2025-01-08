/**
 * Format a timestamp to a human-readable date.
 * @param isoTimestamp - The timestamp to format.
 * @param timezone - The timezone to format the timestamp in.
 * @returns {string} - The formatted date. Eg. 'Jan 1, 2025'.
 */
const formatTimestamp = (isoTimestamp: string, timezone = 'UTC') => {
   const date = new Date(isoTimestamp);
   const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
   };
   const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
   return formattedDate;
};

export { formatTimestamp };
