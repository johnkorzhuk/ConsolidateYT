import $ from 'jquery'

import { updateNextSpotifyQueryList } from './store'
import { getSpotifyData, getDummyData } from './api/spotify'
import renderTable from './ui/SongResultTable/songResultTable'

$(() => {
  // $('.js-start').click(() => {
  //   renderSearch()
  // })

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
    $('.js-intro')
      // .removeClass('container')
      .css({
        marginTop: 0,
        alignSelf: 'flex-start'
      })
      .children()
      .css('font-size', '2.5rem')
      .not('h1')
      .remove()

    $('.js-hero').css({
      justifyContent: 'flex-start'
    })

    $('.js-form-container').css({
      display: 'block',
      marginTop: '30vh'
    })
    $('.search-form').css('margin-bottom', '3rem')
    $('#js-search').focus()

    $('.js-start').off()
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
