import $ from 'jquery'

import renderSearchForm from './components/searchForm/renderSearchForm'
import { updateSpotifyQuery } from './store'
import { getSpotifyData } from './api/spotify'
$(() => {
  const $start = $('.js-start')

  $start.click(() => {
    renderSearchForm($('#root'))
    $('.js-search-form').submit(function (e) {
      const query = e.target[0].value
      e.preventDefault()
      updateSpotifyQuery(query)
      getSpotifyData(query)
        .then((data) => console.log(data))
    })
  })
})
