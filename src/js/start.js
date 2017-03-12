import $ from 'jquery'

import { updateNextSpotifyQueryList } from './store'
import { getSpotifyData, getDummyData } from './api/spotify'
import renderSearch from './ui/SearchBar/searchBar'
import renderTable from './ui/SongResultTable/songResultTable'

$(() => {
  $('.js-start').click(() => {
    renderSearch()
  })

  $('.js-search-form').submit((e) => {
    const query = e.target[0].value
    e.preventDefault()

    // getSpotifyData(query)
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
