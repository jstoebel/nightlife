import {searchBars} from '../../actions';

import {connect} from 'react-redux';
import SearchBar from '../ui/SearchBar';
import {reduxForm} from 'redux-form';

const searchContainer = reduxForm({
  form: 'search',
})(SearchBar);

function mapStateToProps(state) {
  return {};
}

/*
  this function ensures that any props passed into the container
  (i.e. <LoginContainer spam={eggs}) will override anything mapped out
  in mapStateToProps or mapDispatchToProps. This lets us pass spys into the
  container that are then passed into the component
*/

const mapDispatchToProps = (dispatch) => {
    // see actions.js for what these actions do
    return {
        onSearchBars(terms) {
            dispatch(
                searchBars(terms)
            )
        }
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps);

export default connect(
                  mapStateToProps, mapDispatchToProps, mergeProps
                )(searchContainer);
