import moment from "moment";

export function getInterval(end: Date, start: Date) {
  const startDate = moment(start);
  const endDate = moment(end);
  return moment.duration(startDate.diff(endDate));
}

export function formatYearWithText(year: number) {
  return `${year} ${year === 1 ? "ano" : "anos"}`;
}

export function formatMonthWithText(month: number) {
  return `${month} ${month === 1 ? "mês" : "meses"}`;
}

export function formatDayWithText(day: number) {
  return `${day} ${day === 1 ? "dia" : "dias"}`;
}

export function formatHourWithText(hour: number) {
  return `${hour} ${hour === 1 ? "hora" : "horas"}`;
}

export function formatMinutesWithText(minutes: number) {
  return `${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
}

export function formatInterval(end: Date, start: Date) {
  const interval = getInterval(end, start);
  const years = interval.years();
  const months = interval.months();
  const days = interval.days();
  const hours = interval.hours();
  const minutes = interval.minutes();

  if (interval.asMilliseconds() < 0) {
    return ""; // Data inválida
  } else if (years === 0 && months === 0 && days === 0 && hours === 0 && minutes === 0) {
    return "agora mesmo";
  }

  let message = "";

  if (years > 0) {
    message += `${formatYearWithText(years)} ${months > 0 ? `e ${formatMonthWithText(months)}` : ""}`;
  } else if (months > 0) {
    message += `${formatMonthWithText(months)} ${days > 0 ? `e ${formatDayWithText(days)}` : ""}`;
  } else if (days > 0) {
    message += `${formatDayWithText(days)} ${hours > 0 ? `e ${formatHourWithText(hours)}` : ""}`;
  } else if (hours > 0) {
    message += `${formatHourWithText(hours)} ${minutes > 0 ? `e ${formatMinutesWithText(minutes)}` : ""}`;
  } else {
    message += formatMinutesWithText(minutes);
  }

  return `há ${message}`;
}