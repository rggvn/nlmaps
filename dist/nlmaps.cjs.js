'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var config = {
    "version": 0.2,
    "basemaps": {
        "defaults": {
            "crs": "EPSG:3857",
            "attribution": "Kaartgegevens &copy; <a href='https://www.kadaster.nl'>Kadaster</a> | \
            <a href='https://www.verbeterdekaart.nl'>Verbeter de kaart</a>",
            "minZoom": 6,
            "maxZoom": 19,
            "type": "wmts",
            "format": "png",
            "url": "https://geodata.nationaalgeoregister.nl/tiles/service"
        },
        "layers": [{
            "name": "standaard",
            "layerName": "brtachtergrondkaart"
        }, {
            "name": "grijs",
            "layerName": "brtachtergrondkaartgrijs"
        }, {
            "name": "pastel",
            "layerName": "brtachtergrondkaartpastel"
        }, {
            "name": "luchtfoto",
            "layerName": "2016_ortho25",
            "url": "https://geodata.nationaalgeoregister.nl/luchtfoto/rgb",
            "format": "jpeg"
        }]
    },
    "wms": {
        "defaults": {
            "url": "https://geodata.nationaalgeoregister.nl/{workSpaceName}/wms?",
            "version": "1.1.1",
            "transparent": true,
            "format": "image/png",
            "minZoom": 0,
            "maxZoom": 24
        },
        "layers": [{
            "name": "gebouwen",
            "workSpaceName": "bag",
            "layerName": "pand"
        }, {
            "name": "percelen",
            "workSpaceName": "bkadastralekaartv3ag",
            "layerName": "kadastralekaart"
        }, {
            "name": "drone-no-fly-zones",
            "workSpaceName": "dronenoflyzones",
            "layerName": "luchtvaartgebieden,landingsite"
        }, {
            "name": "hoogte",
            "workSpaceName": "ahn2",
            "layerName": "ahn2_05m_int",
            "styleName": "ahn2:ahn2_05m_detail"
        }, {
            "name": "gemeenten",
            "workSpaceName": "bestuurlijkegrenzen",
            "layerName": "gemeenten",
            "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen"
        }, {
            "name": "provincies",
            "workSpaceName": "bestuurlijkegrenzen",
            "layerName": "provincies",
            "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen"
        }]
    },
    "geocoder": {
        "suggestUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?",
        "lookupUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?"
    },
    "map": {
        "style": 'standaard',
        "center": {
            "latitude": 52.093249,
            "longitude": 5.111994
        },
        "zoom": 8,
        "attribution": true,
        "extent": [-180, -90, 180, 90],
        "zoomposition": "topright"
    },
    "marker": {
        "url": "./assets/img/marker_icon.svg",
        "iconSize": [64, 64],
        "iconAnchor": [63, 32]
    },
    "classnames": {
        'geocoderContainer': ['nlmaps-geocoder-control-container'],
        'geocoderSearch': ['nlmaps-geocoder-control-search'],
        'geocoderButton': ['nlmaps-geocoder-control-button'],
        'geocoderResultList': ['nlmaps-geocoder-result-list'],
        'geocoderResultItem': ['nlmaps-geocoder-result-item']
    }
};

var CONFIG = {};

CONFIG.BASE_DEFAULTS = {
    crs: "EPSG:3857",
    attr: "",
    minZoom: 0,
    maxZoom: 19,
    type: "wmts",
    format: "png",
    url: ""
};
CONFIG.WMS_DEFAULTS = {
    url: "",
    version: "1.1.1",
    transparent: true,
    format: "image/png",
    minZoom: 0,
    maxZoom: 24,
    styleName: ""
};
CONFIG.BASEMAP_PROVIDERS = {};
CONFIG.WMS_PROVIDERS = {};
CONFIG.GEOCODER = {};
CONFIG.MAP = {
    "zoomposition": "bottomleft"
};
CONFIG.MARKER = {};
CONFIG.CLASSNAMES = {
    'geocoderContainer': ['nlmaps-geocoder-control-container'],
    'geocoderSearch': ['nlmaps-geocoder-control-search'],
    'geocoderButton': ['nlmaps-geocoder-control-button'],
    'geocoderResultList': ['nlmaps-geocoder-result-list'],
    'geocoderResultItem': ['nlmaps-geocoder-result-item']
};

function err(err) {
    throw err;
}

if (config.version !== 0.2) {
    err('unsupported config version');
}

function mergeConfig(defaults$$1, config$$1) {
    return _extends({}, defaults$$1, config$$1);
}

function parseBase(basemaps) {
    var defaults$$1 = mergeConfig(CONFIG.BASE_DEFAULTS, basemaps.defaults);
    if (!basemaps.layers || basemaps.layers.length < 0) {
        err('no basemap defined, please define a basemap in the configuration');
    }
    basemaps.layers.forEach(function (layer) {
        if (!layer.name || CONFIG.BASEMAP_PROVIDERS[layer.name] !== undefined) {
            err('basemap names need to be defined and unique: ' + layer.name);
        }
        CONFIG.BASEMAP_PROVIDERS[layer.name] = formatBasemapUrl(mergeConfig(defaults$$1, layer));
    });
}
function parseWMS(wms) {
    var defaults$$1 = mergeConfig(CONFIG.WMS_DEFAULTS, wms.defaults);
    if (wms.layers) {
        wms.layers.forEach(function (layer) {
            if (!layer.name || CONFIG.WMS_PROVIDERS[layer.name] !== undefined) {
                err('wms names need to be defined and unique: ' + layer.name);
            }
            CONFIG.WMS_PROVIDERS[layer.name] = applyTemplate(mergeConfig(defaults$$1, layer));
        });
    }
}
function parseGeocoder(geocoder) {
    CONFIG.GEOCODER.lookupUrl = geocoder.lookupUrl;
    CONFIG.GEOCODER.suggestUrl = geocoder.suggestUrl;
}
function parseMap(map) {
    CONFIG.MAP = mergeConfig(CONFIG.MAP, map);
}

function formatBasemapUrl(layer) {
    switch (layer.type) {
        case 'wmts':
            layer.url = layer.url + "/" + layer.type + "/" + layer.layerName + "/" + layer.crs + "/{z}/{x}/{y}." + layer.format;
            break;
        case 'tms':
            layer.url = layer.url + "/" + layer.layerName + "/{z}/{x}/{y}." + layer.format;
            break;
        default:
            layer.url = layer.url + "/" + layer.type + "/" + layer.layerName + "/" + layer.crs + "/{z}/{x}/{y}." + layer.format;
    }
    return layer;
}

function applyTemplate(layer) {
    //Check if the url is templated
    var start = layer.url.indexOf('{');
    if (start > -1) {
        var end = layer.url.indexOf('}');
        var template = layer.url.slice(start + 1, end);
        if (template.toLowerCase() === "workspacename") {
            layer.url = layer.url.slice(0, start) + layer.workSpaceName + layer.url.slice(end + 1, -1);
        } else {
            err('only workspacename templates are supported for now');
        }
    }
    return layer;
}

function parseFeatureQuery(baseUrl) {
    CONFIG.FEATUREQUERYBASEURL = baseUrl;
}

function parseClasses(classes) {
    CONFIG.CLASSNAMES = mergeConfig(CONFIG.CLASSNAMES, classes);
}

function parseMarker(marker) {
    CONFIG.MARKER = marker;
}

if (config.featureQuery !== undefined) parseFeatureQuery(config.featureQuery.baseUrl);
if (config.map !== undefined) parseMap(config.map);
parseBase(config.basemaps);
if (config.wms !== undefined) parseWMS(config.wms);
if (config.geocoder !== undefined) parseGeocoder(config.geocoder);
if (config.marker !== undefined) parseMarker(config.marker);
if (config.classnames !== undefined) parseClasses(config.classnames);

var geocoder = CONFIG.GEOCODER;

function httpGetAsync(url) {
    // eslint-disable-next-line no-unused-vars
    return new Promise(function (resolve, reject) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            // eslint-disable-next-line eqeqeq
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                resolve(JSON.parse(xmlHttp.responseText));
            }
        };
        xmlHttp.open("GET", url, true); // true for asynchronous
        xmlHttp.send(null);
    });
}

function wktPointToGeoJson(wktPoint) {
    if (!wktPoint.includes('POINT')) {
        throw TypeError('Provided WKT geometry is not a point.');
    }
    var coordinateTuple = wktPoint.split('(')[1].split(')')[0];
    var x = parseFloat(coordinateTuple.split(' ')[0]);
    var y = parseFloat(coordinateTuple.split(' ')[1]);

    return {
        type: 'Point',
        coordinates: [x, y]
    };
}

/**
 * Make a call to PDOK locatieserver v3 suggest service. This service is meant for geocoder autocomplete functionality. For
 * additional documentation, check https://github.com/PDOK/locatieserver/wiki/API-Locatieserver.
 * @param {string} searchTerm The term which to search for
 */
geocoder.doSuggestRequest = function (searchTerm) {
    return httpGetAsync(this.suggestUrl + 'q=' + encodeURIComponent(searchTerm));
};

/**
 * Make a call to PDOK locatieserver v3 lookup service. This service provides information about objects found through the suggest service. For additional
 * documentation, check: https://github.com/PDOK/locatieserver/wiki/API-Locatieserver
 * @param {string} id The id of the feature that is to be looked up.
 */
geocoder.doLookupRequest = function (id) {
    return httpGetAsync(this.lookupUrl + 'id=' + encodeURIComponent(id)).then(function (lookupResult) {
        // A lookup request should always return 1 result
        var geocodeResult = lookupResult.response.docs[0];
        geocodeResult.centroide_ll = wktPointToGeoJson(geocodeResult.centroide_ll);
        geocodeResult.centroide_rd = wktPointToGeoJson(geocodeResult.centroide_rd);
        return geocodeResult;
    });
};

geocoder.createControl = function (zoomFunction, map) {
    var _this = this;

    this.zoomTo = zoomFunction;
    this.map = map;
    var container = document.createElement('div');
    parseClasses$1(container, CONFIG.CLASSNAMES.geocoderContainer);
    var searchDiv = document.createElement('form');
    var input = document.createElement('input');
    var button = document.createElement('button');
    var results = document.createElement('div');
    parseClasses$1(searchDiv, CONFIG.CLASSNAMES.geocoderSearch);
    container.addEventListener('click', function (e) {
        return e.stopPropagation();
    });
    container.addEventListener('dblclick', function (e) {
        return e.stopPropagation();
    });
    input.id = 'nlmaps-geocoder-control-input';
    input.placeholder = 'Zoomen naar adres...';
    input.setAttribute('aria-label', 'Zoomen naar adres');
    input.setAttribute('type', 'text');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('spellcheck', 'false');

    input.addEventListener('input', function (e) {
        _this.suggest(e.target.value);
    });

    input.addEventListener('focus', function (e) {
        _this.suggest(e.target.value);
    });
    button.setAttribute('type', 'submit');
    searchDiv.addEventListener('submit', function (e) {
        e.preventDefault();
        if (_this.results.length > 0) {
            _this.lookup(_this.results[0]);
        }
    });
    button.setAttribute('aria-label', 'Zoomen naar adres');
    parseClasses$1(button, CONFIG.CLASSNAMES.geocoderButton);

    results.id = 'nlmaps-geocoder-control-results';
    parseClasses$1(results, CONFIG.CLASSNAMES.geocoderResultList);
    results.classList.add('nlmaps-hidden');
    container.appendChild(searchDiv);
    searchDiv.appendChild(input);
    searchDiv.appendChild(button);
    container.appendChild(results);

    return container;
};

