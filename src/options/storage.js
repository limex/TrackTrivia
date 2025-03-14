import { storage } from "webextension-polyfill";
import { map, zipObject, extend } from 'lodash';
import Vue from 'vue';
import maps from '../maps';
const { getAllMaps } = maps;

const storageArea = storage.sync || storage.local;

const mapNames = map(getAllMaps(), 'name');

const mapChecks = map(getAllMaps(), function (map){
	if ('default_check' in map) {
		return map['default_check'];
	} else {
		return true;
	};
});
const enabledMaps = Vue.observable(zipObject(mapNames, mapChecks));

init();

export default {
  init,
  observableEnabledMaps: enabledMaps,
  setMapEnabled,
};

function init() {
  storageArea.get('enabledMaps').then((stored) => {
    extend(enabledMaps, stored.enabledMaps);
  });
  storage.onChanged.addListener(onChanged);
}

function setMapEnabled(map, enabled) {
  enabledMaps[map.name] = enabled;
  storageArea.set({enabledMaps});
}

function onChanged(changes) {
  extend(enabledMaps, changes.enabledMaps.newValue);
}
