import { combineReducers } from 'redux';

import { UPDATE_PAUSE_NOTIFICATIONS_INFO, UPDATE_SHOW_DATE_TIME_PICKER } from '../../constants/actions';

import { getPauseNotificationsInfo } from '../../senders';

const showDateTimePicker = (state = false, action: any) => {
  switch (action.type) {
    case UPDATE_SHOW_DATE_TIME_PICKER: {
      window.preventClosingWindow = action.showDateTimePicker;
      return action.showDateTimePicker;
    }
    default:
      return state;
  }
};

const pauseNotificationsInfo = (state = getPauseNotificationsInfo(), action: any) => {
  switch (action.type) {
    case UPDATE_PAUSE_NOTIFICATIONS_INFO: {
      return action.pauseNotificationsInfo;
    }
    default:
      return state;
  }
};

export default combineReducers({
  pauseNotificationsInfo,
  showDateTimePicker,
});