geocoder.suggest = function (query) {
    var _this2 = this;

    if (query.length < 3) {
        this.clearSuggestResults();
        return;
    }

    this.doSuggestRequest(query).then(function (results) {
        _this2.results = results.response.docs.map(function (r) {
            return r.id;
        });
        _this2.showSuggestResults(results.response.docs);
    });
};

geocoder.lookup = function (id) {
    var _this3 = this;

    this.doLookupRequest(id).then(function (result) {
        _this3.zoomTo(result.centroide_ll, _this3.map);
        _this3.showLookupResult(result.weergavenaam);
        _this3.clearSuggestResults();
    });
};

geocoder.clearSuggestResults = function () {
    document.getElementById('nlmaps-geocoder-control-results').innerHTML = '';
    document.getElementById('nlmaps-geocoder-control-results').classList.add('nlmaps-hidden');
};

geocoder.showLookupResult = function (name) {
    document.getElementById('nlmaps-geocoder-control-input').value = name;
};

function parseClasses$1(el, classes) {
    classes.forEach(function (classname) {
        el.classList.add(classname);
    });
}

geocoder.showSuggestResults = function (results) {
    var _this4 = this;

    this.clearSuggestResults();
    if (results.length > 0) {
        var resultList = document.createElement('ul');
        results.forEach(function (result) {

            var li = document.createElement('li');
            var a = document.createElement('a');
            a.innerHTML = result.weergavenaam;
            a.id = result.id;
            parseClasses$1(a, CONFIG.CLASSNAMES.geocoderResultItem);
            a.setAttribute('href', '#');
            a.addEventListener('click', function (e) {
                e.preventDefault();
                _this4.lookup(e.target.id);
            });
            li.appendChild(a);
            resultList.appendChild(li);
        });
        document.getElementById('nlmaps-geocoder-control-results').classList.remove('nlmaps-hidden');
        document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
    }
};

/*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
 * copyright (c) 2012, Stamen Design
 * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
 */

function getMarker() {
    return CONFIG.MARKER;
}

function getExtent() {
    return CONFIG.MAP.extent;
}

/*
 * Get the named provider, or throw an exception if it doesn't exist.
 **/
function getProvider(name) {
    if (name in CONFIG.BASEMAP_PROVIDERS) {
        var provider = CONFIG.BASEMAP_PROVIDERS[name];

        // eslint-disable-next-line no-console
        if (provider.deprecated && console && console.warn) {
            // eslint-disable-next-line no-console
            console.warn(name + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.");
        }

        return provider;
    } else {
        // eslint-disable-next-line no-console
        console.error('NL Maps error: You asked for a style which does not exist! Available styles: ' + Object.keys(PROVIDERS).join(', '));
    }
}

/*
 * Get the named wmsProvider, or throw an exception if it doesn't exist.
 **/
function getWmsProvider(name, options) {
    var wmsProvider = void 0;
    if (name in CONFIG.WMS_PROVIDERS) {
        wmsProvider = CONFIG.WMS_PROVIDERS[name];

        // eslint-disable-next-line no-console
        if (wmsProvider.deprecated && console && console.warn) {
            // eslint-disable-next-line no-console
            console.warn(name + " is a deprecated wms; it will be redirected to its replacement. For performance improvements, please change your reference.");
        }
    } else {
        wmsProvider = _extends({}, CONFIG.WMS_DEFAULTS, options);
        // eslint-disable-next-line no-console
        console.log('NL Maps: You asked for a wms which does not exist! Available wmses: ' + Object.keys(CONFIG.WMS_PROVIDERS).join(', ') + '. Provide an options object to make your own WMS.');
    }
    return wmsProvider;
}

var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

function extentLeafletFormat() {
    var extent = getExtent();
    var lowerLeft = L.latLng(extent[0], extent[1]);
    var upperRight = L.latLng(extent[2], extent[3]);
    var bounds = L.latLngBounds(lowerLeft, upperRight);
    return bounds;
}

//TODO 'standaard' vervangen door eerste layer van baselayers
if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof$1(L)) === 'object') {
    L.NlmapsBgLayer = L.TileLayer.extend({
        initialize: function initialize() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'standaard';
            var options = arguments[1];

            var provider = getProvider(name);
            var opts = L.Util.extend({}, options, {
                'minZoom': provider.minZoom,
                'maxZoom': provider.maxZoom,
                'scheme': 'xyz',
                'attribution': provider.attribution,
                'subdomains': provider.subdomains ? provider.subdomains : 'abc',
                sa_id: name
            });
            L.TileLayer.prototype.initialize.call(this, provider.url, opts);
        }
    });

    /*
     * Factory function for consistency with Leaflet conventions
     **/
    L.nlmapsBgLayer = function (options, source) {
        return new L.NlmapsBgLayer(options, source);
    };

    L.NlmapsOverlayLayer = L.TileLayer.WMS.extend({
        initialize: function initialize() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var options = arguments[1];

            var wmsProvider = getWmsProvider(name, options);
            var url = wmsProvider.url;
            delete wmsProvider.url;
            var wmsParams = L.Util.extend({}, options, {
                layers: wmsProvider.layerName,
                maxZoom: 24,
                minZoom: 1,
                styles: wmsProvider.styleName,
                version: wmsProvider.version,
                transparent: wmsProvider.transparent,
                format: wmsProvider.format
            });
            L.TileLayer.WMS.prototype.initialize.call(this, url, wmsParams);
        }
    });

    /*
     * Factory function for consistency with Leaflet conventions
     **/
    L.nlmapsOverlayLayer = function (options, source) {
        return new L.NlmapsOverlayLayer(options, source);
    };

    L.Control.GeoLocatorControl = L.Control.extend({
        options: {
            position: 'topright'
        },
        initialize: function initialize(options) {
            // set default options if nothing is set (merge one step deep)
            for (var i in options) {
                if (_typeof$1(this.options[i]) === 'object') {
                    L.extend(this.options[i], options[i]);
                } else {
                    this.options[i] = options[i];
                }
            }
        },

        onAdd: function onAdd(map) {
            var div = L.DomUtil.create('div');
            div.id = 'nlmaps-geolocator-control';
            div.className = 'nlmaps-geolocator-control';
            var img = document.createElement('img');
            div.append(img);
            if (this.options.geolocator.isStarted()) {
                L.DomUtil.addClass(div, 'started');
            }
            function moveMap(position) {
                map.panTo([position.coords.latitude, position.coords.longitude]);
            }
            L.DomEvent.on(div, 'click', function () {
                this.options.geolocator.start();
                L.DomUtil.addClass(div, 'started');
            }, this);
            this.options.geolocator.on('position', function (d) {
                L.DomUtil.removeClass(div, 'started');
                L.DomUtil.addClass(div, 'has-position');
                moveMap(d);
            });
            return div;
        },
        onRemove: function onRemove(map) {
            return map;
        }
    });

    L.geoLocatorControl = function (geolocator) {
        return new L.Control.GeoLocatorControl({ geolocator: geolocator });
    };
}
function markerLayer(latLngObject) {
    if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof$1(L)) === 'object') {
        var lat = void 0;
        var lng = void 0;
        // LatLngObject should always be defined when it is called from the main package.
        // eslint-disable-next-line eqeqeq
        if (typeof latLngObject == 'undefined') {
            var center = getMapCenter(map);
            lat = center.latitude;
            lng = center.longitude;
        } else {
            lat = latLngObject.latitude;
            lng = latLngObject.longitude;
        }
        return new L.marker([lat, lng], {
            alt: 'marker',
            icon: new L.icon({
                iconUrl: getMarker().url,
                iconSize: getMarker().iconSize,
                iconAnchor: getMarker().iconAnchor
            })
        });
    }
}

function bgLayer(name) {
    if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof$1(L)) === 'object') {
        return L.nlmapsBgLayer(name);
    }
}

function overlayLayer(name, options) {
    if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof$1(L)) === 'object') {
        return L.nlmapsOverlayLayer(name, options);
    }
}

function geoLocatorControl(geolocator) {
    if (typeof L !== 'undefined' && (typeof L === 'undefined' ? 'undefined' : _typeof$1(L)) === 'object') {
        return L.geoLocatorControl(geolocator);
    }
}
function zoomTo(point, map) {
    map.fitBounds(L.geoJSON(point).getBounds(), { maxZoom: 18 });
}

function geocoderControl(map) {
    var control = geocoder.createControl(zoomTo, map);
    map.getContainer().parentElement.appendChild(control);
}

