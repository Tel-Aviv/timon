// @flow
import _ from 'lodash';
import moment from 'moment';

const INITIAL_STATE ={
  fromDate: moment().add(-2, 'days'),
  tillDate: moment().add(-1, 'days')
};

const reducers = (state = INITIAL_STATE, action) => {

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

export default reducers;
