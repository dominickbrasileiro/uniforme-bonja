module.exports = ({
  name, enrollment, access_pin, frontendUrl,
}) => `
<div style="color: #000 !important; font-family: Arial, Helvetica, sans-serif;">
  <h3>Olá, ${name.split(' ')[0]}!</h3>
  <p>Você solicitou a recuperação da sua chave de acesso.</p>
  <p>Essa é a sua chave de acesso ao portal de camisetas do Terceirão Bonja 2020: <h4>${access_pin}</h4></p>
  <p>Ela será a sua única forma de acesso ao portal, anote com cuidado!</p>
      <p style="font-weight: bold; font-size: 16px"> >>> <a href="${frontendUrl}/#/login?enrollment=${enrollment}" target="_blank">Acessar o portal</a> </p>
      <br />
      <p style="font-size: 14px"><i>Desenvolvido por Dominick Brasileiro</i> 💎</p>
</div>
`;
