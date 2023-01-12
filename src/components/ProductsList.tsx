import React, {useEffect, useState} from 'react';
import {getProductById, getProductsPerPage} from "../services/ProductsService";
import Product from "./Product";
import Paginator from "./Paginator";

export interface IProduct {
    id: number;
    year: number;
    name: string;
    color: string;
    pantone_value: string;
}

interface IQuery {
    query: string;
}

function ProductsList({query}: IQuery) {

    const [products, setProducts] = useState(Array<IProduct>)
    const [isLoading, setIsLoading] = useState(true);

    const [numberOfPages, setNumberOfPages] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);

    const handleData = (result: { total_pages: number, data: [] }) => {
        setProducts(result.data);
        setNumberOfPages(result.total_pages);
        setIsLoading(false);
    }

    const setFilteredData = (result: { data: [] }) => {
        setProducts(result.data);
        setNumberOfPages(1);
    }

    useEffect(() => {
        if (query === "") {
            getProductsPerPage(handleData, currentPage);
        } else {
            getProductById(parseInt(query), setFilteredData);
        }

    }, [currentPage, query]);


    return (
        <div>
            {isLoading ? "is loading" : null}

            {products.map((p: IProduct) => {
                return (
                    <Product id={p.id}
                             key={`product-${p.id}`}
                             year={p.year}
                             name={p.name}
                             color={p.color}
                             pantone_value={p.pantone_value}/>
                )
            })}
            <Paginator onClick={setCurrentPage} current={currentPage} numberOfPages={numberOfPages}/>
        </div>
    );
}

export default ProductsList;