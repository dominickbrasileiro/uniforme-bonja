function formatCpf(cpf) {
  const rawCpf = cpf.replace(/[.-\s]/g, '');

  const parte1 = rawCpf.slice(0, 3);
  const parte2 = rawCpf.slice(3, 6);
  const parte3 = rawCpf.slice(6, 9);
  const verificador = rawCpf.slice(9, 11);

  if (!parte1) {
    return '';
  }

  if (parte1 && !parte2) {
    return parte1;
  }

  if (parte1 && parte2 && !parte3) {
    return `${parte1}.${parte2}`;
  }

  if (parte1 && parte2 && parte3 && !verificador) {
    return `${parte1}.${parte2}.${parte3}`;
  }

  if (verificador) {
    return `${parte1}.${parte2}.${parte3}-${verificador}`;
  }

  return cpf;
}
export default formatCpf;
