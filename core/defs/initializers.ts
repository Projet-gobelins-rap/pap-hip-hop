/**
 * Generic contract for initializer of the application
 */
export abstract class Initializers<OptionData, InitReturn> {
  protected _data: OptionData

  constructor(data: OptionData) {
    this._data = data
  }

  public abstract init(): InitReturn
}
