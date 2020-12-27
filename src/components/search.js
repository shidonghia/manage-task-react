import React, { Component } from 'react';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: '',
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        })
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }
    render() {
        var {value} = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input 
                        type="text" 
                        name="keyword"
                        className="form-control" 
                        placeholder="Enter keyword ..."
                        value={value}
                        onChange={this.onChange}
                    />
                    <span className="input-group-btn">
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={this.onSearch}
                        >
                            <span className="fa fa-search mr-5"></span>Search
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}

export default Search;