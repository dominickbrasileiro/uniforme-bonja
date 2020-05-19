function formatCpf(expiry) {
  const date = expiry.replace(/[/]/g, '');

  const month = date.slice(0, 2);
  const year = date.slice(2, 4);

  if (month && !year) {
    return month;
  }

  if (year) {
    return `${month}/${year}`;
  }

  return expiry;
}
export default formatCpf;