function getMapCenter(map) {
    var latLngObject = map.getCenter();
    return {
        latitude: latLngObject.lat,
        longitude: latLngObject.lng
    };
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var nlmapsOpenlayers_cjs = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', { value: true });

    var config = {
        "version": 0.2,
        "basemaps": {
            "defaults": {
                "crs": "EPSG:3857",
                "attribution": "Kaartgegevens &copy; <a href='https://www.kadaster.nl'>Kadaster</a> | \
            <a href='https://www.verbeterdekaart.nl'>Verbeter de kaart</a>",
                "minZoom": 6,
                "maxZoom": 19,
                "type": "wmts",
                "format": "png",
                "url": "https://geodata.nationaalgeoregister.nl/tiles/service"
            },
            "layers": [{
                "name": "standaard",
                "layerName": "brtachtergrondkaart"
            }, {
                "name": "grijs",
                "layerName": "brtachtergrondkaartgrijs"
            }, {
                "name": "pastel",
                "layerName": "brtachtergrondkaartpastel"
            }, {
                "name": "luchtfoto",
                "layerName": "2016_ortho25",
                "url": "https://geodata.nationaalgeoregister.nl/luchtfoto/rgb",
                "format": "jpeg"
            }]
        },
        "wms": {
            "defaults": {
                "url": "https://geodata.nationaalgeoregister.nl/{workSpaceName}/wms?",
                "version": "1.1.1",
                "transparent": true,
                "format": "image/png",
                "minZoom": 0,
                "maxZoom": 24
            },
            "layers": [{
                "name": "gebouwen",
                "workSpaceName": "bag",
                "layerName": "pand"
            }, {
                "name": "percelen",
                "workSpaceName": "bkadastralekaartv3ag",
                "layerName": "kadastralekaart"
            }, {
                "name": "drone-no-fly-zones",
                "workSpaceName": "dronenoflyzones",
                "layerName": "luchtvaartgebieden,landingsite"
            }, {
                "name": "hoogte",
                "workSpaceName": "ahn2",
                "layerName": "ahn2_05m_int",
                "styleName": "ahn2:ahn2_05m_detail"
            }, {
                "name": "gemeenten",
                "workSpaceName": "bestuurlijkegrenzen",
                "layerName": "gemeenten",
                "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen"
            }, {
                "name": "provincies",
                "workSpaceName": "bestuurlijkegrenzen",
                "layerName": "provincies",
                "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen"
            }]
        },
        "geocoder": {
            "suggestUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?",
            "lookupUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?"
        },
        "map": {
            "style": 'standaard',
            "center": {
                "latitude": 52.093249,
                "longitude": 5.111994
            },
            "zoom": 8,
            "attribution": true,
            "extent": [-180, -90, 180, 90],
            "zoomposition": "topright"
        },
        "marker": {
            "url": "./assets/img/marker_icon.svg",
            "iconSize": [64, 64],
            "iconAnchor": [63, 32]
        },
        "classnames": {
            'geocoderContainer': ['nlmaps-geocoder-control-container'],
            'geocoderSearch': ['nlmaps-geocoder-control-search'],
            'geocoderButton': ['nlmaps-geocoder-control-button'],
            'geocoderResultList': ['nlmaps-geocoder-result-list'],
            'geocoderResultItem': ['nlmaps-geocoder-result-item']
        }
    };

    var CONFIG = {};

    CONFIG.BASE_DEFAULTS = {
        crs: "EPSG:3857",
        attr: "",
        minZoom: 0,
        maxZoom: 19,
        type: "wmts",
        format: "png",
        url: ""
    };
    CONFIG.WMS_DEFAULTS = {
        url: "",
        version: "1.1.1",
        transparent: true,
        format: "image/png",
        minZoom: 0,
        maxZoom: 24,
        styleName: ""
    };
    CONFIG.BASEMAP_PROVIDERS = {};
    CONFIG.WMS_PROVIDERS = {};
    CONFIG.GEOCODER = {};
    CONFIG.MAP = {
        "zoomposition": "bottomleft"
    };
    CONFIG.MARKER = {};
    CONFIG.CLASSNAMES = {
        'geocoderContainer': ['nlmaps-geocoder-control-container'],
        'geocoderSearch': ['nlmaps-geocoder-control-search'],
        'geocoderButton': ['nlmaps-geocoder-control-button'],
        'geocoderResultList': ['nlmaps-geocoder-result-list'],
        'geocoderResultItem': ['nlmaps-geocoder-result-item']
    };

    function err(err) {
        throw err;
    }

    if (config.version !== 0.2) {
        err('unsupported config version');
    }

    function mergeConfig(defaults$$1, config$$1) {
        return _extends({}, defaults$$1, config$$1);
    }

    function parseBase(basemaps) {
        var defaults$$1 = mergeConfig(CONFIG.BASE_DEFAULTS, basemaps.defaults);
        if (!basemaps.layers || basemaps.layers.length < 0) {
            err('no basemap defined, please define a basemap in the configuration');
        }
        basemaps.layers.forEach(function (layer) {
            if (!layer.name || CONFIG.BASEMAP_PROVIDERS[layer.name] !== undefined) {
                err('basemap names need to be defined and unique: ' + layer.name);
            }
            CONFIG.BASEMAP_PROVIDERS[layer.name] = formatBasemapUrl(mergeConfig(defaults$$1, layer));
        });
    }
    function parseWMS(wms) {
        var defaults$$1 = mergeConfig(CONFIG.WMS_DEFAULTS, wms.defaults);
        if (wms.layers) {
            wms.layers.forEach(function (layer) {
                if (!layer.name || CONFIG.WMS_PROVIDERS[layer.name] !== undefined) {
                    err('wms names need to be defined and unique: ' + layer.name);
                }
                CONFIG.WMS_PROVIDERS[layer.name] = applyTemplate(mergeConfig(defaults$$1, layer));
            });
        }
    }
    function parseGeocoder(geocoder) {
        CONFIG.GEOCODER.lookupUrl = geocoder.lookupUrl;
        CONFIG.GEOCODER.suggestUrl = geocoder.suggestUrl;
    }
    function parseMap(map) {
        CONFIG.MAP = mergeConfig(CONFIG.MAP, map);
    }

    function formatBasemapUrl(layer) {
        switch (layer.type) {
            case 'wmts':
                layer.url = layer.url + "/" + layer.type + "/" + layer.layerName + "/" + layer.crs + "/{z}/{x}/{y}." + layer.format;
                break;
            case 'tms':
                layer.url = layer.url + "/" + layer.layerName + "/{z}/{x}/{y}." + layer.format;
                break;
            default:
                layer.url = layer.url + "/" + layer.type + "/" + layer.layerName + "/" + layer.crs + "/{z}/{x}/{y}." + layer.format;
        }
        return layer;
    }

    function applyTemplate(layer) {
        //Check if the url is templated
        var start = layer.url.indexOf('{');
        if (start > -1) {
            var end = layer.url.indexOf('}');
            var template = layer.url.slice(start + 1, end);
            if (template.toLowerCase() === "workspacename") {
                layer.url = layer.url.slice(0, start) + layer.workSpaceName + layer.url.slice(end + 1, -1);
            } else {
                err('only workspacename templates are supported for now');
            }
        }
        return layer;
    }

    function parseFeatureQuery(baseUrl) {
        CONFIG.FEATUREQUERYBASEURL = baseUrl;
    }

    function parseClasses(classes) {
        CONFIG.CLASSNAMES = mergeConfig(CONFIG.CLASSNAMES, classes);
    }

    function parseMarker(marker) {
        CONFIG.MARKER = marker;
    }

    if (config.featureQuery !== undefined) parseFeatureQuery(config.featureQuery.baseUrl);
    if (config.map !== undefined) parseMap(config.map);
    parseBase(config.basemaps);
    if (config.wms !== undefined) parseWMS(config.wms);
    if (config.geocoder !== undefined) parseGeocoder(config.geocoder);
    if (config.marker !== undefined) parseMarker(config.marker);
    if (config.classnames !== undefined) parseClasses(config.classnames);

    var geocoder = CONFIG.GEOCODER;

    function httpGetAsync(url) {
        // eslint-disable-next-line no-unused-vars
        return new Promise(function (resolve, reject) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                // eslint-disable-next-line eqeqeq
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    resolve(JSON.parse(xmlHttp.responseText));
                }
            };
            xmlHttp.open("GET", url, true); // true for asynchronous
            xmlHttp.send(null);
        });
    }

    function wktPointToGeoJson(wktPoint) {
        if (!wktPoint.includes('POINT')) {
            throw TypeError('Provided WKT geometry is not a point.');
        }
        var coordinateTuple = wktPoint.split('(')[1].split(')')[0];
        var x = parseFloat(coordinateTuple.split(' ')[0]);
        var y = parseFloat(coordinateTuple.split(' ')[1]);

        return {
            type: 'Point',
            coordinates: [x, y]
        };
    }

    /**
     * Make a call to PDOK locatieserver v3 suggest service. This service is meant for geocoder autocomplete functionality. For
     * additional documentation, check https://github.com/PDOK/locatieserver/wiki/API-Locatieserver.
     * @param {string} searchTerm The term which to search for
     */
    geocoder.doSuggestRequest = function (searchTerm) {
        return httpGetAsync(this.suggestUrl + 'q=' + encodeURIComponent(searchTerm));
    };

    /**
     * Make a call to PDOK locatieserver v3 lookup service. This service provides information about objects found through the suggest service. For additional
     * documentation, check: https://github.com/PDOK/locatieserver/wiki/API-Locatieserver
     * @param {string} id The id of the feature that is to be looked up.
     */
    geocoder.doLookupRequest = function (id) {
        return httpGetAsync(this.lookupUrl + 'id=' + encodeURIComponent(id)).then(function (lookupResult) {
            // A lookup request should always return 1 result
            var geocodeResult = lookupResult.response.docs[0];
            geocodeResult.centroide_ll = wktPointToGeoJson(geocodeResult.centroide_ll);
            geocodeResult.centroide_rd = wktPointToGeoJson(geocodeResult.centroide_rd);
            return geocodeResult;
        });
    };

    geocoder.createControl = function (zoomFunction, map) {
        var _this = this;

        this.zoomTo = zoomFunction;
        this.map = map;
        var container = document.createElement('div');
        parseClasses$1(container, CONFIG.CLASSNAMES.geocoderContainer);
        var searchDiv = document.createElement('form');
        var input = document.createElement('input');
        var button = document.createElement('button');
        var results = document.createElement('div');
        parseClasses$1(searchDiv, CONFIG.CLASSNAMES.geocoderSearch);
        container.addEventListener('click', function (e) {
            return e.stopPropagation();
        });
        container.addEventListener('dblclick', function (e) {
            return e.stopPropagation();
        });
        input.id = 'nlmaps-geocoder-control-input';
        input.placeholder = 'Zoomen naar adres...';
        input.setAttribute('aria-label', 'Zoomen naar adres');
        input.setAttribute('type', 'text');
        input.setAttribute('autocapitalize', 'off');
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('spellcheck', 'false');

        input.addEventListener('input', function (e) {
            _this.suggest(e.target.value);
        });

        input.addEventListener('focus', function (e) {
            _this.suggest(e.target.value);
        });
        button.setAttribute('type', 'submit');
        searchDiv.addEventListener('submit', function (e) {
            e.preventDefault();
            if (_this.results.length > 0) {
                _this.lookup(_this.results[0]);
            }
        });
        button.setAttribute('aria-label', 'Zoomen naar adres');
        parseClasses$1(button, CONFIG.CLASSNAMES.geocoderButton);

        results.id = 'nlmaps-geocoder-control-results';
        parseClasses$1(results, CONFIG.CLASSNAMES.geocoderResultList);
        results.classList.add('nlmaps-hidden');
        container.appendChild(searchDiv);
        searchDiv.appendChild(input);
        searchDiv.appendChild(button);
        container.appendChild(results);

        return container;
    };

    geocoder.suggest = function (query) {
        var _this2 = this;

        if (query.length < 3) {
            this.clearSuggestResults();
            return;
        }

        this.doSuggestRequest(query).then(function (results) {
            _this2.results = results.response.docs.map(function (r) {
                return r.id;
            });
            _this2.showSuggestResults(results.response.docs);
        });
    };

    geocoder.lookup = function (id) {
        var _this3 = this;

        this.doLookupRequest(id).then(function (result) {
            _this3.zoomTo(result.centroide_ll, _this3.map);
            _this3.showLookupResult(result.weergavenaam);
            _this3.clearSuggestResults();
        });
    };

    geocoder.clearSuggestResults = function () {
        document.getElementById('nlmaps-geocoder-control-results').innerHTML = '';
        document.getElementById('nlmaps-geocoder-control-results').classList.add('nlmaps-hidden');
    };

    geocoder.showLookupResult = function (name) {
        document.getElementById('nlmaps-geocoder-control-input').value = name;
    };

    function parseClasses$1(el, classes) {
        classes.forEach(function (classname) {
            el.classList.add(classname);
        });
    }

    geocoder.showSuggestResults = function (results) {
        var _this4 = this;

        this.clearSuggestResults();
        if (results.length > 0) {
            var resultList = document.createElement('ul');
            results.forEach(function (result) {

                var li = document.createElement('li');
                var a = document.createElement('a');
                a.innerHTML = result.weergavenaam;
                a.id = result.id;
                parseClasses$1(a, CONFIG.CLASSNAMES.geocoderResultItem);
                a.setAttribute('href', '#');
                a.addEventListener('click', function (e) {
                    e.preventDefault();
                    _this4.lookup(e.target.id);
                });
                li.appendChild(a);
                resultList.appendChild(li);
            });
            document.getElementById('nlmaps-geocoder-control-results').classList.remove('nlmaps-hidden');
            document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
        }
    };

    /*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
     * copyright (c) 2012, Stamen Design
     * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
     */

    function getMarker() {
        return CONFIG.MARKER;
    }

    /*
     * Get the named provider, or throw an exception if it doesn't exist.
     **/
    function getProvider(name) {
        if (name in CONFIG.BASEMAP_PROVIDERS) {
            var provider = CONFIG.BASEMAP_PROVIDERS[name];

            // eslint-disable-next-line no-console
            if (provider.deprecated && console && console.warn) {
                // eslint-disable-next-line no-console
                console.warn(name + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.");
            }

            return provider;
        } else {
            // eslint-disable-next-line no-console
            console.error('NL Maps error: You asked for a style which does not exist! Available styles: ' + Object.keys(PROVIDERS).join(', '));
        }
    }

    /*
     * Get the named wmsProvider, or throw an exception if it doesn't exist.
     **/
    function getWmsProvider(name, options) {
        var wmsProvider = void 0;
        if (name in CONFIG.WMS_PROVIDERS) {
            wmsProvider = CONFIG.WMS_PROVIDERS[name];

            // eslint-disable-next-line no-console
            if (wmsProvider.deprecated && console && console.warn) {
                // eslint-disable-next-line no-console
                console.warn(name + " is a deprecated wms; it will be redirected to its replacement. For performance improvements, please change your reference.");
            }
        } else {
            wmsProvider = _extends({}, CONFIG.WMS_DEFAULTS, options);
            // eslint-disable-next-line no-console
            console.log('NL Maps: You asked for a wms which does not exist! Available wmses: ' + Object.keys(CONFIG.WMS_PROVIDERS).join(', ') + '. Provide an options object to make your own WMS.');
        }
        return wmsProvider;
    }

    var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    };

    function bgLayer() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'standaard';

        var provider = getProvider(name);
        //replace leaflet style subdomain to OL style
        if (provider.subdomains) {
            var sub = provider.subdomains;
            provider.url = provider.url.replace('{s}', '{' + sub.slice(0, 1) + '-' + sub.slice(-1) + '}');
        }
        if ((typeof ol === 'undefined' ? 'undefined' : _typeof$$1(ol)) === "object") {
            return new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: provider.url,
                    attributions: [new ol.Attribution({
                        html: provider.attribution
                    })]
                })
            });
        } else {
            throw 'openlayers is not defined';
        }
    }
    function markerLayer(latLngObject) {
        var markerStyle = new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [32, 63],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                src: getMarker().url,
                scale: 1
            })
        });
        var lat = void 0;
        var lng = void 0;

        // eslint-disable-next-line eqeqeq
        if (typeof latLngObject == 'undefined') {
            var mapCenter = getMapCenter(map);
            lat = mapCenter.latitude;
            lng = mapCenter.longitude;
        } else {
            lat = latLngObject.latitude;
            lng = latLngObject.longitude;
        }

        var center = ol.proj.fromLonLat([lng, lat]);

        var markerFeature = new ol.Feature({
            geometry: new ol.geom.Point(center),
            name: 'marker'
        });

        markerFeature.setStyle(markerStyle);

        var markerSource = new ol.source.Vector({
            features: [markerFeature]
        });
        return new ol.layer.Vector({
            source: markerSource
        });
    }

    function overlayLayer(name, options) {
        var wmsProvider = getWmsProvider(name, options);
        if ((typeof ol === 'undefined' ? 'undefined' : _typeof$$1(ol)) === "object") {
            return new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: wmsProvider.url,
                    serverType: 'geoserver',
                    params: {
                        LAYERS: wmsProvider.layerName,
                        VERSION: wmsProvider.version,
                        STYLES: wmsProvider.styleName
                    }
                })
            });
        } else {
            throw 'openlayers is not defined';
        }
    }

    function geoLocatorControl(geolocator, map) {
        var myControlEl = document.createElement('div');
        myControlEl.className = 'nlmaps-geolocator-control ol-control';

        myControlEl.addEventListener('click', function () {
            geolocator.start();
        });

        function moveMap(d) {
            var map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : map;

            var oldZoom = map.getView().getZoom();
            var view = new ol.View({
                center: ol.proj.fromLonLat([d.coords.longitude, d.coords.latitude]),
                zoom: oldZoom
            });
            map.setView(view);
        }
        geolocator.on('position', function (d) {
            moveMap(d, map);
        });
        var control = new ol.control.Control({ element: myControlEl });
        return control;
    }

    function zoomTo(point, map) {
        var newCenter = ol.proj.fromLonLat(point.coordinates);
        map.getView().setCenter(newCenter);
        map.getView().setZoom(18);
    }

    function getMapCenter(map) {
        var EPSG3857Coords = map.getView().getCenter();
        var lngLatCoords = ol.proj.toLonLat(EPSG3857Coords);
        return {
            longitude: lngLatCoords[0],
            latitude: lngLatCoords[1]
        };
    }

    function geocoderControl(map) {
        var control = geocoder.createControl(zoomTo, map);
        control = new ol.control.Control({ element: control });
        map.addControl(control);
    }

    exports.bgLayer = bgLayer;
    exports.overlayLayer = overlayLayer;
    exports.markerLayer = markerLayer;
    exports.getMapCenter = getMapCenter;
    exports.geoLocatorControl = geoLocatorControl;
    exports.geocoderControl = geocoderControl;
    
});

