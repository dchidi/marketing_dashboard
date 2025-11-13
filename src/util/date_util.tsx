import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advancedFormat from "dayjs/plugin/advancedFormat";
import "dayjs/locale/en"; // ensure en data is loaded

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

// Helper function to get date in UK timezone
const getUKDate = (
  date?: string | Date | dayjs.Dayjs | null | undefined
): dayjs.Dayjs => {
  if (date instanceof Date) {
    return dayjs(date).tz("Europe/London");
  }
  if (typeof date === "string" || dayjs.isDayjs(date)) {
    return dayjs(date).tz("Europe/London");
  }
  return dayjs().tz("Europe/London");
};

export const getStartOfMonthsAgo = (
  fromDate: string | null | undefined = null,
  monthsAgo: number = 6
): string => {
  const baseDate = fromDate ? getUKDate(fromDate) : getUKDate();
  return baseDate
    .subtract(monthsAgo, "month")
    .startOf("month")
    .format("YYYY-MM-DD");
};

export const current_date = getUKDate().format("YYYY-MM-DD");
export const start_of_month = getUKDate().startOf("month").format("YYYY-MM-DD");
export const start_of_week = getUKDate()
  .startOf("week") // Sunday at 00:00:00 UK time
  .add(1, "day") // move to Monday UK time
  .format("YYYY-MM-DD");

// Additional handy presets
export const yesterday = getUKDate().subtract(1, "day").format("YYYY-MM-DD");
export const start_of_year = getUKDate().startOf("year").format("YYYY-MM-DD");

export type DateRange = { start_date: string; end_date: string };

// Start and end of last week (Mon..Sun) in UK timezone
export const last_week_range = (): DateRange => {
  const thisMonday = getUKDate().startOf("week").add(1, "day");
  const start = thisMonday.subtract(7, "day");
  const end = start.add(6, "day");
  return {
    start_date: start.format("YYYY-MM-DD"),
    end_date: end.format("YYYY-MM-DD"),
  };
};

// Start and end of last month in UK timezone
export const last_month_range = (): DateRange => {
  const start = getUKDate().subtract(1, "month").startOf("month");
  const end = getUKDate().subtract(1, "month").endOf("month");
  return {
    start_date: start.format("YYYY-MM-DD"),
    end_date: end.format("YYYY-MM-DD"),
  };
};

// Start and end of last year in UK timezone
export const last_year_range = (): DateRange => {
  const start = getUKDate().subtract(1, "year").startOf("year");
  const end = getUKDate().subtract(1, "year").endOf("year");
  return {
    start_date: start.format("YYYY-MM-DD"),
    end_date: end.format("YYYY-MM-DD"),
  };
};

type Params = { start_date: string | Date; end_date: string | Date };

export function formatPeriod({ start_date, end_date }: Params): string {
  const s = getUKDate(start_date);
  const e = getUKDate(end_date);
  if (!s.isValid() || !e.isValid()) return "";

  const fmt = (d: dayjs.Dayjs) => d.locale("en").format("Do MMM YYYY");

  return s.isSame(e, "day") ? fmt(s) : `${fmt(s)} to ${fmt(e)}`;
}

export const formatDateColumn = (value: any) => {
  if (!value || value === "NaT") return "";

  return value.split("T")[0]; // Gets just the date part
};

// Additional helper to get UK date with 9AM cutoff logic
export const getUKDateWithCutoff = (): string => {
  const ukNow = getUKDate();
  // If before 9AM UK time, return yesterday's date
  if (ukNow.hour() < 9) {
    return ukNow.subtract(1, "day").format("YYYY-MM-DD");
  }
  return ukNow.format("YYYY-MM-DD");
};

// Get current UK time for debugging
export const getCurrentUKTime = (): string => {
  return getUKDate().format("YYYY-MM-DD HH:mm:ss");
};
