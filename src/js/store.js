import { renderSignInStatus } from './ui/mapStateToUi'

let state = {
  isAuthorized: false,
  isSignedIn: false,
  playlistId: null,
  currentApiReq: null
}

export const getState = () =>
  state

export const updateCurrentApiReq = (currentApiReq) => {
  if (state.currentApiReq !== currentApiReq) {
    state.currentApiReq = currentApiReq
  }
}

export const updatePlaylistId = (playlistId) => {
  if (state.playlistId !== playlistId) {
    state.playlistId = playlistId
  }
}

export const updateAuthorizedState = (isAuthorized) => {
  if (state.isAuthorized !== isAuthorized) {
    state.isAuthorized = isAuthorized
  }
}

export const updateSignedInState = (isSignedIn) => {
  if (state.isSignedIn !== isSignedIn) {
    renderSignInStatus(isSignedIn)
    state.isSignedIn = isSignedIn
  }
}