unwrapExports(nlmapsOpenlayers_cjs);
var nlmapsOpenlayers_cjs_1 = nlmapsOpenlayers_cjs.bgLayer;
var nlmapsOpenlayers_cjs_2 = nlmapsOpenlayers_cjs.overlayLayer;
var nlmapsOpenlayers_cjs_3 = nlmapsOpenlayers_cjs.markerLayer;
var nlmapsOpenlayers_cjs_4 = nlmapsOpenlayers_cjs.getMapCenter;
var nlmapsOpenlayers_cjs_5 = nlmapsOpenlayers_cjs.geoLocatorControl;
var nlmapsOpenlayers_cjs_6 = nlmapsOpenlayers_cjs.geocoderControl;

var nlmapsGooglemaps_cjs = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', { value: true });

    var config = {
        "version": 0.2,
        "basemaps": {
            "defaults": {
                "crs": "EPSG:3857",
                "attribution": "Kaartgegevens &copy; <a href='https://www.kadaster.nl'>Kadaster</a> | \
            <a href='https://www.verbeterdekaart.nl'>Verbeter de kaart</a>",
                "minZoom": 6,
                "maxZoom": 19,
                "type": "wmts",
                "format": "png",
                "url": "https://geodata.nationaalgeoregister.nl/tiles/service"
            },
            "layers": [{
                "name": "standaard",
                "layerName": "brtachtergrondkaart"
            }, {
                "name": "grijs",
                "layerName": "brtachtergrondkaartgrijs"
            }, {
                "name": "pastel",
                "layerName": "brtachtergrondkaartpastel"
            }, {
                "name": "luchtfoto",
                "layerName": "2016_ortho25",
                "url": "https://geodata.nationaalgeoregister.nl/luchtfoto/rgb",
                "format": "jpeg"
            }]
        },
        "wms": {
            "defaults": {
                "url": "https://geodata.nationaalgeoregister.nl/{workSpaceName}/wms?",
                "version": "1.1.1",
                "transparent": true,
                "format": "image/png",
                "minZoom": 0,
                "maxZoom": 24
            },
            "layers": [{
                "name": "gebouwen",
                "workSpaceName": "bag",
                "layerName": "pand"
            }, {
                "name": "percelen",
                "workSpaceName": "bkadastralekaartv3ag",
                "layerName": "kadastralekaart"
            }, {
                "name": "drone-no-fly-zones",
                "workSpaceName": "dronenoflyzones",
                "layerName": "luchtvaartgebieden,landingsite"
            }, {
                "name": "hoogte",
                "workSpaceName": "ahn2",
                "layerName": "ahn2_05m_int",
                "styleName": "ahn2:ahn2_05m_detail"
            }, {
                "name": "gemeenten",
                "workSpaceName": "bestuurlijkegrenzen",
                "layerName": "gemeenten",
                "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen"
            }, {
                "name": "provincies",
                "workSpaceName": "bestuurlijkegrenzen",
                "layerName": "provincies",
                "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen"
            }]
        },
        "geocoder": {
            "suggestUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?",
            "lookupUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?"
        },
        "map": {
            "style": 'standaard',
            "center": {
                "latitude": 52.093249,
                "longitude": 5.111994
            },
            "zoom": 8,
            "attribution": true,
            "extent": [-180, -90, 180, 90],
            "zoomposition": "topright"
        },
        "marker": {
            "url": "./assets/img/marker_icon.svg",
            "iconSize": [64, 64],
            "iconAnchor": [63, 32]
        },
        "classnames": {
            'geocoderContainer': ['nlmaps-geocoder-control-container'],
            'geocoderSearch': ['nlmaps-geocoder-control-search'],
            'geocoderButton': ['nlmaps-geocoder-control-button'],
            'geocoderResultList': ['nlmaps-geocoder-result-list'],
            'geocoderResultItem': ['nlmaps-geocoder-result-item']
        }
    };

    var CONFIG = {};

    CONFIG.BASE_DEFAULTS = {
        crs: "EPSG:3857",
        attr: "",
        minZoom: 0,
        maxZoom: 19,
        type: "wmts",
        format: "png",
        url: ""
    };
    CONFIG.WMS_DEFAULTS = {
        url: "",
        version: "1.1.1",
        transparent: true,
        format: "image/png",
        minZoom: 0,
        maxZoom: 24,
        styleName: ""
    };
    CONFIG.BASEMAP_PROVIDERS = {};
    CONFIG.WMS_PROVIDERS = {};
    CONFIG.GEOCODER = {};
    CONFIG.MAP = {
        "zoomposition": "bottomleft"
    };
    CONFIG.MARKER = {};
    CONFIG.CLASSNAMES = {
        'geocoderContainer': ['nlmaps-geocoder-control-container'],
        'geocoderSearch': ['nlmaps-geocoder-control-search'],
        'geocoderButton': ['nlmaps-geocoder-control-button'],
        'geocoderResultList': ['nlmaps-geocoder-result-list'],
        'geocoderResultItem': ['nlmaps-geocoder-result-item']
    };

    function err(err) {
        throw err;
    }

    if (config.version !== 0.2) {
        err('unsupported config version');
    }

    function mergeConfig(defaults$$1, config$$1) {
        return _extends({}, defaults$$1, config$$1);
    }

    function parseBase(basemaps) {
        var defaults$$1 = mergeConfig(CONFIG.BASE_DEFAULTS, basemaps.defaults);
        if (!basemaps.layers || basemaps.layers.length < 0) {
            err('no basemap defined, please define a basemap in the configuration');
        }
        basemaps.layers.forEach(function (layer) {
            if (!layer.name || CONFIG.BASEMAP_PROVIDERS[layer.name] !== undefined) {
                err('basemap names need to be defined and unique: ' + layer.name);
            }
            CONFIG.BASEMAP_PROVIDERS[layer.name] = formatBasemapUrl(mergeConfig(defaults$$1, layer));
        });
    }
    function parseWMS(wms) {
        var defaults$$1 = mergeConfig(CONFIG.WMS_DEFAULTS, wms.defaults);
        if (wms.layers) {
            wms.layers.forEach(function (layer) {
                if (!layer.name || CONFIG.WMS_PROVIDERS[layer.name] !== undefined) {
                    err('wms names need to be defined and unique: ' + layer.name);
                }
                CONFIG.WMS_PROVIDERS[layer.name] = applyTemplate(mergeConfig(defaults$$1, layer));
            });
        }
    }
    function parseGeocoder(geocoder) {
        CONFIG.GEOCODER.lookupUrl = geocoder.lookupUrl;
        CONFIG.GEOCODER.suggestUrl = geocoder.suggestUrl;
    }
    function parseMap(map) {
        CONFIG.MAP = mergeConfig(CONFIG.MAP, map);
    }

    function formatBasemapUrl(layer) {
        switch (layer.type) {
            case 'wmts':
                layer.url = layer.url + "/" + layer.type + "/" + layer.layerName + "/" + layer.crs + "/{z}/{x}/{y}." + layer.format;
                break;
            case 'tms':
                layer.url = layer.url + "/" + layer.layerName + "/{z}/{x}/{y}." + layer.format;
                break;
            default:
                layer.url = layer.url + "/" + layer.type + "/" + layer.layerName + "/" + layer.crs + "/{z}/{x}/{y}." + layer.format;
        }
        return layer;
    }

    function applyTemplate(layer) {
        //Check if the url is templated
        var start = layer.url.indexOf('{');
        if (start > -1) {
            var end = layer.url.indexOf('}');
            var template = layer.url.slice(start + 1, end);
            if (template.toLowerCase() === "workspacename") {
                layer.url = layer.url.slice(0, start) + layer.workSpaceName + layer.url.slice(end + 1, -1);
            } else {
                err('only workspacename templates are supported for now');
            }
        }
        return layer;
    }

    function parseFeatureQuery(baseUrl) {
        CONFIG.FEATUREQUERYBASEURL = baseUrl;
    }

    function parseClasses(classes) {
        CONFIG.CLASSNAMES = mergeConfig(CONFIG.CLASSNAMES, classes);
    }

    function parseMarker(marker) {
        CONFIG.MARKER = marker;
    }

    if (config.featureQuery !== undefined) parseFeatureQuery(config.featureQuery.baseUrl);
    if (config.map !== undefined) parseMap(config.map);
    parseBase(config.basemaps);
    if (config.wms !== undefined) parseWMS(config.wms);
    if (config.geocoder !== undefined) parseGeocoder(config.geocoder);
    if (config.marker !== undefined) parseMarker(config.marker);
    if (config.classnames !== undefined) parseClasses(config.classnames);

    var geocoder = CONFIG.GEOCODER;

    function httpGetAsync(url) {
        // eslint-disable-next-line no-unused-vars
        return new Promise(function (resolve, reject) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                // eslint-disable-next-line eqeqeq
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    resolve(JSON.parse(xmlHttp.responseText));
                }
            };
            xmlHttp.open("GET", url, true); // true for asynchronous
            xmlHttp.send(null);
        });
    }

    function wktPointToGeoJson(wktPoint) {
        if (!wktPoint.includes('POINT')) {
            throw TypeError('Provided WKT geometry is not a point.');
        }
        var coordinateTuple = wktPoint.split('(')[1].split(')')[0];
        var x = parseFloat(coordinateTuple.split(' ')[0]);
        var y = parseFloat(coordinateTuple.split(' ')[1]);

        return {
            type: 'Point',
            coordinates: [x, y]
        };
    }

    /**
     * Make a call to PDOK locatieserver v3 suggest service. This service is meant for geocoder autocomplete functionality. For
     * additional documentation, check https://github.com/PDOK/locatieserver/wiki/API-Locatieserver.
     * @param {string} searchTerm The term which to search for
     */
    geocoder.doSuggestRequest = function (searchTerm) {
        return httpGetAsync(this.suggestUrl + 'q=' + encodeURIComponent(searchTerm));
    };

    /**
     * Make a call to PDOK locatieserver v3 lookup service. This service provides information about objects found through the suggest service. For additional
     * documentation, check: https://github.com/PDOK/locatieserver/wiki/API-Locatieserver
     * @param {string} id The id of the feature that is to be looked up.
     */
    geocoder.doLookupRequest = function (id) {
        return httpGetAsync(this.lookupUrl + 'id=' + encodeURIComponent(id)).then(function (lookupResult) {
            // A lookup request should always return 1 result
            var geocodeResult = lookupResult.response.docs[0];
            geocodeResult.centroide_ll = wktPointToGeoJson(geocodeResult.centroide_ll);
            geocodeResult.centroide_rd = wktPointToGeoJson(geocodeResult.centroide_rd);
            return geocodeResult;
        });
    };

    geocoder.createControl = function (zoomFunction, map) {
        var _this = this;

        this.zoomTo = zoomFunction;
        this.map = map;
        var container = document.createElement('div');
        parseClasses$1(container, CONFIG.CLASSNAMES.geocoderContainer);
        var searchDiv = document.createElement('form');
        var input = document.createElement('input');
        var button = document.createElement('button');
        var results = document.createElement('div');
        parseClasses$1(searchDiv, CONFIG.CLASSNAMES.geocoderSearch);
        container.addEventListener('click', function (e) {
            return e.stopPropagation();
        });
        container.addEventListener('dblclick', function (e) {
            return e.stopPropagation();
        });
        input.id = 'nlmaps-geocoder-control-input';
        input.placeholder = 'Zoomen naar adres...';
        input.setAttribute('aria-label', 'Zoomen naar adres');
        input.setAttribute('type', 'text');
        input.setAttribute('autocapitalize', 'off');
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('spellcheck', 'false');

        input.addEventListener('input', function (e) {
            _this.suggest(e.target.value);
        });

        input.addEventListener('focus', function (e) {
            _this.suggest(e.target.value);
        });
        button.setAttribute('type', 'submit');
        searchDiv.addEventListener('submit', function (e) {
            e.preventDefault();
            if (_this.results.length > 0) {
                _this.lookup(_this.results[0]);
            }
        });
        button.setAttribute('aria-label', 'Zoomen naar adres');
        parseClasses$1(button, CONFIG.CLASSNAMES.geocoderButton);

        results.id = 'nlmaps-geocoder-control-results';
        parseClasses$1(results, CONFIG.CLASSNAMES.geocoderResultList);
        results.classList.add('nlmaps-hidden');
        container.appendChild(searchDiv);
        searchDiv.appendChild(input);
        searchDiv.appendChild(button);
        container.appendChild(results);

        return container;
    };

    geocoder.suggest = function (query) {
        var _this2 = this;

        if (query.length < 3) {
            this.clearSuggestResults();
            return;
        }

        this.doSuggestRequest(query).then(function (results) {
            _this2.results = results.response.docs.map(function (r) {
                return r.id;
            });
            _this2.showSuggestResults(results.response.docs);
        });
    };

    geocoder.lookup = function (id) {
        var _this3 = this;

        this.doLookupRequest(id).then(function (result) {
            _this3.zoomTo(result.centroide_ll, _this3.map);
            _this3.showLookupResult(result.weergavenaam);
            _this3.clearSuggestResults();
        });
    };

    geocoder.clearSuggestResults = function () {
        document.getElementById('nlmaps-geocoder-control-results').innerHTML = '';
        document.getElementById('nlmaps-geocoder-control-results').classList.add('nlmaps-hidden');
    };

    geocoder.showLookupResult = function (name) {
        document.getElementById('nlmaps-geocoder-control-input').value = name;
    };

    function parseClasses$1(el, classes) {
        classes.forEach(function (classname) {
            el.classList.add(classname);
        });
    }

    geocoder.showSuggestResults = function (results) {
        var _this4 = this;

        this.clearSuggestResults();
        if (results.length > 0) {
            var resultList = document.createElement('ul');
            results.forEach(function (result) {

                var li = document.createElement('li');
                var a = document.createElement('a');
                a.innerHTML = result.weergavenaam;
                a.id = result.id;
                parseClasses$1(a, CONFIG.CLASSNAMES.geocoderResultItem);
                a.setAttribute('href', '#');
                a.addEventListener('click', function (e) {
                    e.preventDefault();
                    _this4.lookup(e.target.id);
                });
                li.appendChild(a);
                resultList.appendChild(li);
            });
            document.getElementById('nlmaps-geocoder-control-results').classList.remove('nlmaps-hidden');
            document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
        }
    };

    /*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
     * copyright (c) 2012, Stamen Design
     * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
     */

    function getMarker() {
        return CONFIG.MARKER;
    }

    /*
     * Get the named provider, or throw an exception if it doesn't exist.
     **/
    function getProvider(name) {
        if (name in CONFIG.BASEMAP_PROVIDERS) {
            var provider = CONFIG.BASEMAP_PROVIDERS[name];

            // eslint-disable-next-line no-console
            if (provider.deprecated && console && console.warn) {
                // eslint-disable-next-line no-console
                console.warn(name + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.");
            }

            return provider;
        } else {
            // eslint-disable-next-line no-console
            console.error('NL Maps error: You asked for a style which does not exist! Available styles: ' + Object.keys(PROVIDERS).join(', '));
        }
    }

    /*
     * Get the named wmsProvider, or throw an exception if it doesn't exist.
     **/
    function getWmsProvider(name, options) {
        var wmsProvider = void 0;
        if (name in CONFIG.WMS_PROVIDERS) {
            wmsProvider = CONFIG.WMS_PROVIDERS[name];

            // eslint-disable-next-line no-console
            if (wmsProvider.deprecated && console && console.warn) {
                // eslint-disable-next-line no-console
                console.warn(name + " is a deprecated wms; it will be redirected to its replacement. For performance improvements, please change your reference.");
            }
        } else {
            wmsProvider = _extends({}, CONFIG.WMS_DEFAULTS, options);
            // eslint-disable-next-line no-console
            console.log('NL Maps: You asked for a wms which does not exist! Available wmses: ' + Object.keys(CONFIG.WMS_PROVIDERS).join(', ') + '. Provide an options object to make your own WMS.');
        }
        return wmsProvider;
    }

    var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    };

    function AttributionControl(controlDiv, attrControlText) {
        if ((typeof google === 'undefined' ? 'undefined' : _typeof$$1(google)) === 'object' && _typeof$$1(google.maps) === 'object') {
            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = '#fff';
            controlUI.style.opacity = '0.7';
            controlUI.style.border = '2px solid #fff';
            controlUI.style.cursor = 'pointer';
            controlDiv.appendChild(controlUI);

            // Set CSS for the control interior.
            var controlText = document.createElement('div');
            controlText.style.color = 'rgb(25,25,25)';
            controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
            controlText.style.fontSize = '10px';
            controlText.innerHTML = attrControlText;
            controlUI.appendChild(controlText);

            controlDiv.index = 1;
            return controlDiv;
        } else {
            var error = 'google is not defined';
            throw error;
        }
    }

    function geoLocatorControl(geolocator, map) {
        var controlUI = document.createElement('div');
        controlUI.id = 'nlmaps-geolocator-control';
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.cursor = 'pointer';
        controlUI.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.65)';
        controlUI.style.height = '26px';
        controlUI.style.width = '26px';
        controlUI.style.borderRadius = '26px 26px';
        controlUI.style.margin = '.5em';
        controlUI.addEventListener('click', function () {
            geolocator.start();
        }, this);
        geolocator.on('position', function (position) {
            map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
        });
        return controlUI;
    }

    function zoomTo(point, map) {
        map.setCenter({ lat: point.coordinates[1], lng: point.coordinates[0] });
        map.setZoom(18);
    }

    function indexOfMapControl(controlArray, control) {
        return controlArray.getArray().indexOf(control);
    }

    function toggleAttrControl(attrControl, map) {
        var currentMapId = map.getMapTypeId();
        var controlArray = map.controls[google.maps.ControlPosition.BOTTOM_RIGHT];
        var indexToRemove = indexOfMapControl(controlArray, attrControl);
        if (currentMapId === 'roadmap' || currentMapId === 'hybrid' || currentMapId === 'sattelite') {
            if (indexToRemove > -1) {
                controlArray.removeAt(indexToRemove);
            }
        } else {
            if (indexToRemove === -1) {
                controlArray.push(attrControl);
            }
        }
    }

    function makeGoogleAttrControl() {
        var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : map;
        var attr = arguments[1];

        var attrControlDiv = document.createElement('div');
        var attrControlText = attr;
        var attrControl = new AttributionControl(attrControlDiv, attrControlText);
        map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(attrControl);
        map.addListener('maptypeid_changed', function () {
            return toggleAttrControl(attrControl, map);
        });
    }

    function makeGoogleLayerOpts(provider) {
        return {
            getTileUrl: function getTileUrl(coord, zoom) {
                var url = provider.bare_url + '/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
                return url;
            },
            tileSize: new google.maps.Size(256, 256),
            isPng: true,
            name: provider.name,
            maxZoom: provider.maxZoom,
            minZoom: provider.minZoom
        };
    }

    function getWmsTiledOptions(wmsProvider) {
        return {
            baseUrl: wmsProvider.url,
            layers: wmsProvider.layers,
            styles: wmsProvider.styles,
            format: wmsProvider.format,
            transparent: wmsProvider.transparent,
            // todo maybe: add opacity to wmsProvider params
            opacity: 0.7
        };
    }

    function bgLayer(map) {
        var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'standaard';

        if ((typeof google === 'undefined' ? 'undefined' : _typeof$$1(google)) === 'object' && _typeof$$1(google.maps) === 'object') {
            var provider = getProvider(name);
            var GoogleLayerOpts = makeGoogleLayerOpts(provider);
            var layer = new google.maps.ImageMapType(GoogleLayerOpts);
            // warning: tight coupling with nlmaps.createMap
            var ourmap = map || this.map || 'undefined';
            if (typeof ourmap !== 'undefined') {
                makeGoogleAttrControl(ourmap, provider.attribution);
            }
            return layer;
        } else {
            var error = 'google is not defined';
            throw error;
        }
    }

    function toMercator(coord) {
        var lat = coord.lat();
        var lng = coord.lng();
        if (Math.abs(lng) > 180 || Math.abs(lat) > 90) return;

        var num = lng * 0.017453292519943295;
        var x = 6378137.0 * num;
        var a = lat * 0.017453292519943295;

        var merc_lon = x;
        var merc_lat = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));

        return { x: merc_lon, y: merc_lat };
    }

    function WMSTiled(mapObject, wmsTiledOptions) {
        var options = {
            getTileUrl: function getTileUrl(coord, zoom) {
                var proj = mapObject.getProjection();
                var zfactor = Math.pow(2, zoom);

                var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 256 / zfactor, coord.y * 256 / zfactor));
                var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 256 / zfactor, (coord.y + 1) * 256 / zfactor));

                var ne = toMercator(top);
                var sw = toMercator(bot);
                var bbox = ne.x + ',' + sw.y + ',' + sw.x + ',' + ne.y;

                var url = wmsTiledOptions.baseUrl;
                url += 'SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:3857';
                url += '&WIDTH=256';
                url += '&HEIGHT=256';
                url += '&LAYERS=' + wmsTiledOptions.layers;
                url += '&STYLES=' + wmsTiledOptions.styles;
                url += '&BBOX=' + bbox;
                url += '&FORMAT=' + wmsTiledOptions.format;
                url += '&TRANSPARENT=' + wmsTiledOptions.transparent;
                return url;
            },
            tileSize: new google.maps.Size(256, 256),
            isPng: true
        };
        var layer = new google.maps.ImageMapType(options);
        layer.setOpacity(wmsTiledOptions.opacity);
        return mapObject.overlayMapTypes.push(layer);
    }

    function overlayLayer() {
        var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : map;
        var name = arguments[1];
        var options = arguments[2];

        var wmsProvider = getWmsProvider(name, options);
        var wmsTiledOptions = getWmsTiledOptions(wmsProvider);
        var wmsLayer = new WMSTiled(map, wmsTiledOptions);
        wmsLayer.name = 'wms';

        return wmsLayer;
    }

    function markerLayer(latLngObject) {
        var lat = void 0;
        var lng = void 0;
        // eslint-disable-next-line eqeqeq
        if (typeof latLngObject == 'undefined') {
            var mapCenter = getMapCenter(map);
            lat = mapCenter.latitude;
            lng = mapCenter.longitude;
        } else {
            lat = latLngObject.latitude;
            lng = latLngObject.longitude;
        }

        var markerLocationLatLng = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
            title: 'marker',
            position: markerLocationLatLng,
            icon: getMarker().url
        });
        return marker;
    }

    function getMapCenter(map) {
        return {
            latitude: map.getCenter().lat(),
            longitude: map.getCenter().lng()
        };
    }

    function geocoderControl(map) {
        var control = geocoder.createControl(zoomTo, map);
        map.getDiv().appendChild(control);
    }

    exports.bgLayer = bgLayer;
    exports.overlayLayer = overlayLayer;
    exports.markerLayer = markerLayer;
    exports.getMapCenter = getMapCenter;
    exports.geoLocatorControl = geoLocatorControl;
    exports.geocoderControl = geocoderControl;
    
});

