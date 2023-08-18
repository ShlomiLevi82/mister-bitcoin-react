import { utilService } from './utilService.js'

const USER_KEY = 'loggedInUser'

export const userService = {
  getLoggedinUser,
  addActivity,
  save,
  signup,
  addTransfer,
}

function signup(name) {
  if (name) {
    utilService.store(USER_KEY, {
      name,
      coins: 100,
      moves: [],
    })
    getLoggedinUser()
  }
}

function addActivity(activity) {
  const user = getLoggedinUser()
  user.moves.unshift(activity)
  utilService.store(USER_KEY, user)
}

function save(user) {
  utilService.store(USER_KEY, user)
}

function getLoggedinUser() {
  const user = utilService.load(USER_KEY)
  if (user) return user

  // _login()
  // return utilService.load(USER_KEY)
}

function addTransfer(toId, to, at, amount) {
  const user = getLoggedinUser()
  const transfer = {
    toId,
    to,
    at,
    amount,
  }
  user.moves.unshift(transfer)
  user.coins -= amount
  utilService.store(USER_KEY, user)
  return user
}

function _login() {
  utilService.store(USER_KEY, {
    name: 'Ochoa Hyde',
    coins: 100,
    moves: [],
  })
}
