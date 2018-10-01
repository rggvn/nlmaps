!function(e){"use strict";function t(e){throw e}function o(e,t){return Object.assign({},e,t)}function n(e){switch(e.type){case"wmts":e.url=e.url+"/"+e.type+"/"+e.layerName+"/"+e.crs+"/{z}/{x}/{y}."+e.format;break;case"tms":e.url=e.url+"/"+e.layerName+"/{z}/{x}/{y}."+e.format;break;default:e.url=e.url+"/"+e.type+"/"+e.layerName+"/"+e.crs+"/{z}/{x}/{y}."+e.format}return e}function r(e){var o=e.url.indexOf("{");if(o>-1){var n=e.url.indexOf("}");"workspacename"===e.url.slice(o+1,n).toLowerCase()?e.url=e.url.slice(0,o)+e.workSpaceName+e.url.slice(n+1,-1):t("only workspacename templates are supported for now")}return e}function a(e){return new Promise(function(t,o){var n=new XMLHttpRequest;n.onreadystatechange=function(){4==n.readyState&&200==n.status&&t(JSON.parse(n.responseText))},n.open("GET",e,!0),n.send(null)})}function s(e){if(!e.includes("POINT"))throw TypeError("Provided WKT geometry is not a point.");var t=e.split("(")[1].split(")")[0];return{type:"Point",coordinates:[parseFloat(t.split(" ")[0]),parseFloat(t.split(" ")[1])]}}function l(e,t){t.forEach(function(t){e.classList.add(t)})}function i(e){if(e in h.BASEMAP_PROVIDERS){var t=h.BASEMAP_PROVIDERS[e];return t.deprecated&&console&&console.warn&&console.warn(e+" is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference."),t}console.error("NL Maps error: You asked for a style which does not exist! Available styles: "+Object.keys(PROVIDERS).join(", "))}function c(e,t){if("object"===("undefined"==typeof google?"undefined":v(google))&&"object"===v(google.maps)){var o=document.createElement("div");o.style.backgroundColor="#fff",o.style.opacity="0.7",o.style.border="2px solid #fff",o.style.cursor="pointer",e.appendChild(o);var n=document.createElement("div");return n.style.color="rgb(25,25,25)",n.style.fontFamily="Roboto,Arial,sans-serif",n.style.fontSize="10px",n.innerHTML=t,o.appendChild(n),e.index=1,e}throw"google is not defined"}function u(e,t){var o=document.createElement("div");return o.id="nlmaps-geolocator-control",o.style.backgroundColor="#fff",o.style.cursor="pointer",o.style.boxShadow="0 1px 5px rgba(0, 0, 0, 0.65)",o.style.height="26px",o.style.width="26px",o.style.borderRadius="26px 26px",o.style.margin=".5em",o.addEventListener("click",function(){e.start()},this),e.on("position",function(e){t.setCenter({lat:e.coords.latitude,lng:e.coords.longitude})}),o}function d(e,t){return e.getArray().indexOf(t)}function m(e,t){var o=t.getMapTypeId(),n=t.controls[google.maps.ControlPosition.BOTTOM_RIGHT],r=d(n,e);"roadmap"===o||"hybrid"===o||"sattelite"===o?r>-1&&n.removeAt(r):-1===r&&n.push(e)}function g(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,t=arguments[1],o=new c(document.createElement("div"),t);e.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(o),e.addListener("maptypeid_changed",function(){return m(o,e)})}function p(e){return{getTileUrl:function(t,o){return e.bare_url+"/"+o+"/"+t.x+"/"+t.y+".png"},tileSize:new google.maps.Size(256,256),isPng:!0,name:e.name,maxZoom:e.maxZoom,minZoom:e.minZoom}}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"standaard";if("object"===("undefined"==typeof google?"undefined":v(google))&&"object"===v(google.maps)){var o=i(t),n=p(o),r=new google.maps.ImageMapType(n),a=e||this.map||"undefined";return void 0!==a&&g(a,o.attribution),r}throw"google is not defined"}var y={version:.2,basemaps:{defaults:{crs:"EPSG:3857",attribution:"Kaartgegevens &copy; <a href='https://www.kadaster.nl'>Kadaster</a> |             <a href='https://www.verbeterdekaart.nl'>Verbeter de kaart</a>",minZoom:6,maxZoom:19,type:"wmts",format:"png",url:"https://geodata.nationaalgeoregister.nl/tiles/service"},layers:[{name:"standaard",layerName:"brtachtergrondkaart"},{name:"grijs",layerName:"brtachtergrondkaartgrijs"},{name:"pastel",layerName:"brtachtergrondkaartpastel"},{name:"luchtfoto",layerName:"2016_ortho25",url:"https://geodata.nationaalgeoregister.nl/luchtfoto/rgb",format:"jpeg"}]},wms:{defaults:{url:"https://geodata.nationaalgeoregister.nl/{workSpaceName}/wms?",version:"1.1.1",transparent:!0,format:"image/png",minZoom:0,maxZoom:24},layers:[{name:"gebouwen",workSpaceName:"bag",layerName:"pand"},{name:"percelen",workSpaceName:"bkadastralekaartv3ag",layerName:"kadastralekaart"},{name:"drone-no-fly-zones",workSpaceName:"dronenoflyzones",layerName:"luchtvaartgebieden,landingsite"},{name:"hoogte",workSpaceName:"ahn2",layerName:"ahn2_05m_int",styleName:"ahn2:ahn2_05m_detail"},{name:"gemeenten",workSpaceName:"bestuurlijkegrenzen",layerName:"gemeenten",styleName:"bestuurlijkegrenzen:bestuurlijkegrenzen_gemeentegrenzen"},{name:"provincies",workSpaceName:"bestuurlijkegrenzen",layerName:"provincies",styleName:"bestuurlijkegrenzen:bestuurlijkegrenzen_provinciegrenzen"}]},geocoder:{suggestUrl:"https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?",lookupUrl:"https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?"},map:{style:"standaard",center:{latitude:52.093249,longitude:5.111994},zoom:8,attribution:!0,extent:[-180,-90,180,90],zoomposition:"topright"},marker:{url:"./assets/img/marker_icon.svg",iconSize:[64,64],iconAnchor:[63,32]},classnames:{geocoderContainer:["nlmaps-geocoder-control-container"],geocoderSearch:["nlmaps-geocoder-control-search"],geocoderButton:["nlmaps-geocoder-control-button"],geocoderResultList:["nlmaps-geocoder-result-list"],geocoderResultItem:["nlmaps-geocoder-result-item"],geocoderResultSelected:["nlmaps-geocoder-result-selected"]}},h={};h.BASE_DEFAULTS={crs:"EPSG:3857",attr:"",minZoom:0,maxZoom:19,type:"wmts",format:"png",url:""},h.WMS_DEFAULTS={url:"",version:"1.1.1",transparent:!0,format:"image/png",minZoom:0,maxZoom:24,styleName:""},h.BASEMAP_PROVIDERS={},h.WMS_PROVIDERS={},h.GEOCODER={},h.MAP={zoomposition:"bottomleft"},h.MARKER={},h.CLASSNAMES={geocoderContainer:["nlmaps-geocoder-control-container"],geocoderSearch:["nlmaps-geocoder-control-search"],geocoderButton:["nlmaps-geocoder-control-button"],geocoderResultList:["nlmaps-geocoder-result-list"],geocoderResultItem:["nlmaps-geocoder-result-item"]},.2!==y.version&&t("unsupported config version"),void 0!==y.featureQuery&&function(e){h.FEATUREQUERYBASEURL=e}(y.featureQuery.baseUrl),void 0!==y.map&&function(e){h.MAP=o(h.MAP,e)}(y.map),function(e){var r=o(h.BASE_DEFAULTS,e.defaults);(!e.layers||e.layers.length<0)&&t("no basemap defined, please define a basemap in the configuration"),e.layers.forEach(function(e){e.name&&void 0===h.BASEMAP_PROVIDERS[e.name]||t("basemap names need to be defined and unique: "+e.name),h.BASEMAP_PROVIDERS[e.name]=n(o(r,e))})}(y.basemaps),void 0!==y.wms&&function(e){var n=o(h.WMS_DEFAULTS,e.defaults);e.layers&&e.layers.forEach(function(e){e.name&&void 0===h.WMS_PROVIDERS[e.name]||t("wms names need to be defined and unique: "+e.name),h.WMS_PROVIDERS[e.name]=r(o(n,e))})}(y.wms),void 0!==y.geocoder&&function(e){h.GEOCODER.lookupUrl=e.lookupUrl,h.GEOCODER.suggestUrl=e.suggestUrl}(y.geocoder),void 0!==y.marker&&function(e){h.MARKER=e}(y.marker),void 0!==y.classnames&&function(e){h.CLASSNAMES=o(h.CLASSNAMES,e)}(y.classnames);var S=h.GEOCODER;S.resultList=[],S.selectedResult=-1,S.doSuggestRequest=function(e){return a(this.suggestUrl+"q="+encodeURIComponent(e))},S.doLookupRequest=function(e){return a(this.lookupUrl+"id="+encodeURIComponent(e)).then(function(e){var t=e.response.docs[0];return t.centroide_ll=s(t.centroide_ll),t.centroide_rd=s(t.centroide_rd),t})},S.createControl=function(e,t,o){var n=this;this.zoomTo=e,this.map=t,this.nlmaps=o;var r=document.createElement("div"),a=document.createElement("form"),s=document.createElement("input"),i=document.createElement("button"),c=document.createElement("div");return l(r,h.CLASSNAMES.geocoderContainer),l(a,h.CLASSNAMES.geocoderSearch),r.addEventListener("click",function(e){return e.stopPropagation()}),r.addEventListener("dblclick",function(e){return e.stopPropagation()}),s.id="nlmaps-geocoder-control-input",s.placeholder="Zoomen naar adres...",s.setAttribute("aria-label","Zoomen naar adres"),s.setAttribute("type","text"),s.setAttribute("autocapitalize","off"),s.setAttribute("autocomplete","off"),s.setAttribute("autocorrect","off"),s.setAttribute("spellcheck","false"),s.addEventListener("keydown",function(e){var t=n.resultList;n.resultList.length>0&&("ArrowDown"!==e.code&&40!==e.keyCode||(n.selectedResult<n.resultList.length-1&&n.selectedResult++,n.showLookupResult(t[n.selectedResult])),"ArrowUp"!==e.code&&38!==e.keyCode||(n.selectedResult>0&&n.selectedResult--,n.showLookupResult(t[n.selectedResult])),"Escape"===e.code&&n.clearSuggestResults(!0))}),s.addEventListener("input",function(e){n.suggest(e.target.value)}),s.addEventListener("focus",function(e){n.suggest(e.target.value)}),i.setAttribute("type","submit"),a.addEventListener("submit",function(e){e.preventDefault(),n.resultList.length>0&&n.lookup(n.resultList[n.selectedResult<0?0:n.selectedResult].id)}),i.setAttribute("aria-label","Zoomen naar adres"),l(i,h.CLASSNAMES.geocoderButton),c.id="nlmaps-geocoder-control-results",l(c,h.CLASSNAMES.geocoderResultList),c.classList.add("nlmaps-hidden"),r.appendChild(a),a.appendChild(s),a.appendChild(i),r.appendChild(c),r},S.suggest=function(e){var t=this;if(e.length<3)return void this.clearSuggestResults();this.doSuggestRequest(e).then(function(e){t.resultList=e.response.docs,t.showSuggestResults(t.resultList)})},S.lookup=function(e){var t=this;this.doLookupRequest(e).then(function(e){t.zoomTo(e.centroide_ll,t.map),t.nlmaps.emit("search-select",{location:e.weergavenaam,latlng:e.centroide_ll,resultObject:e}),t.showLookupResult(e),t.clearSuggestResults()})},S.clearSuggestResults=function(e){this.selectedResult=-1,e&&(document.getElementById("nlmaps-geocoder-control-input").value=""),document.getElementById("nlmaps-geocoder-control-results").innerHTML="",document.getElementById("nlmaps-geocoder-control-results").classList.add("nlmaps-hidden")},S.showLookupResult=function(e){var t=document.getElementsByClassName(h.CLASSNAMES.geocoderResultItem);Array.prototype.map.call(t,function(e){return e.classList.remove(h.CLASSNAMES.geocoderResultSelected)});var o=document.getElementById(e.id);o&&o.classList.add(h.CLASSNAMES.geocoderResultSelected),document.getElementById("nlmaps-geocoder-control-input").value=e.weergavenaam},S.showSuggestResults=function(e){var t=this;if(this.clearSuggestResults(),e.length>0){var o=document.createElement("ul");e.forEach(function(e){var n=document.createElement("li"),r=document.createElement("a");r.innerHTML=e.weergavenaam,r.id=e.id,l(r,h.CLASSNAMES.geocoderResultItem),r.setAttribute("href","#"),r.addEventListener("click",function(e){e.preventDefault(),t.lookup(e.target.id)}),n.appendChild(r),o.appendChild(n)}),document.getElementById("nlmaps-geocoder-control-results").classList.remove("nlmaps-hidden"),document.getElementById("nlmaps-geocoder-control-results").appendChild(o)}};var v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.bgLayer=f,e.geoLocatorControl=u}(this.window=this.window||{});
//# sourceMappingURL=nlmaps-googlemaps.iife.js.map
