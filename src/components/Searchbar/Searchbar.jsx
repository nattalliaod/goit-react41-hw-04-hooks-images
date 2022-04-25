import { useState } from "react";
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { Search, SearchForm, SearchIcon, SearchFormInput } from "./Searchbar.styled";

export const Searchbar = ({onSubmit}) => {
    const [query, setQuery] = useState(''); 
   
    const handleNameChange = event => {
    setQuery( event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
        toast.error('Enter your query', {
            theme: "dark"
        });
      return;
    }

    onSubmit(query);
    setQuery('');
    };
    
        return (
            <>
                <Search onSubmit={handleSubmit}>
                    <SearchForm>

                        <SearchIcon type="submit">
                            <ImSearch size={20} />
                        </SearchIcon>

                        <SearchFormInput
                            value={query}
                            onChange={handleNameChange}
                            name='query'
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                        />
                    </SearchForm>
                </Search>
            </>
        );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    }