unwrapExports(nlmapsGooglemaps_cjs);
var nlmapsGooglemaps_cjs_1 = nlmapsGooglemaps_cjs.bgLayer;
var nlmapsGooglemaps_cjs_2 = nlmapsGooglemaps_cjs.overlayLayer;
var nlmapsGooglemaps_cjs_3 = nlmapsGooglemaps_cjs.markerLayer;
var nlmapsGooglemaps_cjs_4 = nlmapsGooglemaps_cjs.getMapCenter;
var nlmapsGooglemaps_cjs_5 = nlmapsGooglemaps_cjs.geoLocatorControl;
var nlmapsGooglemaps_cjs_6 = nlmapsGooglemaps_cjs.geocoderControl;

var config$1 = {
    "version": 0.2,
    "basemaps": {
        "defaults": {
            "crs": "EPSG:3857",
            "attribution": "Kaartgegevens &copy; <a href='https://www.kadaster.nl'>Kadaster</a> | \
            <a href='https://www.verbeterdekaart.nl'>Verbeter de kaart</a>",
            "minZoom": 6,
            "maxZoom": 19,
            "type": "wmts",
            "format": "png",
            "url": "https://geodata.nationaalgeoregister.nl/tiles/service"
        },
        "layers": [{
            "name": "standaard",
            "layerName": "brtachtergrondkaart"
        }, {
            "name": "grijs",
            "layerName": "brtachtergrondkaartgrijs"
        }, {
            "name": "pastel",
            "layerName": "brtachtergrondkaartpastel"
        }, {
            "name": "luchtfoto",
            "layerName": "2016_ortho25",
            "url": "https://geodata.nationaalgeoregister.nl/luchtfoto/rgb",
            "format": "jpeg"
        }]
    },
    "wms": {
        "defaults": {
            "url": "https://geodata.nationaalgeoregister.nl/{workSpaceName}/wms?",
            "version": "1.1.1",
            "transparent": true,
            "format": "image/png",
            "minZoom": 0,
            "maxZoom": 24
        },
        "layers": [{
            "name": "gebouwen",
            "workSpaceName": "bag",
            "layerName": "pand"
        }, {
            "name": "percelen",
            "workSpaceName": "bkadastralekaartv3ag",
            "layerName": "kadastralekaart"
        }, {
            "name": "drone-no-fly-zones",
            "workSpaceName": "dronenoflyzones",
            "layerName": "luchtvaartgebieden,landingsite"
        }, {
            "name": "hoogte",
            "workSpaceName": "ahn2",
            "layerName": "ahn2_05m_int",
            "styleName": "ahn2:ahn2_05m_detail"
        }, {
            "name": "gemeenten",
            "workSpaceName": "bestuurlijkegrenzen",
            "layerName": "gemeenten",
            "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen"
        }, {
            "name": "provincies",
            "workSpaceName": "bestuurlijkegrenzen",
            "layerName": "provincies",
            "styleName": "bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen"
        }]
    },
    "geocoder": {
        "suggestUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?",
        "lookupUrl": "https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?"
    },
    "map": {
        "style": 'standaard',
        "center": {
            "latitude": 52.093249,
            "longitude": 5.111994
        },
        "zoom": 8,
        "attribution": true,
        "extent": [-180, -90, 180, 90],
        "zoomposition": "topright"
    },
    "marker": {
        "url": "./assets/img/marker_icon.svg",
        "iconSize": [64, 64],
        "iconAnchor": [63, 32]
    },
    "classnames": {
        'geocoderContainer': ['nlmaps-geocoder-control-container'],
        'geocoderSearch': ['nlmaps-geocoder-control-search'],
        'geocoderButton': ['nlmaps-geocoder-control-button'],
        'geocoderResultList': ['nlmaps-geocoder-result-list'],
        'geocoderResultItem': ['nlmaps-geocoder-result-item']
    }
};

