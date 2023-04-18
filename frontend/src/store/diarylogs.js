import { csrfFetch } from "./csrf";

const LOAD_DIARY_LOGS = "diaryLogs/LOAD_DIARY_LOGS";
const NEW_DIARY_LOG = "diaryLogs/NEW_DIARY_LOG";
const EDIT_DIARY_LOG = "diaryLogs/EDIT_DIARY_LOG";

//ACTIONS
const loadDiaryLogsAction = (diaryLogs) => ({
  type: LOAD_DIARY_LOGS,
  diaryLogs
});

const newDiaryLogAction = (diaryLog) => ({
  type: NEW_DIARY_LOG,
  diaryLog
});

const editDiaryLogAction = (diaryLog) => ({
  type: EDIT_DIARY_LOG,
  diaryLog
});

//THUNKS
export const loadDiaryLogsThunk = () => async dispatch => {
  const res = await csrfFetch('/api/diaryLogs/current')
  if (res.ok) {
    const diaryLogs = await res.json();
    dispatch(loadDiaryLogsAction(diaryLogs))
    return diaryLogs
  }
};

export const newDiaryLogThunk = (payload) => async (dispatch) => {
  const res = await csrfFetch('/api/diaryLogs', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const diaryLog = await res.json();
    dispatch(newDiaryLogAction(diaryLog));
    return diaryLog;
  }
  return res;
};

export const editDiaryLogThunk = (payload, id) => async (dispatch) => {
  const res = await csrfFetch(`/api/diaryLogs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const diaryLog = await res.json();
    dispatch(editDiaryLogAction(diaryLog))
  }
};

export const removeFoodFromDiaryLogThunk = (diaryLogId, foodId) => async (dispatch) => {
  const res = await csrfFetch(`/api/diaryLogs/${diaryLogId}/foods/${foodId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const diaryLog = await res.json();
    dispatch(editDiaryLogAction(diaryLog))
  }
};


const initialState = {}
const diaryLogsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_DIARY_LOGS:
      newState = {  };
      action.diaryLogs.forEach((diaryLog) => {
        newState[diaryLog.id] = diaryLog;
      })
      return newState;
    case NEW_DIARY_LOG:
      newState = {  };
      // newState[action.diaryLog.id] = action.diaryLog;
      return newState;
    case EDIT_DIARY_LOG:
      newState = {};
      // newState = { ...state };
      // newState[action.diaryLog.id] = action.diaryLog;
      return newState;
    default:
      return state;
  }
}

export default diaryLogsReducer;
