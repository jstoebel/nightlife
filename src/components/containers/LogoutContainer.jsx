import {logoutUser, addError} from '../../actions';

import {connect} from 'react-redux';
import Logout from '../ui/Logout';
import {reduxForm} from 'redux-form';


function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = (dispatch) => {
    // see actions.js for what these actions do
    return {
        onLogout() {
            dispatch(
                logoutUser()
            )
        },
        onAddError(err) {
            dispatch(
                addError(err)          
            )
        },
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

export default connect(
                  mapStateToProps, mapDispatchToProps, mergeProps
                )(Logout);
