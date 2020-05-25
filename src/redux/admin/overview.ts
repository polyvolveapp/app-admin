import { createAction, handleActions } from "redux-actions"
import { AxiosResponse, AxiosError } from "axios"
import { take, call, put } from "redux-saga/effects"
import { axios, getErrorMessage, authenticatedHeader, defaultHeaders } from "../../lib/axios"
import { API_URL } from "../../constants/env";
import { lazyProtect } from "await-protect"
import { Admin } from ".";

export interface AdminOverviewState {
  initialized: boolean
  loading: boolean
  id: string
  mail: string
  name: string
  surname: string
  error: string
}

const actionNames = {
  LOAD_ADMIN_REQUEST: "LOAD_ADMIN_REQUEST",
  LOAD_ADMIN_RESPONSE: "LOAD_ADMIN_RESPONSE"
}

export const AdminOverviewActions = {
  loadAdminRequest: createAction<Partial<AdminOverviewState>>(actionNames.LOAD_ADMIN_REQUEST),
  loadAdminResponse: createAction<Partial<AdminOverviewState>>(actionNames.LOAD_ADMIN_RESPONSE),
}

export default AdminOverviewActions

const initialState: AdminOverviewState = {
  initialized: false,
  loading: false,
  id: "",
  mail: "",
  name: "",
  surname: "",
  error: ""
}

export const adminOverviewReducer = handleActions<AdminOverviewState, Partial<AdminOverviewState>>({
  [actionNames.LOAD_ADMIN_REQUEST]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      loading: true,
    }
  },
  [actionNames.LOAD_ADMIN_RESPONSE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      loading: false,
      initialized: true,
    }
  }
}, initialState)

export function* handleLoadAdminData() {
  while (true) {
    yield take(AdminOverviewActions.loadAdminRequest)

    const { res, err } = yield call(lazyProtect<AxiosResponse, AxiosError>(
      axios.post(`${API_URL}/admin/own`, {}, 
        { withCredentials: true, headers: { ...authenticatedHeader(), ...defaultHeaders } })))

    if (err) {
      yield put(AdminOverviewActions.loadAdminResponse({ error: getErrorMessage(err) }))

      continue
    }

    if (res.status != 200) {
      yield put(AdminOverviewActions.loadAdminResponse({ error: getErrorMessage(err) }))

      continue
    }

    const admin: Admin = res.data.data
    const { mail, id, name, surname } = admin

    yield put(AdminOverviewActions.loadAdminResponse({ error: "", id, mail, name, surname }))
  }
}