var CONFIG$1 = {};

CONFIG$1.BASE_DEFAULTS = {
    crs: "EPSG:3857",
    attr: "",
    minZoom: 0,
    maxZoom: 19,
    type: "wmts",
    format: "png",
    url: ""
};
CONFIG$1.WMS_DEFAULTS = {
    url: "",
    version: "1.1.1",
    transparent: true,
    format: "image/png",
    minZoom: 0,
    maxZoom: 24,
    styleName: ""
};
CONFIG$1.BASEMAP_PROVIDERS = {};
CONFIG$1.WMS_PROVIDERS = {};
CONFIG$1.GEOCODER = {};
CONFIG$1.MAP = {
    "zoomposition": "bottomleft"
};
CONFIG$1.MARKER = {};
CONFIG$1.CLASSNAMES = {
    'geocoderContainer': ['nlmaps-geocoder-control-container'],
    'geocoderSearch': ['nlmaps-geocoder-control-search'],
    'geocoderButton': ['nlmaps-geocoder-control-button'],
    'geocoderResultList': ['nlmaps-geocoder-result-list'],
    'geocoderResultItem': ['nlmaps-geocoder-result-item']
};

function err$1(err) {
    throw err;
}

if (config$1.version !== 0.2) {
    err$1('unsupported config version');
}

function mergeConfig$1(defaults$$1, config) {
    return _extends({}, defaults$$1, config);
}

function parseBase$1(basemaps) {
    var defaults$$1 = mergeConfig$1(CONFIG$1.BASE_DEFAULTS, basemaps.defaults);
    if (!basemaps.layers || basemaps.layers.length < 0) {
        err$1('no basemap defined, please define a basemap in the configuration');
    }
    basemaps.layers.forEach(function (layer) {
        if (!layer.name || CONFIG$1.BASEMAP_PROVIDERS[layer.name] !== undefined) {
            err$1('basemap names need to be defined and unique: ' + layer.name);
        }
        CONFIG$1.BASEMAP_PROVIDERS[layer.name] = formatBasemapUrl$1(mergeConfig$1(defaults$$1, layer));
    });
}
function parseWMS$1(wms) {
    var defaults$$1 = mergeConfig$1(CONFIG$1.WMS_DEFAULTS, wms.defaults);
    if (wms.layers) {
        wms.layers.forEach(function (layer) {
            if (!layer.name || CONFIG$1.WMS_PROVIDERS[layer.name] !== undefined) {
                err$1('wms names need to be defined and unique: ' + layer.name);
            }
            CONFIG$1.WMS_PROVIDERS[layer.name] = applyTemplate$1(mergeConfig$1(defaults$$1, layer));
        });
    }
}
function parseGeocoder$1(geocoder) {
    CONFIG$1.GEOCODER.lookupUrl = geocoder.lookupUrl;
    CONFIG$1.GEOCODER.suggestUrl = geocoder.suggestUrl;
}
function parseMap$1(map) {
    CONFIG$1.MAP = mergeConfig$1(CONFIG$1.MAP, map);
}

