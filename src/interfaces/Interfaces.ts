import React from "react";

export interface IProduct {
    id: number;
    year: number;
    name: string;
    color: string;
    pantone_value: string;
}

export interface ISelectedIDContext {
    isShowingModal: boolean
    setIsShowingModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedProductData: IProduct
    setSelectedProductData: React.Dispatch<React.SetStateAction<IProduct>>
}
