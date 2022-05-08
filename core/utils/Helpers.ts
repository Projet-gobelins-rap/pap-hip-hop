export default class Helpers {

  /**
   * Return current ratio of the window
   */
  public static getWindowRatio(): number {
    return (window.devicePixelRatio) ? window.devicePixelRatio : 1
  }

  /**
   * Return current size of the window
   */
  public static getWindowSizes() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  /**
   * Interpolation method
   * https://en.wikipedia.org/wiki/Linear_interpolation
   */
  public static lerp(start: number, end: number, value: number) {
    return (1 - value) * start + value * end;
  }

  public static normalize(val: number, max: number, min: number): number {
    return (val - min) / (max - min);
  }

  public static traverse(o, fn) {
    for (var i in o) {
      fn.apply(this,[i,o[i]]);  
      if (o[i] !== null && typeof(o[i])=="object") {
        this.traverse(o[i], fn);
      }
    }
  }
  
}