function formatBasemapUrl$1(layer) {
    switch (layer.type) {
        case 'wmts':
            layer.url = layer.url + "/" + layer.type + "/" + layer.layerName + "/" + layer.crs + "/{z}/{x}/{y}." + layer.format;
            break;
        case 'tms':
            layer.url = layer.url + "/" + layer.layerName + "/{z}/{x}/{y}." + layer.format;
            break;
        default:
            layer.url = layer.url + "/" + layer.type + "/" + layer.layerName + "/" + layer.crs + "/{z}/{x}/{y}." + layer.format;
    }
    return layer;
}

function applyTemplate$1(layer) {
    //Check if the url is templated
    var start = layer.url.indexOf('{');
    if (start > -1) {
        var end = layer.url.indexOf('}');
        var template = layer.url.slice(start + 1, end);
        if (template.toLowerCase() === "workspacename") {
            layer.url = layer.url.slice(0, start) + layer.workSpaceName + layer.url.slice(end + 1, -1);
        } else {
            err$1('only workspacename templates are supported for now');
        }
    }
    return layer;
}

function parseFeatureQuery$1(baseUrl) {
    CONFIG$1.FEATUREQUERYBASEURL = baseUrl;
}

function parseClasses$2(classes) {
    CONFIG$1.CLASSNAMES = mergeConfig$1(CONFIG$1.CLASSNAMES, classes);
}

function parseMarker$1(marker) {
    CONFIG$1.MARKER = marker;
}

if (config$1.featureQuery !== undefined) parseFeatureQuery$1(config$1.featureQuery.baseUrl);
if (config$1.map !== undefined) parseMap$1(config$1.map);
parseBase$1(config$1.basemaps);
if (config$1.wms !== undefined) parseWMS$1(config$1.wms);
if (config$1.geocoder !== undefined) parseGeocoder$1(config$1.geocoder);
if (config$1.marker !== undefined) parseMarker$1(config$1.marker);
if (config$1.classnames !== undefined) parseClasses$2(config$1.classnames);

var emitonoff = createCommonjsModule(function (module) {
  var EmitOnOff = module.exports = function (thing) {
    if (!thing) thing = {};

    thing._subs = [];
    thing._paused = false;
    thing._pending = [];

    /**
     * Sub of pubsub
     * @param  {String}   name name of event
     * @param  {Function} cb   your callback
     */
    thing.on = function (name, cb) {
      thing._subs[name] = thing._subs[name] || [];
      thing._subs[name].push(cb);
    };

    /**
     * remove sub of pubsub
     * @param  {String}   name name of event
     * @param  {Function} cb   your callback
     */
    thing.off = function (name, cb) {
      if (!thing._subs[name]) return;
      for (var i in thing._subs[name]) {
        if (thing._subs[name][i] === cb) {
          thing._subs[name].splice(i);
          break;
        }
      }
    };

    /**
     * Pub of pubsub
     * @param  {String}   name name of event
     * @param  {Mixed}    data the data to publish
     */
    thing.emit = function (name) {
      if (!thing._subs[name]) return;

      var args = Array.prototype.slice.call(arguments, 1);

      if (thing._paused) {
        thing._pending[name] = thing._pending[name] || [];
        thing._pending[name].push(args);
        return;
      }

      for (var i in thing._subs[name]) {
        thing._subs[name][i].apply(thing, args);
      }
    };

    thing.pause = function () {
      thing._paused = true;
    };

    thing.resume = function () {
      thing._paused = false;

      for (var name in thing._pending) {
        for (var i = 0; i < thing._pending[name].length; i++) {
          thing.emit(name, thing._pending[name][i]);
        }
      }
    };

    return thing;
  };
});

var geoLocateDefaultOpts = {
  follow: false
};

function positionHandler(position) {
  this.emit('position', position);
}
function positionErrorHandler(error) {
  this.emit('error', error);
}

var GeoLocator = function GeoLocator(opts) {
  var state = _extends({}, geoLocateDefaultOpts, opts);

  return {
    start: function start() {
      state.started = true;
      navigator.geolocation.getCurrentPosition(positionHandler.bind(this), positionErrorHandler.bind(this), { maximumAge: 60000 });
      return this;
    },
    stop: function stop() {
      state.started = false;
      return this;
    },
    isStarted: function isStarted() {
      return state.started;
    },
    log: function log() {
      // eslint-disable-next-line no-console
      console.log(state);
      return this;
    }
  };
};

function geoLocator(opts) {
  var navigator = typeof window !== 'undefined' ? window.navigator || {} : {};
  if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
    var geolocator = emitonoff(GeoLocator(opts));
    geolocator.on('position', function () {
      this.stop();
    });
    return geolocator;
  } else {
    var error = 'geolocation is not available in your browser.';
    throw error;
  }
}

var geocoder$1 = CONFIG$1.GEOCODER;

function httpGetAsync$1(url) {
    // eslint-disable-next-line no-unused-vars
    return new Promise(function (resolve, reject) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            // eslint-disable-next-line eqeqeq
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                resolve(JSON.parse(xmlHttp.responseText));
            }
        };
        xmlHttp.open("GET", url, true); // true for asynchronous
        xmlHttp.send(null);
    });
}

function wktPointToGeoJson$1(wktPoint) {
    if (!wktPoint.includes('POINT')) {
        throw TypeError('Provided WKT geometry is not a point.');
    }
    var coordinateTuple = wktPoint.split('(')[1].split(')')[0];
    var x = parseFloat(coordinateTuple.split(' ')[0]);
    var y = parseFloat(coordinateTuple.split(' ')[1]);

    return {
        type: 'Point',
        coordinates: [x, y]
    };
}

/**
 * Make a call to PDOK locatieserver v3 suggest service. This service is meant for geocoder autocomplete functionality. For
 * additional documentation, check https://github.com/PDOK/locatieserver/wiki/API-Locatieserver.
 * @param {string} searchTerm The term which to search for
 */
geocoder$1.doSuggestRequest = function (searchTerm) {
    return httpGetAsync$1(this.suggestUrl + 'q=' + encodeURIComponent(searchTerm));
};

/**
 * Make a call to PDOK locatieserver v3 lookup service. This service provides information about objects found through the suggest service. For additional
 * documentation, check: https://github.com/PDOK/locatieserver/wiki/API-Locatieserver
 * @param {string} id The id of the feature that is to be looked up.
 */
geocoder$1.doLookupRequest = function (id) {
    return httpGetAsync$1(this.lookupUrl + 'id=' + encodeURIComponent(id)).then(function (lookupResult) {
        // A lookup request should always return 1 result
        var geocodeResult = lookupResult.response.docs[0];
        geocodeResult.centroide_ll = wktPointToGeoJson$1(geocodeResult.centroide_ll);
        geocodeResult.centroide_rd = wktPointToGeoJson$1(geocodeResult.centroide_rd);
        return geocodeResult;
    });
};

geocoder$1.createControl = function (zoomFunction, map) {
    var _this = this;

    this.zoomTo = zoomFunction;
    this.map = map;
    var container = document.createElement('div');
    parseClasses$3(container, CONFIG$1.CLASSNAMES.geocoderContainer);
    var searchDiv = document.createElement('form');
    var input = document.createElement('input');
    var button = document.createElement('button');
    var results = document.createElement('div');
    parseClasses$3(searchDiv, CONFIG$1.CLASSNAMES.geocoderSearch);
    container.addEventListener('click', function (e) {
        return e.stopPropagation();
    });
    container.addEventListener('dblclick', function (e) {
        return e.stopPropagation();
    });
    input.id = 'nlmaps-geocoder-control-input';
    input.placeholder = 'Zoomen naar adres...';
    input.setAttribute('aria-label', 'Zoomen naar adres');
    input.setAttribute('type', 'text');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('spellcheck', 'false');

    input.addEventListener('input', function (e) {
        _this.suggest(e.target.value);
    });

    input.addEventListener('focus', function (e) {
        _this.suggest(e.target.value);
    });
    button.setAttribute('type', 'submit');
    searchDiv.addEventListener('submit', function (e) {
        e.preventDefault();
        if (_this.results.length > 0) {
            _this.lookup(_this.results[0]);
        }
    });
    button.setAttribute('aria-label', 'Zoomen naar adres');
    parseClasses$3(button, CONFIG$1.CLASSNAMES.geocoderButton);

    results.id = 'nlmaps-geocoder-control-results';
    parseClasses$3(results, CONFIG$1.CLASSNAMES.geocoderResultList);
    results.classList.add('nlmaps-hidden');
    container.appendChild(searchDiv);
    searchDiv.appendChild(input);
    searchDiv.appendChild(button);
    container.appendChild(results);

    return container;
};

geocoder$1.suggest = function (query) {
    var _this2 = this;

    if (query.length < 3) {
        this.clearSuggestResults();
        return;
    }

    this.doSuggestRequest(query).then(function (results) {
        _this2.results = results.response.docs.map(function (r) {
            return r.id;
        });
        _this2.showSuggestResults(results.response.docs);
    });
};

geocoder$1.lookup = function (id) {
    var _this3 = this;

    this.doLookupRequest(id).then(function (result) {
        _this3.zoomTo(result.centroide_ll, _this3.map);
        _this3.showLookupResult(result.weergavenaam);
        _this3.clearSuggestResults();
    });
};

geocoder$1.clearSuggestResults = function () {
    document.getElementById('nlmaps-geocoder-control-results').innerHTML = '';
    document.getElementById('nlmaps-geocoder-control-results').classList.add('nlmaps-hidden');
};

geocoder$1.showLookupResult = function (name) {
    document.getElementById('nlmaps-geocoder-control-input').value = name;
};

function parseClasses$3(el, classes) {
    classes.forEach(function (classname) {
        el.classList.add(classname);
    });
}

geocoder$1.showSuggestResults = function (results) {
    var _this4 = this;

    this.clearSuggestResults();
    if (results.length > 0) {
        var resultList = document.createElement('ul');
        results.forEach(function (result) {

            var li = document.createElement('li');
            var a = document.createElement('a');
            a.innerHTML = result.weergavenaam;
            a.id = result.id;
            parseClasses$3(a, CONFIG$1.CLASSNAMES.geocoderResultItem);
            a.setAttribute('href', '#');
            a.addEventListener('click', function (e) {
                e.preventDefault();
                _this4.lookup(e.target.id);
            });
            li.appendChild(a);
            resultList.appendChild(li);
        });
        document.getElementById('nlmaps-geocoder-control-results').classList.remove('nlmaps-hidden');
        document.getElementById('nlmaps-geocoder-control-results').appendChild(resultList);
    }
};

/*parts copied from maps.stamen.com: https://github.com/stamen/maps.stamen.com/blob/master/js/tile.stamen.js
 * copyright (c) 2012, Stamen Design
 * under BSD 3-Clause license: https://github.com/stamen/maps.stamen.com/blob/master/LICENSE
 */

function getMarker$1() {
  return CONFIG$1.MARKER;
}

function mapPointerStyle(map) {
  var classList = map._container.classList;
  classList.add('nlmaps-marker-cursor');
}

