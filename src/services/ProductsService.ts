import axios from 'axios';

const baseString = "https://reqres.in/api/products";
const itemsPerPage = 5;

export function getProductsPerPage(callback: Function, currentPage: number) {

    axios.get(baseString, {
        params: {
            page: currentPage,
            per_page: itemsPerPage
        }
    })
        .then((response) => {
            const data = response.data;
            callback(data);
            console.log(data)

        })
        .catch(error => console.log(error))
}

export function getProductById(id: number, callback: Function) {

    axios.get(baseString, {
        params: {
            id: id
        }
    })
        .then((response) => {
            const data = response.data;
            callback({data: [data.data]});

        })
        .catch(error => console.log(error))
}
