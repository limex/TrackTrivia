const _ = require("lodash");

module.exports = {
  getAllMaps,
  isMatchingAMap,
  getArtistAlbumTrack,
};

function getAllMaps() {
  return maps;
}

function isMatchingAMap(url) {
  return _.some(maps, (map) => _.invoke(map, "getArtistAlbumTrack", url));
}

function getArtistAlbumTrack(url) {
  const map = _.find(maps, (map) => _.invoke(map, "getArtistAlbumTrack", url));
  if (map) {
    return map.getArtistAlbumTrack(url);
  }
}

//------------ replace below here -------------

const MISC_CATEGORY = "Misc";

function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    if (typeof x == "string") {
      x = ("" + x).toLowerCase();
    }
    if (typeof y == "string") {
      y = ("" + y).toLowerCase();
    }
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

const maps_raw = [
  {
    name: "Last.fm",
    category: MISC_CATEGORY,
    default_check: true,
    domain: "last.fm",
    description: "Start here!",
    getUrl(artist, album, track) {
      // https://www.last.fm/music/Chlorosounds+Music
      if (!track && !album) {
        artist = artist ? artist.replace(/ /g, "+"):'';
        return (
          "https://www.last.fm/music/" + artist
        );
      }
      // https://www.last.fm/music/Chlorosounds+Music/_/Baraccuda
      else if (!album) {
        album = "_";
      }
      // space to +
      artist = artist ? artist.replace(/ /g, "+"):'';
      album = album ? album.replace(/ /g, "+"):'';
      track = track ? track.replace(/ /g, "+"):'';
      return "https://www.last.fm/music/" + artist + "/" + album + "/" + track;
    },
    getArtistAlbumTrack(url) {
      // https://www.last.fm/music/FleetwoodMac/Rumors/The+Chain
      // https://www.last.fm/music/FleetwoodMac/Rumors
      if (
        (match = url.match(
          /last\.fm\/music\/([a-zA-z\+]*)\/([a-zA-z\+]*)\/([a-zA-z\+]*)/
        ))
      ) {
        let [, artist, album, track] = match;
        // https://www.last.fm/music/Chlorosounds+Music/_/Baraccuda
        if (album == "_") {
          album = "";
        }
        // + to space
        artist = artist ? artist.replace(/\+/g, " "):'';
        album = album ? album.replace(/\+/g, " "):'';
        track = track ? track.replace(/\+/g, " "):'';
        return [artist, album, track];
      } else if (
        // https://www.last.fm/music/N*E*R*D
        (match = url.match(/last\.fm\/music\/([\w\+\*]*)$/))
      ) {
        let [, artist, album, track] = match;
        // + to space
        artist = artist ? artist.replace(/\+/g, " "):'';
        album = album ? album.replace(/\+/g, " "):'';
        track = track ? track.replace(/\+/g, " "):'';
        return [artist, album, track];
      }
    },
  },
  {
    name: "MusixMatch",
    category: MISC_CATEGORY,
    default_check: true,
    domain: "musixmatch.com",
    description: "Lyrics, Credits",
    getUrl(artist, album, track) {
      // space to -
      artist = artist ? artist.replace(/ /g, "-"):'';
      album = album ? album.replace(/ /g, "-"):'';
      track = track ? track.replace(/ /g, "-"):'';
      // https://beta.musixmatch.com/artist/Goo-Goo-Dolls
      if (track == "") {
        return "https://beta.musixmatch.com/artist/" + artist;
      }
      // https://beta.musixmatch.com/lyrics/Goo-Goo-Dolls/Iris
      return "https://beta.musixmatch.com/lyrics/" + artist + "/" + track;
    },
    getArtistAlbumTrack(url) {
      let match;
      if (
        (match = url.match(
          /musixmatch\.com\/artist\/([\w\-\+\*]*)/
        ))
      ) {
        let [, artist, album, track] = match;
        // - to space
        artist = artist ? artist.replace(/\-/g, " "):'';
        album = album ? album.replace(/\-/g, " "):'';
        track = track ? track.replace(/\-/g, " "):'';
        return [artist, album, track];
      }
    },
  },
];

const maps = sortByKey(maps_raw, "name");
