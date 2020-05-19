function formatBRL(number) {
  if (number !== 0 && !number) return false;
  return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
}

export default formatBRL;
