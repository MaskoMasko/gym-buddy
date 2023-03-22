declare global {
  interface Array<T> {
    at(index?: number): T | undefined;
  }
}

if (!Array.prototype.at) {
  Array.prototype.at = function (index?: number) {
    // this => array on which we will call .at()
    const array = Object(this);
    //check if array.length is non-negative integer
    const length = array.length >>> 0;

    if (!index) {
      return array[0];
    }

    if (index >= 0 && index < length) {
      return array[index];
    }

    const k = index < 0 ? length + index : index;
    if (k >= 0 && k < length) {
      return array[k];
    }

    return undefined;
  };
}

export {};
