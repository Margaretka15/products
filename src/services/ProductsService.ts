import axios from 'axios';

const baseString = "https://reqres.in/api/products";
const itemsPerPage = 5;


export function getProductsPerPage(currentPage: number, callback: Function) {

    axios.get(baseString, {
        params: {
            page: currentPage,
            per_page: itemsPerPage
        }
    })
        .then((response) => {
            const data = response.data;
            callback(data);
        })
        .catch(error => error.response);
}

export function getProductById(id: number, handleResult: Function) {

    axios.get(baseString, {
        params: {
            id: id
        }
    })
        .then((response) => {
            const data = response.data;
            handleResult({data: [data.data]});

        })
        .catch(error => {
            if (error.response) {
                // handleError(error.response);
                console.log(error.response)
            }
        })
}