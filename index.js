
function updateMap() {
    fetch(" https://www.trackcorona.live/api/countries")
        .then(response => response.json())
        .then(rsp => {
            console.log(rsp.data);
            rsp.data.forEach(element => {
                let latitude = element.latitude;
                let longitude = element.longitude;
                let cases = element.confirmed;
                let deaths = element.dead;
                let recovered = element.recovered;
                let location = element.location;
                if (cases > 0 && cases <= 1000) {
                    color = "rgb(255,160,122)";
                }
                else if (cases > 1000 && cases <= 100000) {
                    color = "rgb(250,128,114)";
                }

                else if(cases > 100000 && cases <= 500000) {
                    color = "rgb(205,92,92)";
                }

                else if(cases > 500000 && cases <= 1000000) {
                    color = "rgb(255,69,0)";
                }

                else if(cases > 1000000 && cases <= 2000000) {
                    color = "rgb(220,20,60)";
                }

                else if(cases > 2000000 && cases <= 3000000) {
                    color = "rgb(255,0,0)";
                }

                else if(cases > 3000000 && cases <= 4000000) {
                    color = "rgb(128,0,0)";
                }

                else {
                    color = "rgb(0,0,0)";
                }

                var popup = new mapboxgl.Popup({offset:[0,0]}).setHTML(`<h2>Country : ${location}<br>
                                                                        Confirmed : ${cases}<br>
                                                                        Deaths : ${deaths}<br>
                                                                        recovered : ${recovered}</h2>`);
                var marker = new mapboxgl.Marker({
                    draggable: false,
                    color: color
                })
                    .setLngLat([longitude, latitude])
                    .addTo(map);
                var markerId = marker.getElement();
                markerId.id = 'marker'
                markerId.addEventListener('mouseenter', () => popup.addTo(map));
                markerId.addEventListener('mouseleave', () => popup.remove());
                marker.setPopup(popup);
                marker.addTo(map);

            });
        });
}
updateMap();