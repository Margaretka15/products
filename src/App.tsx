import React, {useEffect, useState} from 'react';
import './App.css';
import ProductsList from "./components/ProductsList";
import SearchBar from "./components/SearchBar";
import ProductDetailsModal from "./components/ProductDetailsModal";
import {Box, CircularProgress,} from "@mui/material";
import Paginator from "./components/Paginator";
import {getProductById, getProductsPerPage} from "./services/ProductsService";
import {useLocation, useSearchParams} from "react-router-dom";
import {IProduct, ISelectedIDContext} from "./interfaces/Interfaces";
import ErrorMessage from './components/ErrorMessage';
import "./styles/ProductDetailsModal.scss";

export const SelectedIdContext = React.createContext<ISelectedIDContext | null>(null);

function App() {

    const search = useLocation().search;

    const idFromUrl = parseInt(new URLSearchParams(search).get('id') as string);
    const pageNumberFromURL = parseInt(new URLSearchParams(search).get('page') as string);

    const [isShowingModal, setIsShowingModal] = useState(false);

    const [filter, setFilter] = useState(idFromUrl || 0);
    const [errorMessage, setErrorMessage] = useState("");

    const [products, setProducts] = useState(Array<IProduct>)
    const [isLoading, setIsLoading] = useState(true);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(pageNumberFromURL || 1);

    const [selectedProductData, setSelectedProductData] = useState({
        id: 0,
        year: 0,
        name: "",
        color: "",
        pantone_value: ""
    });

    const selectedIdContextValue: ISelectedIDContext = {
        isShowingModal,
        setIsShowingModal,
        selectedProductData,
        setSelectedProductData
    };

    const handleData = (result: { total_pages: number, data: [] }) => {
        setProducts(result.data);
        setNumberOfPages(result.total_pages);
        console.log(result.total_pages)
        setIsLoading(false);
    }
    const handleIdRequest = (result: { data: [] }) => {
        handleData({total_pages: 1, data: result.data});
    }

    const handleError = (message: string) => {
        setErrorMessage(message);
    }

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams(filter ? {id: filter.toString()} : {page: currentPage.toString()})
        console.log("current page i filter")
    }, [currentPage, filter])


    useEffect(() => {
        if (!idFromUrl) {
            getProductsPerPage(pageNumberFromURL, handleData, handleError);
        } else {
            getProductById(idFromUrl, handleIdRequest, handleError);
        }
    }, [pageNumberFromURL, idFromUrl]);

    return (
        <div className="App">
            <SearchBar onQuery={setFilter}/>
            {errorMessage !== "" ? <ErrorMessage message={errorMessage}/> : null}
            <SelectedIdContext.Provider value={selectedIdContextValue}>
                <ProductDetailsModal/>

                {isLoading ? <Box sx={{display: 'flex'}}>
                    <CircularProgress/>
                </Box> : <ProductsList data={products}/>}
                <Paginator setCurrent={setCurrentPage} current={currentPage} numberOfPages={numberOfPages}/>
            </SelectedIdContext.Provider>
        </div>
    );
}

export default App;
