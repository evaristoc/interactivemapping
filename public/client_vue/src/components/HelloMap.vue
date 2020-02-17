<template>
  <div id="map"></div>
</template>
<script>
export default {
  mounted(){
    //console.log(document.querySelector('#map'))
    mapboxgl.accessToken = 'pk.eyJ1Ijoic21pY2tpZSIsImEiOiJjaWtiM2JkdW0wMDJudnRseTY0NWdrbjFnIn0.WxGYL18BJjWUiNIu-r3MSA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v8',
        //center: [-96, 37.8],
        center: [-77.03238901390978, 38.913188059745586],
        zoom: 15,
        interactive: true
    });

    var popup = new mapboxgl.Popup({
            closeOnClick: false
        })
        .setLngLat([-77.03238901390978, 38.913188059745586])
        .setHTML('<h1>Hello World!</h1>')
        .addTo(map);

    map.on('load', function(e) {
        map.addSource('markers', {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.03238901390978, 38.913188059745586]
                    },
                    "properties": {
                        "modelId": 1,
                    },
                }, ]
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
            "filter": ["==", "modelId", 1],
        });

        // When a click event occurs on a feature in the states layer, open a popup at the
        // location of the click, with description HTML from its properties.
        map.on('click', 'circles1', function(e) {
            var popup = new mapboxgl.Popup({
                    closeOnClick: false
                })
                //.setLngLat([-77.03238901390978, 38.913188059745586])
                .setLngLat(e.lngLat)
                .setHTML('<h1>Hello World!</h1>')
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

    });
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
</style>