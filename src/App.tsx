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

export const SelectedIdContext = React.createContext<ISelectedIDContext | null>(null);

function App() {
    const [selectedId, setSelectedId] = useState(0);
    const [isShowingModal, setIsShowingModal] = useState(false);
    const selectedIdContextValue: ISelectedIDContext = {selectedId, setSelectedId, isShowingModal, setIsShowingModal};
    const [query, setQuery] = useState("");

    return (
        <div className="App">

            <SearchBar onQuery={setQuery}/>
            <SelectedIdContext.Provider value={selectedIdContextValue}>
                <ProductDetails/>
                <ProductsList query={query}/>
            </SelectedIdContext.Provider>

        </div>
    );
}
export default App;
