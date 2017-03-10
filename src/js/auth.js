import $ from 'jquery'

import {
  updateSignedInState,
  updateAuthorizedState,
  getState
} from './store'

import {
  SCOPE,
  DISCOVERY_DOCS,
  sendAuthorizedApiRequest
} from './api/youtube'

import { getSpotifyData } from './api/spotify'

const { CLIENT_ID } = process.env

let GoogleAuth // Google Auth object.

window.handleClientLoad = function handleClientLoad () {
  // Load the API's client and auth2 modules.
  // Call the initClient function after the modules load.
  gapi.load('client:auth2', initClient)
}

function initClient () {
  gapi.client.init({
    clientId: CLIENT_ID,
    scope: SCOPE,
    discoveryDocs: DISCOVERY_DOCS
  }).then(() => {
    GoogleAuth = gapi.auth2.getAuthInstance()

    // Initialize signin & auth states
    updateSignedInState(GoogleAuth.isSignedIn.get())
    updateAuthorizedState(GoogleAuth.currentUser.get().hasGrantedScopes(SCOPE))
    /**
     * Listen for sign-in state changes.
     * Listener is invoked when OAuth2 server responds.
     */
    GoogleAuth.isSignedIn.listen(updateSigninStatus)

    $('#js-signin-toggle').click(() => {
      handleAuthClick()
    })

    // $('#js-test').click(() => {
    //   createPlaylist({
    //     title: 'Test Playlist numba 2',
    //     description: 'A private playlist created with the YouTube API',
    //     privacyStatus: 'private'
    //   })
    //     .then(() => addVideoToPlaylist({
    //       videoId: 'LbFCq897X6k',
    //       playlistId: getState().playlistId
    //     }))
    //     // .then((data) => console.log(data))
    // })
    $('#js-test').click(() => {
      getSpotifyData('katy perry')
        .then((data) => console.log(data))
    })
  })
}

/**
 * Listener called when user completes auth flow. If the currentApiRequest
 * variable is set, then the user was prompted to authorize the application
 * before the request executed. In that case, proceed with that API request.
 */
function updateSigninStatus (signedInState) {
  updateSignedInState(signedInState)
  updateAuthorizedState(GoogleAuth.currentUser.get().hasGrantedScopes(SCOPE))

  const { isSignedIn, isAuthorized, currentApiReq } = getState()

  if (isSignedIn && isAuthorized && currentApiReq) {
    sendAuthorizedApiRequest(currentApiReq)
  }
}

/**
 * Checks signed-in state to determine whether to sign in or out
 */
// todo: handle users who signed in, but didn't grant access
function handleAuthClick () {
  const { isSignedIn } = getState()
  isSignedIn
    ? GoogleAuth.signOut()
    : GoogleAuth.signIn()
}

/* global gapi */
