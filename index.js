const geocoder = require('geocoder')
const level = require('level')

module.exports = function(opts) {
  if (!opts) opts = {}
  const db = level(opts.db || './geocoder.db', { valueEncoding: 'json' })

  const cachedGeocoder = function(address, cb) {
    db.get(address.toLowerCase(), function(err, value) {
      if (err && err.type !== 'NotFoundError') return cb(err)
      if (value) return cb(null, JSON.parse(value))
      geocoder.geocode(address, function(err, result) {
        if (err) return cb(err)
        db.put(address.toLowerCase(), JSON.stringify(result), function(err) {
          if (err) return cb(err)
          cb(null, result)
        })
      })
    })
  }

  return {
    geocode: cachedGeocoder,
    selectProvider: geocoder.selectProvider
  }
}