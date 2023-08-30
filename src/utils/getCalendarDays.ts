export const getCalendarDays = (date: Date) => {
  const currentDate = date;
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInCurrentMonth = lastDayOfMonth.getDate();

  const calendarDays = [];

  // Fill the calendar with empty cells before the first day of the current month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // Fill the calendar with this month's days
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    const strMonth = String(currentMonth + 1);

    const date =
      i < 10
        ? new Date(
            `${currentYear}-${
              strMonth.length < 2 ? `0${strMonth}` : `${strMonth}`
            }-0${i}`
          )
        : new Date(
            `${currentYear}-${
              strMonth.length < 2 ? `0${strMonth}` : `${strMonth}`
            }-${i}`
          );
    calendarDays.push(date);
  }

  // Fill the calendar with remaining empty cells
  const totalCalendarCells = 6 * 7;
  const remainingEmptyCells =
    totalCalendarCells - startingDayOfWeek - daysInCurrentMonth;
  for (let i = 0; i < remainingEmptyCells; i++) {
    calendarDays.push(null);
  }

  return calendarDays;
};