function query(url) {
  var promise = new Promise(function (resolve, reject) {
    fetch(url).then(function (res) {
      return resolve(res.json());
    }).catch(function (err) {
      return reject(err);
    });
  });
  return promise;
}

//transforming operator
//returns an object with original latlng and queryResult:
// {
//   queryResult: {},
//   latlng: d.latlng
// }
// user-supplied responseFormatter is used to create queryResult.
var pointToQuery = function pointToQuery(url, requestFormatter, responseFormatter) {
  return function (inputSource) {
    return function outputSource(start, outputSink) {
      if (start !== 0) return;
      inputSource(0, function (t, d) {
        if (t === 1) {
          var queryUrl = requestFormatter(url, { x: d.latlng.lng, y: d.latlng.lat });
          query(queryUrl).then(function (res) {
            var output = {
              queryResult: responseFormatter(res),
              latlng: d.latlng
            };
            outputSink(1, output);
          });
        } else {
          outputSink(t, d);
        }
      });
    };
  };
};

//constructor to create a 'clickpricker' in one go.
var queryFeatures = function queryFeatures(source, baseUrl, requestFormatter, responseFormatter) {
  var querier = pointToQuery(baseUrl, requestFormatter, responseFormatter)(source);
  querier.subscribe = function (callback) {
    querier(0, callback);
  };
  return querier;
};

var markerStore = {
  removeMarker: function removeMarker() {
    markerStore.marker.remove();
    delete markerStore.marker;
  }
};

function singleMarker(map, popupCreator) {
  mapPointerStyle(map);
  return function (t, d) {
    if (t === 1) {
      if (markerStore.marker) {
        markerStore.marker.remove();
      }
      var newmarker = L.marker([d.latlng.lat, d.latlng.lng], {
        alt: 'marker',
        icon: new L.icon({
          iconUrl: getMarker$1().url,
          iconSize: getMarker$1().iconSize,
          iconAnchor: getMarker$1().iconAnchor
        })
      });
      markerStore.marker = newmarker;
      markerStore.marker.addTo(map);
      if (popupCreator) {
        var div = popupCreator.call(markerStore, d);
        var popup = L.popup({ offset: [0, -50] }).setContent(div);
        markerStore.marker.bindPopup(popup).openPopup();
      } else {
        markerStore.marker.on('click', function () {
          markerStore.removeMarker();
        });
      }
    }
  };
}

var nlmaps = {
  leaflet: {
    bgLayer: bgLayer,
    overlayLayer: overlayLayer,
    markerLayer: markerLayer,
    geocoderControl: geocoderControl,
    geoLocatorControl: geoLocatorControl
  },
  openlayers: {
    bgLayer: nlmapsOpenlayers_cjs_1,
    overlayLayer: nlmapsOpenlayers_cjs_2,
    markerLayer: nlmapsOpenlayers_cjs_3,
    geocoderControl: nlmapsOpenlayers_cjs_6,
    geoLocatorControl: nlmapsOpenlayers_cjs_5
  },
  googlemaps: {
    bgLayer: nlmapsGooglemaps_cjs_1,
    overlayLayer: nlmapsGooglemaps_cjs_2,
    markerLayer: nlmapsGooglemaps_cjs_3,
    geoLocatorControl: nlmapsGooglemaps_cjs_5,
    geocoderControl: nlmapsGooglemaps_cjs_6
  }
};

//for future use
var geoLocateDefaultOpts$1 = {};

function testWhichLib() {
  var defined = [];
  if ((typeof L === 'undefined' ? 'undefined' : _typeof(L)) === 'object') {
    defined.push('leaflet');
  }
  if ((typeof google === 'undefined' ? 'undefined' : _typeof(google)) === 'object' && _typeof(google.maps) === 'object') {
    defined.push('googlemaps');
  }
  if ((typeof ol === 'undefined' ? 'undefined' : _typeof(ol)) === 'object') {
    defined.push('openlayers');
  }
  if (defined.length > 1) {
    return 'too many libs';
  } else if (defined.length === 0) {
    return 'too few libs';
  } else {
    return defined[0];
  }
}

function initMap(lib, opts) {
  var map = void 0,
      rootdiv = void 0,
      el = void 0,
      options = void 0;
  switch (lib) {
    case 'leaflet':
      //work-around to prevent mapdragging at text selection
      rootdiv = document.getElementById(opts.target);
      options = {};
      if (!opts.attribution) {
        options.attributionControl = false;
      }
      el = L.DomUtil.create('div');
      el.style.height = '100%';
      rootdiv.appendChild(el);
      options.maxBounds = extentLeafletFormat();
      map = L.map(el, options).setView([opts.center.latitude, opts.center.longitude], opts.zoom);
      map.zoomControl.setPosition(CONFIG$1.MAP.zoomposition);
      break;
    case 'googlemaps':
      map = new google.maps.Map(document.getElementById(opts.target), {
        center: { lat: opts.center.latitude, lng: opts.center.longitude },
        zoom: opts.zoom,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        fullscreenControl: false
      });

      break;
    case 'openlayers':
      map = new ol.Map({
        view: new ol.View({
          center: ol.proj.fromLonLat([opts.center.longitude, opts.center.latitude]),
          zoom: opts.zoom
        }),
        target: opts.target
      });
      map.getTargetElement().getElementsByClassName('ol-zoom')[0].style.cssText = "left: 5px !important; bottom: 5px !important";
      map.getTargetElement().getElementsByClassName('ol-zoom')[0].classList.remove('ol-zoom');
      break;
  }
  return map;
}

function addGoogleLayer(layer, map) {
  // Markers are not considered to be a layer in google maps. Therefore, they must be added differently.
  // It is important that a layer has the title 'marker' in order to be recognized as a layer.
  if (layer.title === 'marker') {
    layer.setMap(map);
    return;
  }

  var mapTypeIds = [layer.name, 'roadmap'];

  if (layer.name === 'wms') {
    map.setOptions({
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: mapTypeIds,
        position: google.maps.ControlPosition.BOTTOM_LEFT
      }
    });
    return;
  }

  map.setOptions({
    mapTypeControl: true,
    mapTypeControlOptions: {
      mapTypeIds: mapTypeIds,
      position: google.maps.ControlPosition.BOTTOM_LEFT
    }
  });

  map.mapTypes.set(layer.name, layer);
  map.setMapTypeId(layer.name);
}

function addLayerToMap(lib, layer, map) {
  switch (lib) {
    case 'leaflet':
      map.addLayer(layer);
      break;
    case 'googlemaps':
      addGoogleLayer(layer, map);
      break;
    case 'openlayers':
      map.addLayer(layer);
      break;
  }
}
function createBackgroundLayer(lib, map, name) {
  var bgLayer$$1 = void 0;
  switch (lib) {
    case 'leaflet':
      bgLayer$$1 = nlmaps.leaflet.bgLayer(name);
      break;
    case 'googlemaps':
      bgLayer$$1 = nlmaps.googlemaps.bgLayer(map, name);
      break;
    case 'openlayers':
      bgLayer$$1 = nlmaps.openlayers.bgLayer(name);
      break;
  }
  return bgLayer$$1;
}

function createOverlayLayer(lib, map, name) {
  var overlayLayer$$1 = void 0;
  switch (lib) {
    case 'leaflet':
      overlayLayer$$1 = nlmaps.leaflet.overlayLayer(name);
      break;
    case 'googlemaps':
      overlayLayer$$1 = nlmaps.googlemaps.overlayLayer(map, name);
      break;
    case 'openlayers':
      overlayLayer$$1 = nlmaps.openlayers.overlayLayer(name);
      break;
  }
  return overlayLayer$$1;
}

function createMarkerLayer(lib, map, latLngObject) {
  var markerLayer$$1 = void 0;
  switch (lib) {
    case 'leaflet':
      markerLayer$$1 = nlmaps.leaflet.markerLayer(latLngObject);
      break;
    case 'googlemaps':
      markerLayer$$1 = nlmaps.googlemaps.markerLayer(latLngObject);
      break;
    case 'openlayers':
      markerLayer$$1 = nlmaps.openlayers.markerLayer(latLngObject);
      break;
  }
  return markerLayer$$1;
}

function getMapCenter$1(lib, map) {
  var mapCenter = void 0;
  switch (lib) {
    case 'leaflet':
      mapCenter = getMapCenter(map);
      break;
    case 'googlemaps':
      mapCenter = nlmapsGooglemaps_cjs_4(map);
      break;
    case 'openlayers':
      mapCenter = nlmapsOpenlayers_cjs_4(map);
      break;
  }
  return mapCenter;
}

function mergeOpts(defaultopts, useropts) {
  return _extends({}, defaultopts, useropts);
}

nlmaps.lib = testWhichLib();

nlmaps.createMap = function () {
  var useropts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var opts = mergeOpts(CONFIG$1.MAP, useropts);
  try {
    if (nlmaps.lib == 'too many libs' || nlmaps.lib === 'too few libs') {
      throw { message: 'one and only one map library can be defined. Please Refer to the documentation to see which map libraries are supported.' };
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
  var map = initMap(nlmaps.lib, opts);
  // Background layer
  var backgroundLayer = createBackgroundLayer(nlmaps.lib, map, opts.style);
  addLayerToMap(nlmaps.lib, backgroundLayer, map, opts.style);

  // Geocoder
  if (opts.search) {
    addGeocoderControlToMap(nlmaps.lib, map);
  }

  // Marker layer
  if (opts.marker) {
    var markerLocation = opts.marker;
    if (typeof opts.marker === "boolean") {
      markerLocation = getMapCenter$1(nlmaps.lib, map);
    }
    markerStore.marker = createMarkerLayer(nlmaps.lib, map, markerLocation);
    addLayerToMap(nlmaps.lib, markerStore.marker, map);
  }

  // Overlay layer
  if (opts.overlay && opts.overlay !== 'false') {
    var overlayLayer$$1 = createOverlayLayer(nlmaps.lib, map, opts.overlay);
    addLayerToMap(nlmaps.lib, overlayLayer$$1, map);
  }
  return map;
};

function addGeoLocControlToMap(lib, geolocator, map) {
  var control = void 0;
  switch (lib) {
    case 'leaflet':
      nlmaps[lib].geoLocatorControl(geolocator).addTo(map);
      break;
    case 'googlemaps':
      control = nlmaps[lib].geoLocatorControl(geolocator, map);
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(control);
      break;
    case 'openlayers':
      control = nlmaps[lib].geoLocatorControl(geolocator, map);
      map.addControl(control);
      break;
  }
}

function addGeocoderControlToMap(lib, map) {
  nlmaps[lib].geocoderControl(map);
}

nlmaps.geoLocate = function (map) {
  var useropts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var opts = mergeOpts(geoLocateDefaultOpts$1, useropts);
  var geolocator = geoLocator(opts);
  addGeoLocControlToMap(nlmaps.lib, geolocator, map);
};

nlmaps.clickProvider = function (map) {
  mapPointerStyle(map);
  var clickSource = function clickSource(start, sink) {
    if (start !== 0) return;
    map.on('click', function (e) {
      sink(1, e);
    });
    var talkback = function talkback(t, d) {
      console.log('bye bye');
    };
    sink(0, talkback);
  };
  clickSource.subscribe = function (callback) {
    clickSource(0, callback);
  };
  return clickSource;
};

nlmaps.queryFeatures = queryFeatures;
nlmaps.singleMarker = singleMarker;

exports.nlmaps = nlmaps;
//# sourceMappingURL=nlmaps.cjs.js.map
