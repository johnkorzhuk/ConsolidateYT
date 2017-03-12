import $ from 'jquery'

import { updateSpotifyQuery } from './store'
import { getSpotifyData } from './api/spotify'
import renderSearch from './ui/renderSearch'

$(() => {
  $('.js-start').click(() => {
    renderSearch()
  })

  $('.js-search-form').submit((e) => {
    const query = e.target[0].value
    e.preventDefault()

    updateSpotifyQuery(query)
    getSpotifyData(query)
      .then((data) => console.log(data))
  })
})
