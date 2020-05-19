export default function translateStatus(status, callback) {
  if (status === 'paid') {
    callback('Pago');
  }

  if (status === 'waiting_payment') {
    callback('Aguardando Pagamento');
  }

  if (status === 'processing') {
    callback('Em análise');
  }

  if (status === 'refused') {
    callback('Recusado');
  }
}
