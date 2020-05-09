module.exports = (length = 6) => {
  const pin = [];
  for (let i = 0; i < length; i += 1) {
    const randomNumber = Math.floor(Math.random() * 10);
    pin.push(randomNumber);
  }
  return pin.join('');
};
