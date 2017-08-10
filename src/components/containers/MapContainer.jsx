import * as actions from '../../actions';

import {connect} from 'react-redux';

import Map from '../ui/Map';

const mapStateToProps = (state) => {
  return ({
    results: state.results,
    currentRSVPs: state.bars,
  });
};

const mapDispatchToProps = (dispatch) => {
    // see actions.js for what these actions do
    return {
        onFetchBars() {
            dispatch(
                actions.fetchBars()
            )
        },
        onAddError(err) {
          dispatch(
            actions.addError(err)
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Map);
