export default function translateStatus(status) {
  if (status === 'paid') {
    return 'Pago';
  }

  if (status === 'waiting_payment') {
    return 'Aguardando Pagamento';
  }

  if (status === 'processing') {
    return 'Em análise';
  }

  if (status === 'refused') {
    return 'Recusado';
  }

  if (status === 'refunded') {
    return 'Estornado';
  }

  return status;
}
