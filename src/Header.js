import React, {Component} from 'react';
import SearchBar from 'material-ui-search-bar';
import {searchKeyword} from "./redux/actions";
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <SearchBar
        onChange={(value) => this.setState({ searchValue: value })}
        onRequestSearch={() => {
          this.props.onSearch(this.state.searchValue)}}
        style={{
          margin: '10px auto 10px',
          maxWidth: 800,
        }}
      />
    )
  }
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    onSearch: text => {
      dispatch(searchKeyword(text))
    }
  }
};

const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default ConnectedHeader;