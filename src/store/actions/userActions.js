import { userService } from '../../services/user.service'

export function loadUser() {
    return (dispatch,getState) => {
        const user = userService.getUser()
        dispatch({ type: 'SET_USER', user })
    }
}

export function updateUser(user) {
    return async (dispatch) => {
        dispatch({ type: 'UPDATE_USER', user })
    }
}
export function saveUser(user) {
    return (dispatch) => {
      dispatch({ type: 'SET_USER', user })
    }
  }
  
export function logout() {
    return async (dispatch) => {
        userService.logout()
        dispatch({ type: 'SET_USER', user: null })
    }
}