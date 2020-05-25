import { createAction, handleActions } from "redux-actions"
import { AxiosResponse, AxiosError } from "axios"
import { take, call, put } from "redux-saga/effects"
import { axios, getErrorMessage, authenticatedHeader, defaultHeaders } from "../../../lib/axios"
import { API_URL } from "../../../constants/env";
import { lazyProtect } from "await-protect"
import { ReviewLeader } from "..";

export interface ReviewLeaderActiveState {
  initialized: boolean
  loading: boolean
  error: string
  data?: ReviewLeader
}

const actionNames = {
  GET_REVIEW_LEADER_REQUEST: "GET_REVIEW_LEADER_REQUEST",
  GET_REVIEW_LEADER_RESPONSE: "GET_REVIEW_LEADER_RESPONSE",
  UPDATE_REVIEW_LEADER_REQUEST: "UPDATE_REVIEW_LEADER_REQUEST",
  UPDATE_REVIEW_LEADER_RESPONSE: "UPDATE_REVIEW_LEADER_RESPONSE",
}

const actions = {
  getReviewLeaderRequest: createAction<Partial<ReviewLeaderActiveState>>(actionNames.GET_REVIEW_LEADER_REQUEST),
  getReviewLeaderResponse: createAction<Partial<ReviewLeaderActiveState>>(actionNames.GET_REVIEW_LEADER_RESPONSE),
  updateReviewLeaderRequest: createAction<Partial<ReviewLeaderActiveState>>(actionNames.UPDATE_REVIEW_LEADER_REQUEST),
  updateReviewLeaderResponse: createAction<Partial<ReviewLeaderActiveState>>(actionNames.UPDATE_REVIEW_LEADER_RESPONSE),
}

export const ReviewLeaderActiveActions = actions

const initialState: ReviewLeaderActiveState = {
  initialized: false,
  loading: false,
  data: null,
  error: "",
}

export const reviewLeaderActiveReducer = handleActions<ReviewLeaderActiveState, Partial<ReviewLeaderActiveState>>({
  [actionNames.GET_REVIEW_LEADER_REQUEST]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      loading: true,
    }
  },
  [actionNames.GET_REVIEW_LEADER_RESPONSE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      loading: false,
      initialized: true,
    }
  },
  [actionNames.UPDATE_REVIEW_LEADER_REQUEST]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      loading: true,
    }
  },
  [actionNames.UPDATE_REVIEW_LEADER_RESPONSE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      loading: false,
    }
  },
}, initialState)

export function* handleGetReviewLeader() {
  while (true) {
    const action = yield take(actions.getReviewLeaderRequest)
    const { id } = action.payload

    const { res, err } = yield call(lazyProtect<AxiosResponse, AxiosError>(
      axios.get(`${API_URL}/review/leader/get/${id}`,
        { withCredentials: true, headers: { ...authenticatedHeader(), ...defaultHeaders } })))

    if (err || res.status != 200) {
      yield put(actions.getReviewLeaderResponse({ error: getErrorMessage(err) }))

      continue
    }

    const data: ReviewLeader = res.data.data

    yield put(actions.getReviewLeaderResponse({ error: "", data }))
  }
}

export function* handleUpdateReviewLeader() {
  while (true) {
    const action = yield take(actions.updateReviewLeaderRequest)
    const { id, name, description, mail } = action.payload

    const { res, err } = yield call(lazyProtect(
      axios.post(`${API_URL}/review/leader/update`, { id, name, description, mail },
        { withCredentials: true, headers: { ...authenticatedHeader(), ...defaultHeaders } })))

    if (err || res.status != 200) {
      yield put(actions.updateReviewLeaderResponse({ error: getErrorMessage(err) }))

      continue
    }

    const data = res.data.data

    yield put(actions.updateReviewLeaderResponse({ error: "", data }))
  }
}
