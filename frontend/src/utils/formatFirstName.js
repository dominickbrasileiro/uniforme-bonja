function formatFirstName(name) {
  const [firstName] = name.toLowerCase().split(' ');

  const chars = firstName.split('');

  chars[0] = chars[0].toUpperCase();

  return chars.join('');
}

export default formatFirstName;
