import { csrfFetch } from "./csrf";

const LOAD_DIARY_LOGS = "diaryLogs/LOAD_DIARY_LOGS";

//ACTIONS
const loadDiaryLogsAction = (diaryLogs) => ({
  type: LOAD_DIARY_LOGS,
  diaryLogs
})

//THUNKS
export const loadDiaryLogsThunk = () => async dispatch => {
  const res = await csrfFetch('/api/diaryLogs/current')
  if (res.ok) {
    const diaryLogs = await res.json();
    dispatch(loadDiaryLogsAction(diaryLogs))
    return diaryLogs
  }
}

const initialState = {}
const diaryLogsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_DIARY_LOGS:
      newState = { ...state };
      action.diaryLogs.forEach((diaryLog) => {
        newState[diaryLog.id] = diaryLog;
      })
      return newState;
    default:
      return state;
  }
}

export default diaryLogsReducer;
