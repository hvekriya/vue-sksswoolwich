<template>
  <main id="content" role="main">
    <SlideShow />
    <div class="wrapper container">
      <br>
      <div class="row">
        <DailyDarshan />
        <OpeningTimes />
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <legend>
            <center>Upcoming Events</center>
          </legend>
          <UpcomingEvents />
        </div>
      </div>
      <div class="row">
        <Schedule />
      </div>
    </div>
  </main>
  </transition>
</template>

<script>
  import SlideShow from '../components/SlideShow'
  import DailyDarshan from '../components/DailyDarshan'
  import OpeningTimes from '../components/OpeningTimes'
  import UpcomingEvents from '../components/UpcomingEvents'
  import Schedule from './our-temple/Schedule'

  export default {
    name: 'Home',
    components: {
      SlideShow,
      DailyDarshan,
      OpeningTimes,
      UpcomingEvents,
      Schedule
    }
  }

</script>
