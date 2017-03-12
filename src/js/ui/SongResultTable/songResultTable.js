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
      <tr>
        <td title="${songName}">${songName}</td>
        <td title="${artistNames}">${artistNames}</td>
        <td title="${albumName}">${albumName}</td>
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
        <tr>
          <th>Song</th>
          <th>Atrist</th>
          <th>Album</th>
        </tr>
      </thead>
      <tbody class="song-data">
        ${renderDataRows(state)}
      </tbody>
    </table>
  `
}
