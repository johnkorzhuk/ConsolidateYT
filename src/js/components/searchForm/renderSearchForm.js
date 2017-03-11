import './searchForm.css'

export default (node) => {
  node.html(`
    <form class="js-search-form">
      <label class="search-label" for="js-search">Search for your favorite artist, album, or tracks.</label>
      <input class="search-input" id="js-search" type="text" autofocus/>
    </form>
  `)
}
