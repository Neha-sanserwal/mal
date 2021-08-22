const { Symbol } = require("./types");

class Env {
  constructor(outer = null) {
    this.outer = outer;
    this.data = {};
  }

  static createEnv(outer = null, binds = [], exprs = []) {
    const env = new Env(outer);
    binds.forEach((symbol, index) => {
      env.set(symbol, exprs[index]);
    });
    return env;
  }
  set(key, malValue) {
    if (!(key instanceof Symbol)) throw "not a symbol";
    this.data[key.value] = malValue;
    return malValue;
  }
  find(key) {
    if (this.data.hasOwnProperty(key)) {
      return this;
    }
    if (!this.outer) {
      return null;
    }
    return this.outer.find(key);
  }
  get(key) {
    const keyEnv = this.find(key);
    if (!keyEnv) {
      throw key + " not found.";
    }
    return keyEnv.data[key];
  }
}
module.exports = { Env };
