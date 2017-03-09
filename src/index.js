import $ from 'jquery'

import './css/style.css'

const { CLIENT_ID } = process.env
const SCOPE = 'https://www.googleapis.com/auth/youtube'
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']

let GoogleAuth // Google Auth object.
let isAuthorized // Set when app loads. Update when user signs in/out
let currentApiReq // Last api request

window.handleClientLoad = function handleClientLoad () {
  // Load the API's client and auth2 modules.
  // Call the initClient function after the modules load.
  gapi.load('client:auth2', initClient)
}

function initClient () {
  gapi.client.init({
    'clientId': CLIENT_ID,
    'scope': SCOPE,
    'discoveryDocs': DISCOVERY_DOCS
  }).then(() => {
    GoogleAuth = gapi.auth2.getAuthInstance()
    /**
     * Listen for sign-in state changes.
     * Listener is invoked when OAuth2 server responds.
     */
    updateSigninStatus(GoogleAuth.isSignedIn.get())

    GoogleAuth.isSignedIn.listen(updateSigninStatus)

    $('#js-signin-toggle').click(() => {
      handleAuthClick()
    })

    // $('#js-test').click(() => {
    //   createPlayList({
    //     part: 'snippet,status',
    //     resource: {
    //       snippet: {
    //         title: 'Test Playlist numba 2',
    //         description: 'A private playlist created with the YouTube API'
    //       },
    //       status: {
    //         privacyStatus: 'private'
    //       }
    //     }
    //   }, 'insert')
    //   .then((playlistId) => addVideoToPlaylist('LbFCq897X6k', playlistId))
    //   .then((data) => console.log(data))
    // })
    $('#js-test').click(() => {
      $.ajax({
        url: 'https://api.spotify.com/v1/search',
        dataType: 'json',
        data: {
          q: "Katy Perry - Teenage Dream: The Complete Confection",
          type: 'track'
          // type: 'track,album,artist'
        },
        success (data) {
          console.log(data)
        },
        error (jqXHR, textStatus, err) {
          console.error(err)
        }
      })
    })

    $('#js-access-revoke').click(() => {
      revokeAccess()
    })
  })
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
function sendAuthorizedApiRequest (request, reqDetails, reqType) {
  currentApiReq = reqDetails

  if (isAuthorized) {
    currentApiReq = {}
    return request(reqDetails)
      .then(
        (response) => sortResByReqType(response.result, reqType),
        (err) => console.error(err)
      )
  } else {
    GoogleAuth.signIn()
  }
}

function sortResByReqType ({id, kind, snippet}, reqType) {
  switch (reqType) {
    case 'create:playlist':
      // console.log(snippet)
      return id

    case 'create:playlistItem':
      // console.log(id, kind, snippet)
      return {id, kind, snippet}

    default:
      console.error('Unsupport request type')
      break
  }
}

function addVideoToPlaylist (videoId, playlistId) {
  const videoDetails = {
    videoId,
    kind: 'youtube#video'
  }

  return sendAuthorizedApiRequest(
    gapi.client.youtube.playlistItems.insert,
    {
      part: 'snippet',
      resource: {
        snippet: {
          playlistId: playlistId,
          resourceId: videoDetails
        }
      }
    },
    'create:playlistItem'
  )
}

function createPlayList (playlistDetails) {
  return sendAuthorizedApiRequest(
    gapi.client.youtube.playlists.insert,
    playlistDetails,
    'create:playlist'
  )
}

/**
 * Listener called when user completes auth flow. If the currentApiRequest
 * variable is set, then the user was prompted to authorize the application
 * before the request executed. In that case, proceed with that API request.
 */
function updateSigninStatus (isSignedIn) {
  if (isSignedIn && GoogleAuth.currentUser.get().hasGrantedScopes(SCOPE)) {
    isAuthorized = true
    if (currentApiReq) sendAuthorizedApiRequest(currentApiReq)
  } else {
    isAuthorized = false
  }
  renderSignInStatus(isSignedIn)
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

/* global gapi */
