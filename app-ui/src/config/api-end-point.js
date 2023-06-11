// const PORT = "8000"
// const dotenv = require("dotenv")
// dotenv.config()
const API_VERSION = 'api'
// const HOST = `http://localhost:${PORT}/${API_VERSION}` // API host server url
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
console.log("//////////////////")
console.log(BACKEND_URL)
console.log("//////////////////")
const HOST = `${BACKEND_URL}/${API_VERSION}` // API host server url

export const API_GET_ALL_PRODUCTS = `${HOST}/products`
export const API_GET_PRODUCT_BY_ID = `${HOST}/products/{0}`
export const API_POST_PRODUCT = `${HOST}/products`
export const API_UPDATE_PRODUCT = `${HOST}/products/{0}`
export const API_DELETE_PRODUCT = `${HOST}/products/{0}`
export const API_GET_PRODUCT_TOTAL_VALUE = `${HOST}/products/total-value`
export const API_GET_PRODUCT_TOTAL_ITEMS = `${HOST}/products/total-items`