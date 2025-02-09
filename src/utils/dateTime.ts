/**
 * Converts a UTC date and time string to local date and time
 * @param date UTC date string in YYYY-MM-DD format
 * @param time UTC time string in HH:mm:ss format
 * @returns Object containing local date and time strings
 */
export function utcToLocal(date: string, time: string): { localDate: string; localTime: string } {
  // Combine date and time into a UTC datetime string
  const utcDateTime = new Date(`${date}T${time}Z`);
  
  // Convert to local date string (YYYY-MM-DD)
  const localDate = utcDateTime.toLocaleDateString('en-CA'); // en-CA gives YYYY-MM-DD format
  
  // Convert to local time string (HH:mm:ss)
  const localTime = utcDateTime.toLocaleTimeString('en-GB', { // en-GB gives 24-hour format
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  return { localDate, localTime };
}

/**
 * Converts local date and time to UTC
 * @param date Local date string in YYYY-MM-DD format
 * @param time Local time string in HH:mm:ss format
 * @returns Object containing UTC date and time strings
 */
export function localToUtc(date: string, time: string): { utcDate: string; utcTime: string } {
  // Create Date object from local date and time
  const localDateTime = new Date(`${date}T${time}`);
  
  // Get ISO string and ensure it's valid
  const isoString = localDateTime.toISOString();
  const [datePart, timePart] = isoString.split('T');
  
  if (!datePart || !timePart) {
    throw new Error('Invalid date/time format');
  }
  
  // Convert to UTC date string (YYYY-MM-DD)
  const utcDate = datePart;
  
  // Convert to UTC time string (HH:mm:ss)
  const utcTime = timePart.substring(0, 8);
  
  return { utcDate, utcTime };
}
