import $ from 'jquery'
import dummyData from './../../dummyData.json'

export const getSpotifyData = (query) =>
  new Promise((resolve, reject) => {
    $.ajax({
      dataType: 'json',
      url: 'https://api.spotify.com/v1/search',
      data: {
        q: query,
        type: 'track'
        // type: 'track,album,artist'
      },
      success (data) {
        resolve(data)
      },
      error (jqXHR, textStatus, err) {
        reject(err)
      }
    })
  })

export const getDummyData = () =>
  new Promise((resolve, reject) => {
    resolve(dummyData)
  })
