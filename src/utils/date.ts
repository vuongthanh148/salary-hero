export const getDayOfMonth = (currentDate: Date) => {
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const daysInMonths = [
    31,
    year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return daysInMonths[month - 1];
};
