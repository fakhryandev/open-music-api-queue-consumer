const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById({ playlistId }) {
    const query = {
      text: `SELECT a.song_id, b.id, b.name, c.username FROM playlist_songs a
              JOIN playlists b ON a.playlist_id = b.id
              JOIN users c ON b.owner = c.id
              WHERE b.id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = PlaylistsService;
