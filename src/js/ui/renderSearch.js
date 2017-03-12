import $ from 'jquery'

export default () => {
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

  $('.js-start').off()
}
