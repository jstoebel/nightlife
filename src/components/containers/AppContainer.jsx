import * as actions from '../../actions';

import {connect} from 'react-redux';

import App from '../ui/App';

const mapStateToProps = (state) => {
  return ({
    errors: state.errors,
    fetching: state.fetching,
    auth: state.auth
  });
};


const mapDispatchToProps = (dispatch) => {
    return {
        onFetchBars() {
            dispatch(
                actions.fetchBars()
            )
        }
    }
}
/*
  this function ensures that any props passed into the container
  (i.e. <LoginContainer spam={eggs}) will override anything mapped out
  in mapStateToProps or mapDispatchToProps. This lets us pass spys into the
  container that are then passed into the component
*/

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
