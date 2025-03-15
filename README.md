# Track Trivia

## Motivation

- Switch to Info Pages using Last.fm & Artist,Album,Track in the URL

## Install

you have 3 options ...

### a) Chrome Marketplace

TBDL

### b) Load zip file from github

1. Download the zip from github to a Directory of of your choice and unpack
1. Add to your Chrome/Firefox
   - Chrome: chrome://extensions/ -> Load unpacked

### c) build yourself from source code

This extention uses Node.js

1. Install Node.js
1. Install the dependencies: npm install
1. Build the extension: npm run build
1. The extension is built in the `dist` directory
1. Add to your Chrome/Firefox
   - Chrome: chrome://extensions/ -> Load unpacked
1. Optional:

   Increase the build version before 'Build the extension' in Powershell (if needed):
   - Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process    (optional in case of security warning)
   - .\inc_patch.ps1


#### other Developer Commands

- **npm run zip**: Creates a ZIP file from the dist folder for distribution purposes. The file is saved to the zip/TrackTrivia.zip location.
- **npm run publish**: Publishes the extension to the Chrome Web Store using the zipped distribution file. Requires proper authentication and setup with publish-browser-extension.
- **npm run publish-init**: Initializes the publishing configuration for the browser extension. Run this once before your first publication.

## How to use

1. https://open.spotify.com/ and play a track 
2. Open your lastfm Userpage (mine is https://www.last.fm/user/limex)
3. Select one of your recently played tracks
4. You will see an note/book icon near URL bar. Click it.
5. Select Wikipedia, for example.
6. You can jump to Wikipedia for the played track/artist
7. Left click: Open in a new tab. Middle click: Open the same tab.

This should work on all lastfm pages as long as there is Artist/Track/Album Information listed in the URL 

## Settings

Show/hide Sites:

1. Right click the note icon,
2. Select "Options"
3. It might take some seconds for the popup to apear. Collecting all the data takes some time.
4. Check/uncheck each Site to show/hide it.

## ToDo

???

## Screenshots

Button opens a popup when pressed on supported sites:

![Screenshot of Chrome](Screenshot-chrome.png)

Enable supported Sites for the Popup:

![Settings](Screenshot-chrome-settings.png)

## Privacy
The extension stores no personal data at all. period.
