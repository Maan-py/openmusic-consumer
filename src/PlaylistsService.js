const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this.pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new Error('Playlist tidak ditemukan');
    }

    return result.rows[0];
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
             FROM songs
             JOIN playlist_songs ON songs.id = playlist_songs.song_id
             WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
