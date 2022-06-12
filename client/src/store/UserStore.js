import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._basket = [];
    this._userId = 0;
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  setUserId(_userId) {
    this._userId = _userId;
  }

  setBasket(_basket) {
    this._basket = _basket;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get userId() {
    return this._userId;
  }

  get basket() {
    return this._basket;
  }
}
