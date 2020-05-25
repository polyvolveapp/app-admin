import { createAction, handleActions } from "redux-actions"
import { AxiosResponse, AxiosError } from "axios"
import { take, call, put } from "redux-saga/effects"
import { axios, getErrorMessage, authenticatedHeader, defaultHeaders } from "../../../lib/axios"
import { API_URL } from "../../../constants/env";
import { lazyProtect } from "await-protect"
import { ReviewLeader } from "..";

export interface ReviewLeaderOverviewState {
  initialized: boolean
  updated: boolean
  loading: boolean
  error: string
  all: ReviewLeader[]
  marked: { [key: string]: boolean }
}

const actionNames = {
  LOAD_REVIEW_LEADERS_REQUEST: "LOAD_REVIEW_LEADERS_REQUEST",
  LOAD_REVIEW_LEADERS_RESPONSE: "LOAD_REVIEW_LEADERS_RESPONSE",
  REMOVE_REVIEW_LEADER_REQUEST: "REMOVE_REVIEW_LEADER_REQUEST",
  REMOVE_REVIEW_LEADER_RESPONSE: "REMOVE_REVIEW_LEADER_RESPONSE",
}

const actions = {
  loadReviewLeadersRequest: createAction<Partial<ReviewLeaderOverviewState>>(actionNames.LOAD_REVIEW_LEADERS_REQUEST),
  loadReviewLeadersResponse: createAction<Partial<ReviewLeaderOverviewState>>(actionNames.LOAD_REVIEW_LEADERS_RESPONSE),
  removeReviewLeaderRequest: createAction<{ id: string }>(actionNames.REMOVE_REVIEW_LEADER_REQUEST),
  removeReviewLeaderResponse: createAction<{ error: string }>(actionNames.REMOVE_REVIEW_LEADER_RESPONSE),
}

export const ReviewLeaderOverviewActions = actions

const initialState: ReviewLeaderOverviewState = {
  initialized: false,
  loading: false,
  all: [],
  error: "",
  updated: false,
  marked: {}
}

export const reviewLeaderOverviewReducer = handleActions<ReviewLeaderOverviewState, Partial<ReviewLeaderOverviewState>>({
  [actionNames.LOAD_REVIEW_LEADERS_REQUEST]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      loading: true,
    }
  },
  [actionNames.LOAD_REVIEW_LEADERS_RESPONSE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      loading: false,
      initialized: true,
    }
  },
  [actionNames.REMOVE_REVIEW_LEADER_REQUEST]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      updated: false
    }
  },
  [actionNames.REMOVE_REVIEW_LEADER_RESPONSE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      updated: true
    }
  },
}, initialState)

export function* handleLoadReviewLeaderData() {
  while (true) {
    const action = yield take(actions.loadReviewLeadersRequest)
    const { reviewId } = action.payload

    const { res, err } = yield call(lazyProtect<AxiosResponse, AxiosError>(
      axios.get(`${API_URL}/review/leader/all/review/${reviewId}`,
        { withCredentials: true, headers: { ...authenticatedHeader(), ...defaultHeaders } })))

    if (err) {
      yield put(actions.loadReviewLeadersResponse({ error: getErrorMessage(err) }))

      continue
    }

    if (res.status != 200) {
      yield put(actions.loadReviewLeadersResponse({ error: getErrorMessage(err) }))

      continue
    }

    const all: ReviewLeader[] = res.data.data

    yield put(actions.loadReviewLeadersResponse({ error: "", all }))
  }
}

export function* handleRemoveReviewLeader() {
  while (true) {
    const action = yield take(actions.removeReviewLeaderRequest)
    const { id } = action.payload

    const { res, err } = yield call(lazyProtect<AxiosResponse, AxiosError>(
      axios.post(`${API_URL}/review/leader/delete`, { id },
        { withCredentials: true, headers: { ...authenticatedHeader(), ...defaultHeaders } })))

    if (err) {
      yield put(actions.removeReviewLeaderResponse({ error: getErrorMessage(err) }))

      continue
    }

    if (res.status != 200) {
      yield put(actions.removeReviewLeaderResponse({ error: getErrorMessage(err) }))

      continue
    }

    yield put(actions.removeReviewLeaderResponse({ error: "" }))
  }
}
