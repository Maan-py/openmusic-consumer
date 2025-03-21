class Listener {
  constructor(playlistsService, mailSender) {
    this.playlistsService = playlistsService;
    this.mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const playlist = await this.playlistsService.getPlaylistById(playlistId);
      const songs = await this.playlistsService.getPlaylistSongs(playlistId);
      playlist.songs = songs;

      await this.mailSender.sendEmail(targetEmail, JSON.stringify({ playlist }, null, 2));
      console.log(`Email berhasil dikirim ke ${targetEmail}`);
    } catch (error) {
      console.error('Gagal memproses pesan:', error);
    }
  }
}

module.exports = Listener;
