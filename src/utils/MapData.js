const canvas = { width: 1024, height: 1024 };

module.exports = {
  de_cache: {
    radar: "./assets/de_cache_radar.png",
    offsetX: function(pos) {
      return ((canvas.width / 2) + pos / 5.4 ) - 149;
    },
    offsetY: function(pos) {
      return ((canvas.height / 2) + pos / 5.4  * -1) + 80;
    }
  }
};
