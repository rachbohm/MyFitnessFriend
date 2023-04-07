import { csrfFetch } from "./csrf";

const LOAD_DIARY_LOGS = "diaryLogs/LOAD_DIARY_LOGS";
const ADD_DIARY_LOG = "diaryLogs/ADD_DIARY_LOG";

//ACTIONS
const loadDiaryLogsAction = (diaryLogs) => ({
  type: LOAD_DIARY_LOGS,
  diaryLogs
});

const addDiaryLogAction = (diaryLog) => ({
  type: ADD_DIARY_LOG,
  diaryLog
})

//THUNKS
export const loadDiaryLogsThunk = () => async dispatch => {
  const res = await csrfFetch('/api/diaryLogs/current')
  if (res.ok) {
    const diaryLogs = await res.json();
    dispatch(loadDiaryLogsAction(diaryLogs))
    return diaryLogs
  }
};

export const createDiaryLogThunk = (payload) => async (dispatch) => {
  const res = await csrfFetch('/api/diaryLogs', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const diaryLog = await res.json();
    dispatch(addDiaryLogAction(diaryLog));
    return diaryLog;
  }
  return res;
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
    case ADD_DIARY_LOG:
      newState = { ...state };
      newState[action.diaryLog.id] = action.diaryLog;
      return newState;
    default:
      return state;
  }
}

export default diaryLogsReducer;
