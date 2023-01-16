import React, {useState} from 'react';
import {TextField} from "@mui/material";

type Props = {
    onQuery: React.Dispatch<React.SetStateAction<string>>
}

function SearchBar({onQuery}: Props) {

    const [query, setQuery] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const formattedQuery = event.currentTarget.value.replace(/\D/g, '')
        setQuery((formattedQuery));
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        onQuery(query);
    }
    return (
        <form action="" onSubmit={handleSubmit}>
            <TextField
                id="outlined-password-input"
                label="Wyszukaj po ID"
                type="text"
                autoComplete="current-password"
                value={query}
                onChange={(e) => handleChange(e)}
            />
        </form>
    );
}

export default SearchBar;