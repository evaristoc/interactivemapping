<template>
<div>
  <div id="map"></div>
  <!--<pre id="info"></pre>-->
</div>
</template>
<script>
var modelId = 1;

export default {
  data(){
    return {
      mappoints: [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.03238901390978, 38.913188059745586]
                    },
                    "properties": {
                        "modelId": modelId,
                    },
                }, ],
    }
  },


  mounted(){
    /*
    REFERENCES
    -- https://reactgo.com/vue-resource-http/
    -- https://dev.to/nikhilponnuru/make-a-request-between-frontend-and-backend-locally-running-on-different-ports-without-cors-issue-4oje
    -- https://stackoverflow.com/questions/34160509/options-for-testing-service-workers-via-http
    -- https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server
    -- https://github.com/expressjs/cors
    */
    
    
    /*
    REFERENCES
    -- https://medium.com/worldsensing-techblog/mapbox-gl-101-b2407c292ea6
    -- https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/
    -- https://docs.mapbox.com/mapbox-gl-js/example/mouse-position/
    -- https://docs.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures-around-point/
    -- https://docs.mapbox.com/mapbox-gl-js/example/live-update-feature/
    -- https://docs.mapbox.com/ios/maps/examples/live-data/
    -- https://docs.mapbox.com/help/tutorials/show-changes-over-time/
    -- https://docs.mapbox.com/help/glossary/layout-paint-property/
    -- https://gis.stackexchange.com/questions/212716/mapbox-gl-api-add-property-to-source-to-update-map-feature-colors-with-dyna
    
    This one... hmmm... it happens me again... (`geolocated games`)
    -- https://echoes.xyz/
    -- https://dev.to/netcell/geolocation-in-mobile-game-j02
    */

    var zelf = this;
    //console.log(document.querySelector('#map'))
    mapboxgl.accessToken = 'pk.eyJ1Ijoic21pY2tpZSIsImEiOiJjaWtiM2JkdW0wMDJudnRseTY0NWdrbjFnIn0.WxGYL18BJjWUiNIu-r3MSA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v8',
        //center: [-96, 37.8],
        //center: [-77.03238901390978, 38.913188059745586],
        center: [4.896411, 52.354200],
        zoom: 15,
        interactive: true
    });

    // var popup = new mapboxgl.Popup({
    //         closeOnClick: false
    //     })
    //     .setLngLat([-77.03238901390978, 38.913188059745586])
    //     .setHTML('<h1>Hello World!</h1>')
    //     .addTo(map);

    map.on('load', function(e) {
        
        map.addSource('markers', {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": zelf.mappoints,
            }
        });

        map.addLayer({
            "id": "circles1",
            "source": "markers",
            "type": "circle",
            "paint": {
                "circle-radius": 10,
                "circle-color": "#007cbf",
                "circle-opacity": 0.5,
                "circle-stroke-width": 0,
            },
            //"filter": ["==", "modelId", 1],
        });

        map.addSource('markers2', {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": zelf.mappoints,
            }
        });

        map.addLayer({
            id: 'addedmarkers',
            source: 'markers2',
            type: 'circle',
            paint: {
              'circle-radius': 3,
              'circle-color': '#223b53',
              'circle-stroke-color': 'white',
              'circle-stroke-width': 1,
              'circle-opacity': 0.5
            },
            //"filter": ["!=", "modelId", 1],
        });


        // When a click event occurs on a feature in the states layer, open a popup at the
        // location of the click, with description HTML from its properties.
        map.on('click', 'addedmarkers', function(e) {
            var popup = new mapboxgl.Popup({
                    closeOnClick: false
                })
                //.setLngLat([-77.03238901390978, 38.913188059745586])
                .setLngLat(e.lngLat)
                //.setHTML('<h1>Hello World!</h1>')
                .setHTML('<pre id="info">'+JSON.stringify(e.point)+'</pre>')
                .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'circles1', function() {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'circles1', function() {
            map.getCanvas().style.cursor = '';
        });


        map.on('mousedown', function(e) {
            // document.getElementById('info').innerHTML =
            // // e.point is the x, y coordinates of the mousemove event relative
            // // to the top-left corner of the map
            // JSON.stringify(e.point) +
            // '<br />' +
            // // e.lngLat is the longitude, latitude geographical position of the event
            // JSON.stringify(e.lngLat.wrap());

            modelId++;

            zelf.mappoints.push(
              {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        //"coordinates": e.lngLat
                        "coordinates":[e.lngLat.lng, e.lngLat.lat]
                    },
                    "properties": {
                        "modelId": modelId,
                    },
                },
            );

            console.log(zelf.mappoints);
            console.log(map.getSource('markers2'));
            //zelf.$http
            //        .get("http://localhost:3000/v1/t/1/p/1")
            //        .then(res => {
            //          console.log(res.body);
            //        });

            zelf.$http
                    .post("http://localhost:3000/v1/t/1/p", {id:modelId,lat:e.lngLat.lat,lng:e.lngLat.lng})
                    .then(res => {
                      console.log(res.body);
                    });
            
            map.getSource('markers2').setData({
              "type": "FeatureCollection",
              "features": zelf.mappoints
            });

        });

        map.on('mouseup', function(e) {
            //document.getElementById('info').innerHTML = "";
        });
    });
  },
  
  methods:{
    //sendToServerTest: {
    //  
    //}
  }
}
</script>
<style>
  #map {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
  }


  /*#info {*/
  pre {
    display: block;
    position: relative;
    margin: 0px auto;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    text-align: center;
    color: #222;
    background: #fff;
  }



</style>