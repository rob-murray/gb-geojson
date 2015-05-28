# gb-geojson

View, create, edit, transform GeoJSON map data in British National Grid reference system.

[GeoJSON](http://geojson.org/) is a simple data structure based on JavaScript Object Notation (JSON) that can be used to describe geographic features.

> image here

**gb-geojson** is a tool that allows you to view, create and edit GeoJSON in both ESPG:4326 and OS National Grid reference systems. We reproject on the fly so you can edit in either system and interchange as easily as possible, this is done with accuracy that is acceptable for browser editing.

### Features

Feature list:
* It works (i hope)

### What is the difference between Lon, Lat and OS National Grid?

Notes on projection here


## Development

#### Run local webserver

To aid local development I recommend running a small webserver to serve static content.

```bash
$ node server
```

#### watchify

Run `watchify` when developing locally:

```
$ npm run watch-js
```

#### Development build

To build an unminified `browserified` bundle:

```
$ npm run build-dev
```

#### Production build

To produce a minified release `browserified` bundle:

```
$ npm run build
```


## Contributions

Please use the GitHub pull-request mechanism to submit contributions.


## Credits

This stands on the shoulders by reusing many excellent libraries and is inspired by the excellent [geojson.io](https://github.com/mapbox/geojson.io).

Some of the many other libraries used are:

* [Leaflet](https://github.com/Leaflet/)
* [Leaflet-draw](https://github.com/Leaflet/Leaflet.draw)
* [Proj4js](http://proj4js.org/)
* [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet)


## Alternatives

If you dont want to use this tool then a simple alternative is to locally reproject your GeoJSON dataset with something such as [GDAL](http://www.gdal.org/ogr2ogr.html) or [reproject js library](https://github.com/perliedman/reproject) and then import into [geojson.io](https://github.com/mapbox/geojson.io).


## License

This project is available for use under the MIT software license.
See LICENSE
