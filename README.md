# [gb-geojson](http://rob-murray.github.io/gb-geojson/)

View, create, edit, transform GeoJSON map data in British National Grid reference system.

[GeoJSON](http://geojson.org/) is a simple data structure based on JavaScript Object Notation (JSON) that can be used to describe geographic features. With [gb-geojson](http://rob-murray.github.io/gb-geojson/) you can upload existing GeoJSON, create new features or edit existing objects in either WGS84 Longitude and Latitude or British National Grid Eastings and Northings.

![Editing a GeoJSON Feature and reprojecting coordinates to OSGB36](gb-geo-edit.gif?raw=true "Editing a GeoJSON Feature and reprojecting coordinates to OSGB36")

**gb-geojson** is a tool that allows you to view, create and edit GeoJSON in both `ESPG:4326` aka WGS84 and OS National Grid coordinate reference systems. We reproject between these reference systems on the fly so you can edit in either system and interchange as easily as possible, this is done with accuracy that is acceptable for most editing.


### Features

* View, create, edit GeoJSON in WGS84 and OS National Grid coordinate reference systems
* Reproject on the fly
* Uses Ordnance Survey backdrop mapping
* Open from and save to local files


### What is the difference between Lon, Lat and OS National Grid?

The "Lon, Lat" and "OS National Grid" switch in **gb-geojson** toggles the editable GeoJSON display between two different coordinate reference systems; [ESPG:4326](http://spatialreference.org/ref/epsg/wgs-84/) and [ESPG:27700](http://spatialreference.org/ref/epsg/27700/). This changes the appearance of the cartesian coordinate data to and from the recognisable Longitude, Latitude coordinates and Ordnance Survey Eastings, Northings used by maps in Great Britain. The default reference system used by GeoJSON to describe its geospatial data is `ESPG:4326` however the purpose of **gb-geojson** is to facilitate editing of GeoJSON in [ESPG:27700](http://spatialreference.org/ref/epsg/27700/) so by toggling this switch we reproject between these reference systems.

The GeoJSON geospatial data is always projected on the map using the Spherical Mercator `ESPG:3857`. The map tile layer is projected using [ESPG:27700](http://spatialreference.org/ref/epsg/27700/) from the OS OpenSpace service.

Note that the [GeoJSON spec](http://geojson.org/geojson-spec.html#positions) states that coordinates should be in the form `X, Y` for whichever projected reference system used.

The [GeoJSON spec](http://geojson.org/geojson-spec.html#coordinate-reference-system-objects) lists the `CRS` property but this is ignored by **gb-geojson** at present due to format ambiguity and to maintain tool simplicity.

The reprojection is done by the [gbify-geojson](https://github.com/rob-murray/gbify-geojson) library using Proj4js.


### Example data

Checkout the `data/` directory for some example GeoJSONs (sic).

```json
{"type":"Feature","properties":{"popupContent":"I am SU43."},"geometry":{"type":"Polygon","coordinates":[[[440000,130000],[450000,130000],[450000,140000],[440000,140000],[440000,130000]]]}}
```


## Development

#### Local development

Use webpack to build and run local webserver.

```bash
$ npm run webpack-server
```

#### Build CSS

Build the CSS output `styles.css`.

```
$ sass --sourcemap=none --style compressed css/styles.scss:dist/styles.css
```

#### Production build

To produce a minified release **Production** bundle:

```
$ npm run build
```


## Contributions

Please use the GitHub pull-request mechanism to submit contributions.


## Credits

This stands on the shoulders by reusing many excellent libraries and is inspired by the great [geojson.io](https://github.com/mapbox/geojson.io).

Some of the other libraries used are:

* [Leaflet](https://github.com/Leaflet/)
* [Leaflet-draw](https://github.com/Leaflet/Leaflet.draw)
* [Proj4js](http://proj4js.org/)
* [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet)
* [os-leaflet](https://github.com/rob-murray/os-leaflet)
* [gbify-geojson](https://github.com/rob-murray/gbify-geojson)

## Alternatives

If you dont want to use this tool then a simple alternative is to locally reproject your GeoJSON dataset with something such as [GDAL](http://www.gdal.org/ogr2ogr.html) or [reproject js library](https://github.com/perliedman/reproject) and then import into [geojson.io](https://github.com/mapbox/geojson.io).

GDAL can do this also with something like this to reproject OSGB36 > WGS84, then upload the resultant GeoJSON somewhere.

```bash
$ ogr2ogr -s_srs EPSG:27700 -f "GeoJSON" output.json input.json -t_srs EPSG:4326
```

## License

This project is available for use under the MIT software license.
See LICENSE
