function formatCpf(zipcode) {
  const rawZipcode = zipcode.replace(/[.-\s]/g, '');

  const parte1 = rawZipcode.slice(0, 5);
  const parte2 = rawZipcode.slice(5, 8);

  if (!parte1) {
    return '';
  }

  if (parte1 && !parte2) {
    return parte1;
  }

  if (parte2) {
    return `${parte1}-${parte2}`;
  }

  return zipcode;
}
export default formatCpf;
