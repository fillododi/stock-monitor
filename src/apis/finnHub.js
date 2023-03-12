import axios from "axios";

const API_KEY = "cg718o1r01qus5fk28h0cg718o1r01qus5fk28hg"

export default axios.create({
    baseURL: "https://finnhub.io//api/v1",
    params: {
        token: API_KEY
    }
})