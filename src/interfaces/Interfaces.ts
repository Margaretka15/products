import React from "react";

export interface IProduct {
    id: number;
    year: number;
    name: string;
    color: string;
    pantone_value: string;
}
export interface ISelectedIDContext {
    selectedId: number,
    setSelectedId: React.Dispatch<React.SetStateAction<number>>
    isShowingModal: boolean
    setIsShowingModal: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IError {
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}