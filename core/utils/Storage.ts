import {STORAGE_TYPE} from '../enums/storage'
class Storage {

  private _mode:STORAGE_TYPE

  // TODO typer correctement nos paramètres de méthodes
  constructor() {
    this._mode = STORAGE_TYPE.LOCAL_STORAGE
  }

  set(key,value) {
    if (this._mode === STORAGE_TYPE.LOCAL_STORAGE) {
      this.setInLocalStorage(key, value)
    }
  }

  get(key) {
    if (this._mode === STORAGE_TYPE.LOCAL_STORAGE) {
      return this.getInLocalStorage(key)
    }
  }

  /****/
  setInLocalStorage(key,value) {
    if ("localStorage" in window) {
      console.log(key,value)
      localStorage.setItem(key,value)
    }
  }

  getInLocalStorage(key) {
    if ("localStorage" in window) {
      if (localStorage.length > 0) {
        return localStorage.getItem(key)
      }
    }
  }

  /****/

  setInCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    const expires = 'expires='+ d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  getInCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

}
const $storage = new Storage()
export default $storage
