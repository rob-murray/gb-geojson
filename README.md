# gb-geojson

Create, edit, transform GeoJSON map data in British National Grid reference system.

### Features

Feature list:
* It works (i hope)


### Development

#### Run local webserver

To aid local development I recommend running a small webserver to serve static content.

```bash
$ node server
```

#### Build CSS

Build the CSS output `styles.css`.

```
$ sass --sourcemap=none css/styles.scss:dist/styles.css
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


## License

This project is available for use under the MIT software license.
See LICENSE
