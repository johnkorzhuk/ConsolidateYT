import $ from 'jquery'

export const renderSignInStatus = (isSignedIn) => {
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
