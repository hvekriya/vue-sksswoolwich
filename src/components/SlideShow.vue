<template>
  <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <!-- <li data-target="#myCarousel" data-slide-to="2"></li> -->
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner">

      <div class="item active">
        <img src="https://farm5.staticflickr.com/4753/39972331571_6d6de90849_o.png">
      </div>
      <!--
      <div class="item">
        <img src="https://drive.google.com/uc?export=view&id=10WmQNMkCQ-xlI9zedffHwoBrlIB0H-vK">
        <div class="carousel-caption">
          <div>
            <h3>Weekly Activities</h3>
            <a class="btn btn-primary" href="/weekly-schedule">See the time table</a>
          </div>
        </div>
      </div>
      <div class="item">
        <img src="https://drive.google.com/uc?export=view&id=1PEbm9Kl9BnzVVg0yG1RowJYr_3KzZu5N">
        <div class="carousel-caption">
          <div>
            <h3>Weekly Activities</h3>
            <a class="btn btn-primary" href="/weekly-schedule">See the time table</a>
          </div>
        </div>
      </div>
      <div class="item">
        <img src="https://drive.google.com/uc?export=view&id=1Pd21PJf6L2Eb9dJfeLxqgiHXS7GRsDVm">
        <div class="carousel-caption">
          <div>
            <h3>Weekly Activities</h3>
            <a class="btn btn-primary" href="/weekly-schedule">See the time table</a>
          </div>
        </div>
      </div>
      <div class="item">
        <img src="https://drive.google.com/uc?export=view&id=1Aach9SadCEZYZCJ_4f5l2_pA5sYvB54s">
        <div class="carousel-caption">
          <div>
            <h3>Weekly Activities</h3>
            <a class="btn btn-primary" href="/weekly-schedule">See the time table</a>
          </div>
        </div>
      </div>
      <div class="item">
        <img src="https://drive.google.com/uc?export=view&id=1mG4iSzpdcNYsJlJA81uTuRyfobZ4mckZ">
        <div class="carousel-caption">
          <div>
            <h3>Weekly Activities</h3>
            <a class="btn btn-primary" href="/weekly-schedule">See the time table</a>
          </div>
        </div>
      </div> -->
    </div>

    <!-- Left and right controls -->
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'SlideShow'
  }

</script>
