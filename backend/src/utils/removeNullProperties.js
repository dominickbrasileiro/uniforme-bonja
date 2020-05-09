module.exports = (object) => {
  const newObject = { ...object };
  const keys = Object.keys(newObject);
  keys.forEach((key) => {
    if (!newObject[key]) {
      delete newObject[key];
    }
  });
  return newObject;
};
