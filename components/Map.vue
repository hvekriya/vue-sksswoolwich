<template>
  <GMap
    :center="center"
    :zoom="zoom"
    map-type-id="terrain"
    style="width: 100%; height: 300px"
    id="map"
  >
    <GmapMarker :position="marker" @click="toggleInfoWindow()">
      <GMapInfoWindow
        :options="infoOptions"
        :position="marker"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        <div v-html="infoContent"></div>
      </GMapInfoWindow>
    </GmapMarker>
  </GMap>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      center: { lat: 51.482957, lng: 0.075196 },
      zoom: 16,
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -10,
        },
      },
      infoWinOpen: false,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      marker: { lat: 51.482957, lng: 0.075196 },
    };
  },
  methods: {
    toggleInfoWindow: function () {
      this.infoWindowPos = this.marker;
      this.infoWinOpen = !this.infoWinOpen;
      this.infoContent = `
        <div class="card bg-white rounded border-0" style="color: black;">
            <div class="card-body" style="padding: 0;">
              <h5 class="card-title">
                Woolwich Temple
              </h5>
              <div class="card-text text-dark">
                    St. Margarets Grove <br>
                    London <br>
                    SE18 7RL <br>
                    UK <br><br>
                    <a href="https://www.google.com/maps/dir//Shree+Swaminarayan+Temple+-+Woolwich,+St.+Margarets+Grove,+London+SE18+7RL/@51.483027,0.0731455,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x47d8a8dcb1090817:0x7f680ca13d5a3426!2m2!1d0.0753342!2d51.4830237!3e0" 
                    class="body-link btn btn-primary" target="_blank">Get directions</a>
              </div>
            </div>
        </div>`;
    },
  },
};
</script>