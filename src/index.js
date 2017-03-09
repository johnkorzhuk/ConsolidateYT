import $ from 'jquery'

import './css/style.css'

const { CLIENT_ID } = process.env

let GoogleAuth // Google Auth object.
let isAuthorized // Set when app loads. Update when user signs in/out
let currentApiRequest // Last api request
const SCOPE = 'https://www.googleapis.com/auth/youtube'

window.handleClientLoad = function handleClientLoad () {
  // Load the API's client and auth2 modules.
  // Call the initClient function after the modules load.
  gapi.load('client:auth2', initClient)
}

function initClient () {
  gapi.client.init({
    'clientId': CLIENT_ID,
    'scope': SCOPE,
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
  }).then(() => {
    GoogleAuth = gapi.auth2.getAuthInstance()

    isAuthorized = GoogleAuth.currentUser.get().hasGrantedScopes(SCOPE)
    /**
     * Listen for sign-in state changes.
     * Listener is invoked when OAuth2 server responds.
     */
    updateSigninStatus(isAuthorized)

    GoogleAuth.isSignedIn.listen(updateSigninStatus)

    $('#js-signin-toggle').click(() => {
      handleAuthClick()
    })

    $('#js-test').click(() => {
      sendAuthorizedApiRequest({
        part: 'snippet,status',
        resource: {
          snippet: {
            title: 'Test Playlist',
            description: 'A private playlist created with the YouTube API'
          },
          status: {
            privacyStatus: 'private'
          }
        }
      })
      // gapi.client.youtube.playlists.list()
    })

    $('#js-access-revoke').click(() => {
      revokeAccess()
    })
  })
}
/**
 * Checks signed-in state to determine whether to sign in out out
 */
// todo: handle users who signed in, but didn't grant access
function handleAuthClick () {
  GoogleAuth.isSignedIn.get()
    ? GoogleAuth.signOut()
    : GoogleAuth.signIn()
}

function revokeAccess () {
  GoogleAuth.disconnect()
}

function renderSignInStatus (isSignedIn) {
  if (isSignedIn) {
    $('#js-signin-toggle').html('Sign out')
    $('#js-access-revoke').css('display', 'inline-block')
    $('#js-test').css('display', 'inline-block')
  } else {
    $('#js-signin-toggle').html('Sign in')
    $('#js-access-revoke').css('display', 'none')
    $('#js-test').css('display', 'none')
  }
}

/**
 * Store the request details. Then check to determine whether the user
 * has authorized the application.
 *   - If the user has granted access, make the API request.
 *   - If the user has not granted access, initiate the sign-in flow.
 */
function sendAuthorizedApiRequest (requestDetails) {
  currentApiRequest = requestDetails

  if (isAuthorized) {
    gapi.client.youtube.playlists.insert(requestDetails)
      .then(
        (response) => console.log(response),
        (err) => console.error(err)
      )
    currentApiRequest = {}
  } else {
    GoogleAuth.signIn()
  }
}

/**
 * Listener called when user completes auth flow. If the currentApiRequest
 * variable is set, then the user was prompted to authorize the application
 * before the request executed. In that case, proceed with that API request.
 */
function updateSigninStatus (isSignedIn) {
  if (isSignedIn) {
    isAuthorized = true
    if (currentApiRequest) sendAuthorizedApiRequest(currentApiRequest)
  } else {
    isAuthorized = false
  }
  renderSignInStatus(isSignedIn)
}

/* global gapi */
