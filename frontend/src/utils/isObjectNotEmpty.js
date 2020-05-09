function isObjectNotEmpty(object) {
  if (typeof object !== 'object') {
    return false;
  }

  if (Object.entries(object).length > 0) {
    return true;
  }

  return false;
}

export default isObjectNotEmpty;
