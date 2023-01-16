import React, {useContext, useEffect, useState} from 'react';
import {getProductById, getProductsPerPage} from "../services/ProductsService";
import Product from "./Product";
import Paginator from "./Paginator";
import {useSearchParams} from "react-router-dom";

import {useNavigate, createSearchParams} from 'react-router-dom';
import {ErrorMessageContext, SelectedIdContext} from "../App";
import {Box, CircularProgress, List} from "@mui/material";

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

    const selectedIdContext = useContext(SelectedIdContext);
    const errorMessageContext = useContext(ErrorMessageContext);

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    useEffect(() => {

        if (selectedIdContext !== null) {
            const params = {
                id: (selectedIdContext?.selectedId)?.toString(),
                page: currentPage.toString()
            };
            const options = {
                pathname: '',
                search: `?${createSearchParams(params)}`,
            };
            navigate(options, {replace: true});

        }
    }, [currentPage, selectedIdContext?.selectedId]);


    const handleData = (result: { total_pages: number, data: [] }) => {
        setProducts(result.data);
        setNumberOfPages(result.total_pages);
        setIsLoading(false);
    }

    const setFilteredData = (result: { data: [] }) => {
        setProducts(result.data);
        setNumberOfPages(1);
    }

    const handleError = () => {
        // errorMessageContext?.setErrorMessage()
    }

    useEffect(() => {
        if (query === "") {
            getProductsPerPage(currentPage, handleData);
        } else {
            getProductById(parseInt(query), setFilteredData, handleError);
        }

    }, [currentPage, query]);

    return (
        <>
            <List sx={{minHeight: "350px"}}>
                {isLoading ? <Box sx={{display: 'flex'}}>
                    <CircularProgress/>
                </Box> : null}

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
            </List>
            <Paginator onClick={setCurrentPage} current={currentPage} numberOfPages={numberOfPages}/>

        </>

    );
}

export default ProductsList;