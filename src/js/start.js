import $ from 'jquery'

import { updateSpotifyQuery } from './store'
import { getSpotifyData } from './api/spotify'

$(() => {
  const $start = $('.js-start')
  $start.click(() => {
    $('.js-intro')
      .removeClass('container')
      .css({
        marginTop: 0,
        alignSelf: 'flex-start'
      })
      .children()
      .css('font-size', '2.5rem')
      .not('h1')
      .remove()

    $('.js-hero').css({
      justifyContent: 'flex-start',
      height: 'auto'
    })
    $('.js-form-container').css('display', 'block')
    $('.search-form').css('margin-bottom', '3rem')
    $('#js-search').focus()

    $start.off()
  })

  $('.js-search-form').submit((e) => {
    const query = e.target[0].value
    e.preventDefault()

    updateSpotifyQuery(query)
    getSpotifyData(query)
      .then((data) => console.log(data))
  })
})
