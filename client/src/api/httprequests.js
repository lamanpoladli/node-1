import axios from "axios";

const BASE_URL = 'http://localhost:8080/products'


//get all Products
export const getAllProducts = async () => {
    let globalData;
    await axios.get(`${BASE_URL}`)
        .then(res => {
            globalData = res.data;
        });
    return globalData;
}

//get Product by id
export const getProductByID = async (id) => {
    let globalData;
    await axios.get(`${BASE_URL}/${id}`)
        .then(res => {
            globalData = res.data;
        });
    return globalData;
}

//post new Product
export const postProduct = (newProduct) => {
    axios.post(`${BASE_URL}`, newProduct);
}

//delete Product by id
export const deleteProductByID = (id) => {
    axios.delete(`${BASE_URL}/${id}`);
}

//edit Product by id
export const editProductByID = (id, updatedProduct) => {
    axios.put(`${BASE_URL}/${id}`, updatedProduct);
}