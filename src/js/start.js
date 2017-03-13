import $ from 'jquery'

import { updateNextSpotifyQueryList } from './store'
import { getSpotifyData, getDummyData } from './api/spotify'
import renderTable from './ui/SongResultTable/songResultTable'

$(() => {
  $('.js-search-form').submit((e) => {
    e.preventDefault()

    // getSpotifyData(e.target[0].value)
    //   .then((data) => {
    //     updateNextSpotifyQueryList(data.tracks.next)
    //     $('.song-data').html(renderTable($('.song-data'), data.tracks.items))
    //     $('.js-form-container').css('margin-top', '0')
    //     $('.js-hero').css({
    //       height: 'auto'
    //     })
    //   })
    //   .catch(() => {
    //     $('.song-data').html('<h2>Oh no! Something went wrong :(</h2>')
    //   })
    const $hero = $('.js-hero')
    const heading = $hero
      .find('.js-header')
      .removeClass()
      .detach()

    heading
      .find('.logo')
      .removeClass()
      .addClass('logo-small')
      .siblings('p')
      .remove()

    $hero
      .css('height', 'auto')
      .find('.js-intro')
      .removeClass('intro')
      .prepend(heading)
      .find('.js-header-row')
      .remove()

    $('.js-search-label').html('<h2>Search for your favorite Spotify tracks.</h2>')

    getDummyData()
      .then((data) => {
        $('.song-data').html(renderTable($('.song-data'), data))
        $('.js-form-container').css('margin-top', '0')
        $('.js-hero').css({
          height: 'auto'
        })
      })
      .catch(() => {
        $('.song-data').html('<h2>Oh no! Something went wrong :(</h2>')
      })
  })
})
