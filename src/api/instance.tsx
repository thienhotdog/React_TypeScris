import axios from "axios";

const instance = axios.create({
    baseURL: "https://test-shop-demo.herokuapp.com/api",
    headers: {
    "Content-Type": "application/json"
    }
})

export default instance;