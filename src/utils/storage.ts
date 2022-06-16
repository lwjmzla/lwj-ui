class Storage {
  private prefixKey = 'bb-ui_storage_';

  constructor(strategy = 'localStorage') {
    // @ts-ignore
    (this)['strategy'] = strategy;
  }

  /**
   * @param [string] key
   * @param [any] val
   * @param [number] maxAge 存储时间：s
   */
  set(key: { toString: () => string; }, val: any, maxAge = 0) {
    const data = {
      val,
      expires: maxAge === 0 ? 0 : Date.now() + maxAge * 1000
    };
    // @ts-ignore
    window[this['strategy']][this.prefixKey + key.toString()] = JSON.stringify(
      data
    );
  }

    // @ts-ignore
  get(key) {
    const data =
    // @ts-ignore
      window[this['strategy']][this.prefixKey + key.toString()] &&
    // @ts-ignore
      JSON.parse(window[this['strategy']][this.prefixKey + key.toString()]);

    if (data) {
      if (data.expires === 0) {
        return data.val;
      }

      if (Date.now() < data.expires) {
        return data.val;
      }

      this.remove(key);
      return null;
    }
    return null;
  }

    // @ts-ignore
  remove(key) {
    // @ts-ignore
    delete window[this['strategy']][this.prefixKey + key.toString()];
  }
}

export const local = new Storage('localStorage');
export const session = new Storage('sessionStorage');
