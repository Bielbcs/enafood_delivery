const MOCKED_CART = {
  _id: "640ba7adb9e80500397adfbd",
  user_id: "640ba7adb9e80500397adfbb",
  products: [],
  __v: 0
}

const MOCKED_CART_WITH_A_PRODUCT = {
  _id: "640ba7adb9e80500397adfbd",
  user_id: "640ba7adb9e80500397adfbb",
  products: [{
    _id: "640b8e147bdb3a158371f2a7",
    name: "Hamburguer",
    price: 12,
    image_url: "http://localhost:3001/images/hamburguer.jpg",
    quantity: 1
  },],
  __v: 0
}

const MOCKED_RETURNED_PRODUCTS = [
  {
    "_id": "640b8e147bdb3a158371f2a7",
    "name": "Hamburguer",
    "price": 12,
    "image_url": "http://localhost:3001/images/hamburguer.jpg"
  },
  {
    "_id": "640b8e147bdb3a158371f2a8",
    "name": "Pizza de Calabreza",
    "price": 35,
    "image_url": "http://localhost:3001/images/pizza.jpg"
  },
  {
    "_id": "640b8e147bdb3a158371f2a9",
    "name": "Batata frita",
    "price": 7.5,
    "image_url": "http://localhost:3001/images/batata_frita.jpg"
  },
  {
    "_id": "640b8e147bdb3a158371f2aa",
    "name": "Coca-cola 2L",
    "price": 10.5,
    "image_url": "http://localhost:3001/images/coca_cola.jpg"
  },
  {
    "_id": "640b8e147bdb3a158371f2ab",
    "name": "Coxinha",
    "price": 5.25,
    "image_url": "http://localhost:3001/images/coxinha.jpg"
  }
]

module.exports = { MOCKED_CART, MOCKED_RETURNED_PRODUCTS, MOCKED_CART_WITH_A_PRODUCT }