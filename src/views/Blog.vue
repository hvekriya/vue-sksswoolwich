<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">
        Misson Dharma Blog
      </h1>
      <p>by Nilkanth class</p>
    </header>
    <div class="post" v-for="(item, index) in posts" :key="'posts-' + index">
      <div class="well">
        <div class="media">
          <div class="col-sm-10 col-md-10 col-lg-10">
            <h2 class="media-heading" v-for="(title, index) in item.data.title">
              <a :href="'/post/' + item.uid">{{ title.text }}</a>
            </h2>
            <!-- <div class="description" v-for="(content, index) in item.data.content">
                {{content.text}}
              </div> -->
            <p>{{ item.data.content | readMore(200, '...')  }} <a :href="'/post/' + item.uid">Read more</a></p>
            <ul class="list-inline list-unstyled">
              <li>
                <span>
                  <i class="glyphicon glyphicon-calendar"></i>Posted on {{item.first_publication_date | formatDate}}
                </span>
              </li>
              </li>
            </ul>
          </div>
          <div class="hidden-xs col-sm-2 col-md-2 col-lg-2">
            <prismic-image :field="item.cover" class="img pull-right img-responsive" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Blog',
    data() {
      return {
        posts: null
      }
    },
    methods: {
      getContent() {
        this.$prismic.client.query(
            this.$prismic.Predicates.at('document.type', 'blog'), {
              orderings: '[my.blog.date desc]'
            }
          )
          .then((document) => {
            if (document) {
              this.posts = document.results
            } else {
              this.$router.push({
                name: 'not-found'
              })
            }
          })
      }
    },
    created() {
      this.getContent()
    },
    beforeRouteUpdate(to, from, next) {
      this.getContent()
      next()
    }
  }

</script>
