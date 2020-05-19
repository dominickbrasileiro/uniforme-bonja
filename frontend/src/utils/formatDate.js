function formatDate(iso) {
  if (!iso) return false;

  const date = new Date(iso);

  const day = String(date.getDate());
  const month = String(date.getMonth() + 1);
  const year = String(date.getFullYear());

  const twoDigitDay = day.length > 1 ? day : `0${day}`;
  const twoDigitMonth = month.length > 1 ? month : `0${month}`;

  return `${twoDigitDay}/${twoDigitMonth}/${year}`;
}

export default formatDate;
