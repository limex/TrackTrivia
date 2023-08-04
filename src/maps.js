const _ = require("lodash");

module.exports = {
  getAllMaps,
  isMatchingAMap,
  getLatLonZoom,
};

function getAllMaps() {
  return maps;
}

function isMatchingAMap(url) {
  return _.some(maps, (map) => _.invoke(map, "getLatLonZoom", url));
}

function getLatLonZoom(url) {
  const map = _.find(maps, (map) => _.invoke(map, "getLatLonZoom", url));
  if (map) {
    return map.getLatLonZoom(url);
  }
}

//------------ replace below here -------------

function bboxToLatLonZoom(minlon, minlat, maxlon, maxlat) {
  const lon = (Number(minlon) + Number(maxlon)) / 2.0;
  const lat = (Number(minlat) + Number(maxlat)) / 2.0;
  const part = (Number(maxlat) - Number(minlat)) / 360.0;
  const height = screen.availHeight;
  const tile_part = (part * 256) / height;
  const zoom = Math.log(tile_part) / Math.log(0.5); //0.5^zoom=part
  return [lat, lon, zoom];
}
// -180 < lon < 180
function normalizeLon(lon) {
  return ((((Number(lon) + 180) % 360) + 360) % 360) - 180;
}

function latLonZoomToBbox(lat, lon, zoom) {
  const tile_part = Math.pow(0.5, zoom);
  const part = (tile_part * screen.availHeight) / 256;
  const minlon = Number(lon) - (360 * part) / 2;
  const maxlon = Number(lon) + (360 * part) / 2;
  const minlat = Number(lat) - (180 * part) / 2;
  const maxlat = Number(lat) + (180 * part) / 2;
  return [minlon, minlat, maxlon, maxlat];
}

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
    name: "Google Maps",
    category: MISC_CATEGORY,
    default_check: true,
    domain: "google.com",
    getUrl(lat, lon, zoom) {
      return (
        "https://www.google.com/maps/@" + lat + "," + lon + "," + zoom + "z"
      );
    },
    getLatLonZoom(url) {
      let match;
      if (
        (match = url.match(
          /google.*maps.*@(-?\d[0-9.]*),(-?\d[0-9.]*),(\d{1,2})[.z]/
        ))
      ) {
        const [, lat, lon, zoom] = match;
        return [lat, lon, zoom];
      } else if (
        (match = url.match(
          /google.*maps.*@(-?\d[0-9.]*),(-?\d[0-9.]*),(\d[0-9.]*)[m]/
        ))
      ) {
        let [, lat, lon, zoom] = match;
        zoom = Math.round(-1.4436 * Math.log(zoom) + 26.871);
        return [lat, lon, zoom];
      } else if (
        (match = url.match(
          /google.*maps.*@(-?\d[0-9.]*),(-?\d[0-9.]*),([0-9]*)[a],[0-9.]*y/
        ))
      ) {
        let [, lat, lon, zoom] = match;
        zoom = Math.round(-1.44 * Math.log(zoom) + 27.5);
        return [lat, lon, zoom];
      }
    },
  },
  {
    name: "OpenStreetMap",
    category: OSM_CATEGORY,
    default_check: true,
    domain: "openstreetmap.org",
    getUrl(lat, lon, zoom) {
      return (
        "https://www.openstreetmap.org/#map=" + zoom + "/" + lat + "/" + lon
      );
    },
    getLatLonZoom(url) {
      const match = url.match(
        /www\.openstreetmap\.org.*map=(\d{1,2})\/(-?\d[0-9.]*)\/(-?\d[0-9.]*)/
      );
      if (match) {
        const [, zoom, lat, lon] = match;
        return [lat, lon, zoom];
      }
    },
  },
];

const maps = sortByKey(maps_raw, "name");
