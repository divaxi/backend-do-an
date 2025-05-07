import { toZonedTime, getTimezoneOffset, formatInTimeZone } from 'date-fns-tz';

/**
 * Convert date from UTC to Vietnam Timezone (UTC+7)
 * @param inputDate Date object or ISO string (assumed to be UTC)
 */
export function convertToVietnamTimezone(inputDate: string | Date): Date {
  const timeZone = 'Asia/Ho_Chi_Minh';
  const timezoneOffset = getTimezoneOffset(timeZone);

  const date = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;

  // Convert from UTC to VN timezone
  const zonedDate = toZonedTime(date.getTime() - timezoneOffset, timeZone);
  console.log(new Date());
  // Return formatted string
  return zonedDate;
}

/**
 * Convert date from UTC to Vietnam Timezone (UTC+7)
 * @param inputDate Date object or ISO string (assumed to be UTC)
 */
export function FormatToVietnamTimezone(inputDate: string | Date): string {
  const timeZone = 'Asia/Ho_Chi_Minh';
  const date = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;

  // Convert from UTC to VN timezone
  const zonedDate = formatInTimeZone(date, timeZone, 'yyyy-MM-dd HH:mm:ss zzz');
  console.log(new Date());
  // Return formatted string
  return zonedDate;
}
