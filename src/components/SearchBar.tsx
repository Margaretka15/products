import React, {useState} from 'react';

type Props = {
    onQuery: React.Dispatch<React.SetStateAction<string>>
}

function SearchBar({onQuery}: Props) {

    const [query, setQuery] = useState("");

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const formattedQuery = event.currentTarget.value.replace(/\D/g, '')
        setQuery((formattedQuery));
        // onQuery(formattedQuery);
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        onQuery(query);
    }
    return (
        <form action="" onSubmit={handleSubmit}>
            <input type={"text"} value={query} onChange={handleChange}/>
        </form>
    );
}

export default SearchBar;