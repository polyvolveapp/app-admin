import { createAction, handleActions } from "redux-actions"
import { AxiosResponse, AxiosError } from "axios"
import { take, call, put } from "redux-saga/effects"
import { axios, getErrorMessage, authenticatedHeader, defaultHeaders } from "../../../lib/axios"
import { API_URL } from "../../../constants/env";
import { lazyProtect } from "await-protect"

export interface ReviewLeaderCreateState {
  error: string
  loading: boolean
  initialized: boolean
}

export const actionNames = {
  CREATE_REVIEW_LEADER_REQUEST: "CREATE_REVIEW_LEADER_REQUEST",
  CREATE_REVIEW_LEADER_RESPONSE: "CREATE_REVIEW_LEADER_RESPONSE",
}

export const actions = {
  createReviewLeaderRequest: createAction<Partial<ReviewLeaderCreateState>>(actionNames.CREATE_REVIEW_LEADER_REQUEST),
  createReviewLeaderResponse: createAction<Partial<ReviewLeaderCreateState>>(actionNames.CREATE_REVIEW_LEADER_RESPONSE),
}

export default actions
export const ReviewLeaderCreateActions = actions

const initialState: ReviewLeaderCreateState = {
    error: "",
    loading: false,
    initialized: false
}

export const reviewLeaderCreateReducer = handleActions<ReviewLeaderCreateState, Partial<ReviewLeaderCreateState>>({
  [actionNames.CREATE_REVIEW_LEADER_REQUEST]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      loading: true,
    }
  },
  [actionNames.CREATE_REVIEW_LEADER_RESPONSE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      loading: false,
      initialized: true,
    }
  },
}, initialState)

export function* handleCreateReviewLeader() {
  while (true) {
    const action = yield take(actions.createReviewLeaderRequest)
    const { name, surname, mail } = action.payload

    const { res, err } = yield call(lazyProtect<AxiosResponse, AxiosError>(
      axios.post(`${API_URL}/review/leader/create`, { name, surname, mail },
        { withCredentials: true, headers: { ...authenticatedHeader(), ...defaultHeaders } })))

    if (err) {
      yield put(actions.createReviewLeaderResponse({ error: getErrorMessage(err) }))

      continue
    }

    if (res.status != 200) {
      yield put(actions.createReviewLeaderResponse({ error: getErrorMessage(err) }))

      continue
    }

    yield put(actions.createReviewLeaderResponse({ error: "" }))
  }
}
