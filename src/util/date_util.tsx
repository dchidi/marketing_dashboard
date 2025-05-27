import dayjs from "dayjs";

export const current_date = dayjs().format("YYYY-MM-DD");
export const start_of_month = dayjs().date(1).format("YYYY-MM-DD");
export const start_of_week = dayjs()
  .startOf("week") // Sunday at 00:00:00 -- Sunday is the default start date on dayjs
  .add(1, "day") // move to Monday
  .format("YYYY-MM-DD");
