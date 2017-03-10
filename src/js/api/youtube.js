import {
  updateCurrentApiReq,
  updatePlaylistId,
  getState
} from './../store'

export const SCOPE = 'https://www.googleapis.com/auth/youtube'
export const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']

/**
 * Store the request details. Then check to determine whether the user
 * has authorized the application.
 *   - If the user has granted access, make the API request.
 *   - If the user has not granted access, initiate the sign-in flow.
 */
export const sendAuthorizedApiRequest = (reqDetails) => {
  const { isAuthorized } = getState()
  const { uri, data, type } = reqDetails

  updateCurrentApiReq(reqDetails)

  if (isAuthorized) {
    updateCurrentApiReq(null)

    return uri(data)
      .then(
        (response) => sortResByReqType(response.result, type),
        (err) => console.error(err)
      )
  } else {
    gapi.auth2.getAuthInstance().signIn()
  }
}

function sortResByReqType ({id, kind, snippet}, reqType) {
  switch (reqType) {
    case 'create:playlist':
      updatePlaylistId(id)
      break

    case 'create:playlistItem':
      // console.log(id, kind, snippet)
      return {id, kind, snippet}

    default:
      console.error('Unsupported request type')
      break
  }
}

export const createPlaylist = ({ title, description, privacyStatus }) => {
  return sendAuthorizedApiRequest({
    uri: gapi.client.youtube.playlists.insert,
    data: {
      part: 'snippet,status',
      resource: {
        snippet: {
          title,
          description
        },
        status: {
          privacyStatus
        }
      }
    },
    type: 'create:playlist'
  })
}

export const addVideoToPlaylist = ({ videoId, playlistId }) => {
  const videoDetails = {
    videoId,
    kind: 'youtube#video'
  }

  return sendAuthorizedApiRequest({
    uri: gapi.client.youtube.playlistItems.insert,
    data: {
      part: 'snippet',
      resource: {
        snippet: {
          playlistId: playlistId,
          resourceId: videoDetails
        }
      }
    },
    type: 'create:playlistItem'
  })
}

/* global gapi */
