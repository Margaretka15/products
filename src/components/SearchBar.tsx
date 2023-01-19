import React, {useState} from 'react';
import {TextField} from "@mui/material";

type Props = {
    onQuery: React.Dispatch<React.SetStateAction<number>>
}

function SearchBar({onQuery}: Props) {

    const [query, setQuery] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const formattedQuery = event.currentTarget.value.replace(/\D/g, '')
        setQuery((formattedQuery));
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        onQuery(parseInt(query) | 0);
    }
    return (
        <form action="" onSubmit={handleSubmit}>
            <TextField
                id="outlined-password-input"
                label="Wyszukaj po ID"
                type="text"
                autoComplete="current-password"
                value={query}
                sx={{backgroundColor: "white", marginBottom: "25px"}}
                onChange={(e) => handleChange(e)}
            />
        </form>
    );
}

export default SearchBar;