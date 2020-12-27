import React, { Component } from 'react';
import Search from './search';
import Sort from './sort';

class Manipulation extends Component {
    render() {
        return (
            <div className="row mt-15">
                {/* Search*/}
                <Search onSearch={this.props.onSearch} />

                {/*Sort*/}
                <Sort onSort={this.props.onSort} />
            </div>
        );
    }
}

export default Manipulation;
