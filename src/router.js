import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import Preview from './views/Preview.vue'
import Post from './views/Post.vue'
import Blog from './views/Blog.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/'
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview
    },
    {
      path: '*',
      redirect: {
        name: 'not-found'
      }
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post
    }
  ]
})
