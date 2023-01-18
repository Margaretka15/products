import axios from 'axios';

const baseString = "https://reqres.in/api/products";
const itemsPerPage = 5;


export function getProductsPerPage(currentPage: number, callback: Function, handleError: Function) {

    axios.get(baseString, {
        params: {
            page: currentPage,
            per_page: itemsPerPage
        }
    })
        .then((response) => {
            const data = response.data;
            handleError("");
            callback(data);
        })
        .catch(error => {
            if (error.response) {
                handleError("Błąd wczytywania danych");
            }
        });
}

export function getProductById(id: number, handleResult: Function, handleError: Function) {

    axios.get(baseString, {
        params: {
            id: id
        }
    })
        .then((response) => {
            const data = response.data;
            handleError("");
            handleResult({data: [data.data]});

        })
        .catch(error => {
            if (error.response) {
                handleError(`Nie znaleziono elementu o podanym id (${id})`);
                // console.log(error.response.status)
            }
        })
}