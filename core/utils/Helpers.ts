import { Vector3, Box3, BoxBufferGeometry, Matrix4 } from "three";

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

  public static mapRange = (value, x1, y1, x2, y2) => {
    return(value - x1) * (y2 - x2) / (y1 - x1) + x2;
  }

  public static traverse(o, fn) {
    for (var i in o) {
      fn.apply(this,[i,o[i]]);  
      if (o[i] !== null && typeof(o[i])=="object") {
        this.traverse(o[i], fn);
      }
    }
  }

  public static generateBoxCollider(object) {
    const box3 = new Box3();
    box3.setFromObject(object)

    const dimensions = new Vector3().subVectors(box3.max, box3.min);
    const boxGeometry = new BoxBufferGeometry(dimensions.x, dimensions.y, dimensions.z);

    const matrix = new Matrix4().setPosition(dimensions.addVectors(box3.min, box3.max).multiplyScalar(0.5));
    boxGeometry.applyMatrix4(matrix);

    for (const key in boxGeometry.attributes) {
      if (key !== 'position') {
        boxGeometry.deleteAttribute(key);
      }
    }

    return boxGeometry
  }
  
}
