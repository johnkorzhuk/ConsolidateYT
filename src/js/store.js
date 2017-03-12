let state = {
  isAuthorized: false,
  isSignedIn: false,
  playlistId: null,
  currentApiReq: null,
  nextSpotifyQueryList: ''
}

export const getState = () =>
  state

export const updateNextSpotifyQueryList = (query) => {
  state.nextSpotifyQueryList = query
}
export const updateCurrentApiReq = (currentApiReq) => {
  state.currentApiReq = currentApiReq
}

export const updatePlaylistId = (playlistId) => {
  state.playlistId = playlistId
}

export const updateAuthorizedState = (isAuthorized) => {
  state.isAuthorized = isAuthorized
}

export const updateSignedInState = (isSignedIn) => {
  state.isSignedIn = isSignedIn
}

