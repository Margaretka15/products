import React, {useState} from 'react';
import './App.css';
import ProductsList from "./components/ProductsList";
import SearchBar from "./components/SearchBar";
import ProductDetails from "./components/ProductDetails";

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
    const [selectedId, setSelectedId] = useState(0);
    const [isShowingModal, setIsShowingModal] = useState(false);
    const [query, setQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const selectedIdContextValue: ISelectedIDContext = {selectedId, setSelectedId, isShowingModal, setIsShowingModal};
    const errorContextValue: IError = {errorMessage, setErrorMessage};

    return (
        <div className="App">
            <SearchBar onQuery={setQuery}/>
            <SelectedIdContext.Provider value={selectedIdContextValue}>
                <ProductDetails/>
                <ErrorMessageContext.Provider value={errorContextValue}>
                    <ProductsList query={query}/>
                </ErrorMessageContext.Provider>
            </SelectedIdContext.Provider>
        </div>
    );
}

export default App;
