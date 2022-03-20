export default function(value) {
  if (!value) return '';
  const stringDate = new Date(value);
  let date = stringDate.getUTCDate();
  date = date.toString().length === 1 ? `0${date}` : date;
  let month = stringDate.getUTCMonth() + 1;
  month = month.toString().length === 1 ? `0${month}` : month;
  let hours = stringDate.getHours();
  hours = hours.toString().length === 1 ? `0${hours}` : hours
  let minutes = stringDate.getMinutes();
  minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;

  return `${date}.${month}.${stringDate.getFullYear()} ${hours}:${minutes}`;
}