// @flow
import keplerGlReducer from 'kepler.gl/reducers';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import moment from 'moment';

const INITIAL_STATE ={
  fromDate: '24/09/2018', //moment().add(-2, 'days'),
  tillDate: '25/09/2018' //moment().add(-1, 'days')
};

const reducer = (state = INITIAL_STATE, action) => {

  switch( action.type ) {

    case 'FROM_DATE_CHANGED': {

      state = _.assign({}, state, {
        fromDate: action.data.date
      });

    }
    break;

    case 'TILL_DATE_CHANGED': {

      state = _.assign({}, state, {
        fromDate: action.data.date
      });

    }
    break;

  }

  return state;
}

// const reducer = handleActions({
//
// }, INITIAL_STATE);

// const reducer = handleActions(
//   {
//     [increment]: state => ({ ...state, fromDate: _.assign({}, state, {
//                                                               fromDate: action.data.date
//                                                             })
//    }),
//     [decrement]: state => ({ ...state, counter: state.counter - 1 })
//   },
//   defaultState
// );

const reducers = combineReducers({
  keplerGl: keplerGlReducer,
  app: reducer
});

export default reducers;
