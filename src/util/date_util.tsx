import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import "dayjs/locale/en"; // ensure en data is loaded
dayjs.extend(advancedFormat);

export const getStartOfMonthsAgo = (
  fromDate: string | null | undefined = null,
  monthsAgo: number = 6
): string => {
  const baseDate = fromDate ? dayjs(fromDate) : dayjs();
  return baseDate
    .subtract(monthsAgo, "month")
    .startOf("month")
    .format("YYYY-MM-DD");
};

export const current_date = dayjs().format("YYYY-MM-DD");
export const start_of_month = dayjs().date(1).format("YYYY-MM-DD");
export const start_of_week = dayjs()
  .startOf("week") // Sunday at 00:00:00 -- Sunday is the default start date on dayjs
  .add(1, "day") // move to Monday
  .format("YYYY-MM-DD");

// Additional handy presets
export const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
export const start_of_year = dayjs().startOf("year").format("YYYY-MM-DD");

export type DateRange = { start_date: string; end_date: string };

// Start and end of last week (Mon..Sun), based on current locale behavior above
export const last_week_range = (): DateRange => {
  const thisMonday = dayjs().startOf("week").add(1, "day");
  const start = thisMonday.subtract(7, "day");
  const end = start.add(6, "day");
  return { start_date: start.format("YYYY-MM-DD"), end_date: end.format("YYYY-MM-DD") };
};

// Start and end of last month
export const last_month_range = (): DateRange => {
  const start = dayjs().subtract(1, "month").startOf("month");
  const end = dayjs().subtract(1, "month").endOf("month");
  return { start_date: start.format("YYYY-MM-DD"), end_date: end.format("YYYY-MM-DD") };
};

// Start and end of last year
export const last_year_range = (): DateRange => {
  const start = dayjs().subtract(1, "year").startOf("year");
  const end = dayjs().subtract(1, "year").endOf("year");
  return { start_date: start.format("YYYY-MM-DD"), end_date: end.format("YYYY-MM-DD") };
};

type Params = { start_date: string | Date; end_date: string | Date };

export function formatPeriod({ start_date, end_date }: Params): string {
  const s = dayjs(start_date);
  const e = dayjs(end_date);
  if (!s.isValid() || !e.isValid()) return "";

  const fmt = (d: dayjs.Dayjs) => d.locale("en").format("Do MMM YYYY");

  return s.isSame(e, "day") ? fmt(s) : `${fmt(s)} to ${fmt(e)}`;
}

export const formatDateColumn = (value: any) => {
  if (!value || value === "NaT") return "";

  return value.split("T")[0]; // Gets just the date part
};
