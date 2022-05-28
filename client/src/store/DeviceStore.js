import {makeAutoObservable} from "mobx"

export default class DeviceStore {
  constructor() {
    this._types = [
      {id: 3, name: 'Smartphone'},
      {id: 4, name: 'TV'}
    ]
    this._brands = [
      {id: 1, name: 'Samsung'},
      {id: 2, name: 'Apple'}
    ]
    this._devices = [
      {id: 1, name: "Iphone 12 pro", price: 100000, rating: 5, img: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn1.it4profit.com%2FAfrOrF3gWeDA6VOlDG4TzxMv39O7MXnF4CXpKUwGqRM%2Fq%3A100%2Fplain%2Fs3%3A%2F%2Fcatalog-products%2F201014082215729804%2F201106080048951631.png%40jpeg&imgrefurl=https%3A%2F%2Falmastore.az%2Fru%2Fiphone%2Fiphone-12%2Fiphone-12-128-gb-siniy-mgje3rma&tbnid=55nj-k8dMR57YM&vet=12ahUKEwjw6MHYvP_3AhUdBxAIHVa-Cy8QMygAegUIARC6AQ..i&docid=96pYgkmq0Eg3yM&w=3088&h=3088&q=iphone%2012&ved=2ahUKEwjw6MHYvP_3AhUdBxAIHVa-Cy8QMygAegUIARC6AQ'},
      {id: 1, name: "Iphone 12 pro", price: 100000, rating: 5, img: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn1.it4profit.com%2FAfrOrF3gWeDA6VOlDG4TzxMv39O7MXnF4CXpKUwGqRM%2Fq%3A100%2Fplain%2Fs3%3A%2F%2Fcatalog-products%2F201014082215729804%2F201106080048951631.png%40jpeg&imgrefurl=https%3A%2F%2Falmastore.az%2Fru%2Fiphone%2Fiphone-12%2Fiphone-12-128-gb-siniy-mgje3rma&tbnid=55nj-k8dMR57YM&vet=12ahUKEwjw6MHYvP_3AhUdBxAIHVa-Cy8QMygAegUIARC6AQ..i&docid=96pYgkmq0Eg3yM&w=3088&h=3088&q=iphone%2012&ved=2ahUKEwjw6MHYvP_3AhUdBxAIHVa-Cy8QMygAegUIARC6AQ'},
      {id: 1, name: "Iphone 12 pro", price: 100000, rating: 5, img: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn1.it4profit.com%2FAfrOrF3gWeDA6VOlDG4TzxMv39O7MXnF4CXpKUwGqRM%2Fq%3A100%2Fplain%2Fs3%3A%2F%2Fcatalog-products%2F201014082215729804%2F201106080048951631.png%40jpeg&imgrefurl=https%3A%2F%2Falmastore.az%2Fru%2Fiphone%2Fiphone-12%2Fiphone-12-128-gb-siniy-mgje3rma&tbnid=55nj-k8dMR57YM&vet=12ahUKEwjw6MHYvP_3AhUdBxAIHVa-Cy8QMygAegUIARC6AQ..i&docid=96pYgkmq0Eg3yM&w=3088&h=3088&q=iphone%2012&ved=2ahUKEwjw6MHYvP_3AhUdBxAIHVa-Cy8QMygAegUIARC6AQ'},
      {id: 1, name: "Iphone 12 pro", price: 100000, rating: 5, img: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn1.it4profit.com%2FAfrOrF3gWeDA6VOlDG4TzxMv39O7MXnF4CXpKUwGqRM%2Fq%3A100%2Fplain%2Fs3%3A%2F%2Fcatalog-products%2F201014082215729804%2F201106080048951631.png%40jpeg&imgrefurl=https%3A%2F%2Falmastore.az%2Fru%2Fiphone%2Fiphone-12%2Fiphone-12-128-gb-siniy-mgje3rma&tbnid=55nj-k8dMR57YM&vet=12ahUKEwjw6MHYvP_3AhUdBxAIHVa-Cy8QMygAegUIARC6AQ..i&docid=96pYgkmq0Eg3yM&w=3088&h=3088&q=iphone%2012&ved=2ahUKEwjw6MHYvP_3AhUdBxAIHVa-Cy8QMygAegUIARC6AQ'}
    ]
    makeAutoObservable(this)
  }

  setTypes(types) {
    this._types = types
  }

  setBrands(brands) {
    this._brands = brands
  }
  
  setDevices(devices) {
    this._devices = devices
  }

  get types() {
    return this._types
  }

  get brands() {
    return this._brands
  }

  get devices() {
    return this._devices
  }
}