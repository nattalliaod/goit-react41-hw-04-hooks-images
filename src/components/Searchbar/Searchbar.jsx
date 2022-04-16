import { Component } from "react";
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { Search, SearchForm, SearchIcon, SearchFormInput } from "./Searchbar.styled";

export class Searchbar extends Component {
    
    static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    }
    
    state = {
        query: '',
    }

    handleNameChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
    };

    handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
        toast.error('Enter your query', {
            theme: "dark"
        });
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
    };
    
    render() {
        return (
            <>
                <Search onSubmit={this.handleSubmit}>
                    <SearchForm>

                        <SearchIcon type="submit">
                            <ImSearch size={20} />
                        </SearchIcon>

                        <SearchFormInput
                            value={this.state.query}
                            onChange={this.handleNameChange}
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
}

