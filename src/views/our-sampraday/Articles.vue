<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">
        {{pageTitle}}
      </h1>
    </header>
    <div class="post" v-for="(item, index) in articles" :key="'posts-' + index">
      <div class="well">
        <div class="media">
          <div class="col-sm-10 col-md-10 col-lg-10">
            <h2 class="media-heading" v-for="(title, index) in item.data.title">
              <a :href="'/our-sampraday/articles/' + item.uid">{{ title.text }}</a>
            </h2>
            <!-- <div class="description" v-for="(content, index) in item.data.content">
                {{content.text}}
              </div> -->
            <p>{{ item.data.content | readMore(200, '...')  }} <a :href="'/our-sampraday/articles/' + item.uid">Read
                more</a></p>
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
    name: 'Articles',
    data() {
      return {
        articles: null,
        pageTitle: null
      }
    },
    methods: {
      getContent(tag) {
        this.$prismic.client.query(
            this.$prismic.Predicates.at('document.tags', [tag]), {
              orderings: '[my.blog.date desc]'
            }
          )
          .then((document) => {
            if (document) {
              this.articles = document.results
            } else {
              this.$router.push({
                name: 'not-found'
              })
            }
          })
      }
    },
    created() {
      this.getContent(this.$route.params.tag)
    },
    beforeRouteUpdate(to, from, next) {
      next()
    },
    watch: {
      $route(to, from) {
        this.getContent(this.$route.params.tag)
        if (this.$route.params.tag === 'lord-swaminarayan') {
          this.pageTitle = 'Lord Swaminarayan'
        } else if (this.$route.params.tag === 'satsang-philosophy') {
          this.pageTitle = 'Satsang Philosophy'
        } else {
          this.pageTitle = 'Nand Santos'
        }
      }
    },
    updated() {
      this.getContent(this.$route.params.tag)
      if (this.$route.params.tag === 'lord-swaminarayan') {
        this.pageTitle = 'Lord Swaminarayan'
      } else if (this.$route.params.tag === 'satsang-philosophy') {
        this.pageTitle = 'Satsang Philosophy'
      } else {
        this.pageTitle = 'Nand Santos'
      }
    },
  }

</script>
