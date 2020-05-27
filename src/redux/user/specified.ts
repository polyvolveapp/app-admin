import { createAction, handleActions } from "redux-actions"
import { AxiosResponse, AxiosError } from "axios"
import { take, call, put } from "redux-saga/effects"
import {
  axios,
  getErrorMessage,
  authenticatedHeader,
  defaultHeaders,
} from "../../lib/axios"
import { API_URL } from "../../constants/env"
import { lazyProtect } from "await-protect"
import { ScoreContainer, User } from "polyvolve-ui/lib/@types"
import { NotificationMessageActions } from "../message"
import { getUserFromNames } from "../../lib/format"

export interface UserSpecifiedState {
  initialized: boolean
  loading: boolean
  error: string
  data?: User
  scores?: ScoreContainer
}

const actionNames = {
  GET_USER_REQUEST: "GET_USER_REQUEST",
  GET_USER_RESPONSE: "GET_USER_RESPONSE",
  UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST",
  UPDATE_USER_RESPONSE: "UPDATE_USER_RESPONSE",
  GET_SCORES_REQUEST: "GET_SCORES_REQUEST",
  GET_SCORES_RESPONSE: "GET_SCORES_RESPONSE",
}

const actions = {
  getUserRequest: createAction<Partial<UserSpecifiedState>>(
    actionNames.GET_USER_REQUEST
  ),
  getUserResponse: createAction<Partial<UserSpecifiedState>>(
    actionNames.GET_USER_RESPONSE
  ),
  updateUserRequest: createAction<Partial<UserSpecifiedState>>(
    actionNames.UPDATE_USER_REQUEST
  ),
  updateUserResponse: createAction<Partial<UserSpecifiedState>>(
    actionNames.UPDATE_USER_RESPONSE
  ),
  getScoresRequest: createAction<Partial<UserSpecifiedState>>(
    actionNames.GET_SCORES_REQUEST
  ),
  getScoresResponse: createAction<Partial<UserSpecifiedState>>(
    actionNames.GET_SCORES_RESPONSE
  ),
}

export const UserActiveActions = actions

const initialState: UserSpecifiedState = {
  initialized: false,
  loading: false,
  data: null,
  error: "",
}

export const userSpecifiedReducer = handleActions<
  UserSpecifiedState,
  Partial<UserSpecifiedState>
>(
  {
    [actionNames.GET_USER_REQUEST]: (state, action) => {
      return {
        ...state,
        ...action.payload,
        loading: true,
      }
    },
    [actionNames.GET_USER_RESPONSE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
        loading: false,
        initialized: true,
      }
    },
    [actionNames.UPDATE_USER_REQUEST]: (state, action) => {
      return {
        ...state,
        ...action.payload,
        loading: true,
      }
    },
    [actionNames.UPDATE_USER_RESPONSE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
        loading: false,
      }
    },
    [actionNames.GET_SCORES_REQUEST]: (state, action) => {
      return {
        ...state,
        ...action.payload,
        loading: true,
      }
    },
    [actionNames.GET_SCORES_RESPONSE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
        loading: false,
      }
    },
  },
  initialState
)

export function* handleGetUser() {
  while (true) {
    const action = yield take(actions.getUserRequest)
    const { id } = action.payload

    const { ok, err } = yield call(
      lazyProtect<AxiosResponse, AxiosError>(
        axios.get(`${API_URL}/user/get/${id}`, {
          withCredentials: true,
          headers: { ...authenticatedHeader(), ...defaultHeaders },
        })
      )
    )

    if (err || ok.status != 200) {
      yield put(actions.getUserResponse({ error: getErrorMessage(err) }))

      continue
    }

    const data = ok.data.data
    const user: User = data.user
    user.reviewMasters = data.reviewMasters
    user.reviews = data.reviews
    user.teams = data.teams

    yield put(actions.getUserResponse({ error: "", data: user }))
  }
}

export function* handleUpdateUser() {
  while (true) {
    const action = yield take(actions.updateUserRequest)
    const { id, name, surname, description, teamIds } = action.payload
    const userName = getUserFromNames(name, surname)

    yield put(NotificationMessageActions.info(`Updating user ${userName}...`))

    const { ok, err } = yield call(
      lazyProtect(
        axios.post(
          `${API_URL}/user/update`,
          { id, name, surname, description, teamIds },
          {
            withCredentials: true,
            headers: { ...authenticatedHeader(), ...defaultHeaders },
          }
        )
      )
    )

    if (err || ok.status != 200) {
      yield put(actions.updateUserResponse({ error: getErrorMessage(err) }))
      yield put(
        NotificationMessageActions.info(`Unable to update user ${userName}.`)
      )
      continue
    }

    const data = ok.data.data
    const user: User = data.user
    user.reviewMasters = data.reviewMasters
    user.reviews = data.reviews
    user.teams = data.teams


    yield put(NotificationMessageActions.info(`Updated user ${userName}.`))
    yield put(actions.updateUserResponse({ error: "", data: user }))
  }
}

export function* handleGetScores() {
  while (true) {
    const action = yield take(actions.getScoresRequest)
    const id: string = action.payload.id

    const { ok, err } = yield call(
      lazyProtect<AxiosResponse, AxiosError>(
        axios.get(`${API_URL}/user/scores/${id}`, {
          withCredentials: true,
          headers: { ...authenticatedHeader(), ...defaultHeaders },
        })
      )
    )

    if (err || ok.status != 200) {
      yield put(actions.getScoresResponse({ error: getErrorMessage(err) }))

      continue
    }

    const scores: ScoreContainer = ok.data.data

    yield put(actions.getScoresResponse({ error: "", scores }))
  }
}
