function formatPhone(formatedPhone) {
  const number = formatedPhone.replace(/[()-\s]/g, '');

  const isCelular = number.length === 11;
  const numberData = {};

  if (isCelular) {
    numberData.ddd = number.slice(0, 2);
    numberData.parte1 = number.slice(2, 7);
    numberData.parte2 = number.slice(7, 11);
  } else {
    numberData.ddd = number.slice(0, 2);
    numberData.parte1 = number.slice(2, 6);
    numberData.parte2 = number.slice(6, 10);
  }

  if (!numberData.ddd) {
    return '';
  }

  if (numberData.ddd && !numberData.parte1) {
    return numberData.ddd;
  }

  if (numberData.ddd && numberData.parte1 && numberData.parte2) {
    return `(${numberData.ddd}) ${numberData.parte1}-${numberData.parte2}`;
  }

  if (!numberData.parte2 && !numberData.parte1) {
    return `(${numberData.ddd})`;
  }

  if (!numberData.parte2) {
    return `(${numberData.ddd}) ${numberData.parte1}`;
  }

  return number;
}
export default formatPhone;
