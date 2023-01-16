import React, {useEffect, useState} from 'react';
import './App.css';
import ProductsList, {IProduct} from "./components/ProductsList";
import SearchBar from "./components/SearchBar";
import ProductDetailsModal from "./components/ProductDetailsModal";
import {Box, CircularProgress} from "@mui/material";
import Paginator from "./components/Paginator";
import {getProductById, getProductsPerPage} from "./services/ProductsService";
import {useLocation, useSearchParams} from "react-router-dom";

interface ISelectedIDContext {
    selectedId: number,
    setSelectedId: React.Dispatch<React.SetStateAction<number>>
    isShowingModal: boolean
    setIsShowingModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface IError {
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

export const SelectedIdContext = React.createContext<ISelectedIDContext | null>(null);
export const ErrorMessageContext = React.createContext<IError | null>(null);

function App() {

    const search = useLocation().search;

    const idFromUrl = parseInt(new URLSearchParams(search).get('id') as string);
    const pageNumberFromURL = parseInt(new URLSearchParams(search).get('page') as string);

    const [selectedId, setSelectedId] = useState(0);
    const [isShowingModal, setIsShowingModal] = useState(false);

    const [filter, setFilter] = useState(idFromUrl | 0);
    const [errorMessage, setErrorMessage] = useState("");

    const [products, setProducts] = useState(Array<IProduct>)
    const [isLoading, setIsLoading] = useState(true);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(pageNumberFromURL | 1);

    const selectedIdContextValue: ISelectedIDContext = {selectedId, setSelectedId, isShowingModal, setIsShowingModal};
    const errorContextValue: IError = {errorMessage, setErrorMessage};

    const handleData = (result: { total_pages: number, data: [] }) => {
        setProducts(result.data);
        setNumberOfPages(result.total_pages);
        setIsLoading(false);
    }

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams({id: filter.toString(), page: currentPage.toString()})

    }, [currentPage, filter])

    useEffect(() => {
        getProductsPerPage(parseInt(searchParams.get("page") as string), handleData);
    }, [searchParams.get("page")]);

     useEffect(() => {
        getProductById(parseInt(searchParams.get("id") as string), handleData);
    }, [searchParams.get("id")]);



    return (
        <div className="App">
            <SearchBar onQuery={setFilter}/>
            <SelectedIdContext.Provider value={selectedIdContextValue}>
                <ProductDetailsModal/>
                <ErrorMessageContext.Provider value={errorContextValue}>
                    {isLoading ? <Box sx={{display: 'flex'}}>
                        <CircularProgress/>
                    </Box> : <ProductsList data={products}/>}

                    <Paginator onClick={setCurrentPage} current={currentPage} numberOfPages={numberOfPages}/>
                    {idFromUrl}---
                    {pageNumberFromURL}
                </ErrorMessageContext.Provider>
            </SelectedIdContext.Provider>
        </div>
    );
}

export default App;
