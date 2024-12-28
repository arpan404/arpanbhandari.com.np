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
