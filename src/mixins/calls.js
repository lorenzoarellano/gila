// Mixins to do calls to API
import axios from 'axios'
var config = require('../config/api.json')
let API = config.api
export default {
    methods: {
        async getCategories() {
            return await axios.get(`${API}categories`)
                .then(function (response) {
                    return response.data
                })
                .catch(function (error) {
                    return error
                });
        },
        async getSubcategory(payload) {
            const params = {
                i: payload
            };
            return await axios.get(`${API}subcategory`, { params })
                .then(function (response) {
                    return response.data
                })
                .catch(function (error) {
                    return error
                });
        },
        async storeProduct(payload) {
            return await axios.post(`${API}newProduct`, payload)
                .then(function (response) {
                    return response.data
                })
                .catch(function (error) {
                    return error
                });
        },
        async getProducts(payload) {
            const params = {
                page: payload
            };
            return await axios.get(`${API}products`,{params})
            .then(function (response) {
                    return response.data
                })
                .catch(function () {
                    return false
                });
        },
        
    }
};