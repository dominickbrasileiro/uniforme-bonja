function formatName(name) {
  return name.split(' ').filter((word) => word).join(' ').toUpperCase();
}

export default formatName;
