import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound'
import OurTemple from './views/our-temple/OurTemple'
import Education from './views/our-temple/Education'
import Schedule from './views/our-temple/Schedule'
import Articles from './views/our-sampraday/Articles'
import Article from './views/our-sampraday/Article'
import DailyDarshan from './views/DailyDarshan.vue'
import Post from './views/Post'
import Blog from './views/Blog'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/'
    },
    // Our-temple routes
    {
      path: '/our-temple/weekly-schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/our-temple/calendar'
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
    // Contact us
    {
      path: '/contact-us'
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
  ]
})
