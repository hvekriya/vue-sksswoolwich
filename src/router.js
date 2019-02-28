import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound'
import Home from './views/Home'
import OurTemple from './views/our-temple/OurTemple'
import Education from './views/our-temple/Education'
import Schedule from './views/our-temple/Schedule'
import Calendar from './views/our-temple/Calendar'
import Articles from './views/our-sampraday/Articles'
import Article from './views/our-sampraday/Article'
import DailyDarshan from './views/DailyDarshan'
import WeddingHall from './views/WeddingHall'
import Nursery from './views/Nursery'
import Donation from './views/Donation'
import ContactUs from './views/ContactUs'
import Post from './views/Post'
import Blog from './views/Blog'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    // Our-temple routes
    {
      path: '/our-temple/weekly-schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/our-temple/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/our-temple/swaminarayan-education',
      name: 'Education',
      component: Education
    },
    { // Pages from Prismic
      path: '/our-temple/:uid',
      name: 'OurTemple',
      component: OurTemple
    },
    // Our Sampraday
    {
      path: '/our-sampraday/:tag',
      name: 'Articles',
      component: Articles
    },
    {
      path: '/our-sampraday/articles/:uid',
      name: 'Article',
      component: Article
    },
    // Media
    {
      path: '/daily-darshan',
      name: 'DailyDarshan',
      component: DailyDarshan
    },
    // Blog
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/post/:uid',
      name: 'Post',
      component: Post
    },
    // Wedding Hall
    {
      path: '/wedding-hall',
      name: 'WeddingHall',
      component: WeddingHall
    },
    // Nursery
    {
      path: '/nursery',
      name: 'Nursery',
      component: Nursery
    },
    // Donation
    {
      path: '/donation',
      name: 'Donation',
      component: Donation
    },
    // Contact us
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: ContactUs
    },
    // Other pages
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '*',
      redirect: {
        name: 'not-found'
      }
    }
  ],
})
