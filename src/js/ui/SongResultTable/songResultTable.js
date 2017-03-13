import './songResultTable.css'

// function renderDataRows (songs) {
//   let html = ''

//   songs.forEach((song) => {
//     const {
//       songName,
//       artistNames,
//       albumName
//     } = getTrackDetails(song)

//     html += `
//       <tr>
//         <td title="${songName}">${songName}</td>
//         <td title="${artistNames}">${artistNames}</td>
//         <td title="${albumName}">${albumName}</td>
//       </tr>
//     `
//   })
//   return html
// }

function renderDataRows (songs) {
  let html = ''

  songs.forEach((song) => {
    const {
      songName,
      artistNames,
      albumName
    } = song

    html += `
      <tr class="song-data-row">
        <td class="add-song"><button>+</button></td>
        <td class="song-data-name" title="${songName}">${songName}</td>
        <td class="song-data-artists" title="${artistNames}">${artistNames}</td>
        <td class="song-data-album" title="${albumName}">${albumName}</td>
      </tr>
    `
  })
  return html
}

function getTrackDetails ({ name, album, artists }) {
  const artistNames = artists.map(artist => artist.name).join(', ') || ''
  const albumName = album.name || ''
  const songName = name || ''

  return {
    songName,
    artistNames,
    albumName
  }
}

export default (node, state) => {
  return `
    <table class="song-data-container">
      <thead class="song-data-head">
        <tr class="song-data-row">
          <th class="add-song"></th>
          <th class="song-data-name">Song</th>
          <th class="song-data-artists">Atrist</th>
          <th class="song-data-album">Album</th>
        </tr>
      </thead>
      <tbody class="song-data">
        ${renderDataRows(state)}
      </tbody>
    </table>
  `
}
