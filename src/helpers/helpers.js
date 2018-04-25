class Helpers {
  static capitalizeFirstChar(string) {
    return string.replace(/\b\w/g, l => l.toUpperCase())
  };
}

export {Helpers};
