<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <a href="javascript:history.back()">Go back</a>
      <div class="row">
        <div class="col-md-8">
          <h1 class="title">Search results</h1>
        </div>
        <div class="col-md-4">
          <Search />
        </div>
      </div>
    </header>
    <div>
      <p>
        Showing search results for <b>{{ search_query }}</b>
      </p>
      <div
        class="post"
        v-for="(item, index) in articles"
        :key="'posts-' + index"
      >
        <div class="well">
          <div class="media">
            <img
              class="media-object pull-left"
              :src="item.data.cover.url"
              alt=""
              width="10%"
            />
            <div class="col-sm-10 col-md-10 col-lg-10">
              <h2
                class="media-heading"
                v-for="(title, index) in item.data.title"
              >
                <a :href="'/our-sampraday/articles/' + item.uid">{{
                  title.text
                }}</a>
              </h2>
              <!-- <div class="description" v-for="(content, index) in item.data.content">
                {{content.text}}
              </div> -->
              <p>
                {{ item.data.content | readMore(300, "...") }}
                <a :href="'/our-sampraday/articles/' + item.uid">Read more</a>
              </p>
              <!-- <ul class="list-inline list-unstyled">
              <li>
                <span>
                  <i class="glyphicon glyphicon-calendar"></i>Posted on
                  {{ item.first_publication_date | formatDate }}
                </span>
              </li>
            </ul> -->
            </div>
            <div class="hidden-xs col-sm-2 col-md-2 col-lg-2">
              <prismic-image
                :field="item.cover"
                class="img pull-right img-responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search";
export default {
  name: "SearchResults",
  components: {
    Search,
  },
  data() {
    return {
      articles: null,
      pageTitle: null,
      search_query: "",
    };
  },
  methods: {
    getContent(search_query) {
      this.$prismic.client
        .query([
          this.$prismic.Predicates.at("document.type", "article"),
          this.$prismic.Predicates.fulltext("document", search_query),
        ])
        .then((response) => {
          this.articles = response.results;
        });
    },
  },

  created() {
    this.getContent(this.$route.query.search);
    this.search_query = this.$route.query.search;
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
};
</script>

<style lang="scss" scoped>
.col-md-8,
.col-md-4 {
  padding: 0;
}
</style>
