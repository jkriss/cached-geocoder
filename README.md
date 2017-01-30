# cached-geocoder

Uses [geocoder](https://www.npmjs.com/package/geocoder) and caches the result with [leveldb](https://www.npmjs.com/package/level).

## Usage
      const geocoder = require('cached-geocoder')()
      geocoder.geocode("San Francisco", function(err, result) {
        console.log(JSON.stringify(result))
      })