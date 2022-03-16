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
          <div class="navbar-form" id="search">
            <div class="form-group">
              <input
                type="text"
                class="form-control search"
                placeholder="Search"
                v-model="search_query"
              />
            </div>
            <button class="btn btn-primary search" v-on:click="newSearch">
              Search
            </button>
          </div>
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
                <NuxtLink :to="`/our-sampraday/${item.uid}`"
                  >{{ title.text }}
                </NuxtLink>
              </h2>
              <!-- <div class="description" v-for="(content, index) in item.data.content">
                {{content.text}}
              </div> -->
              <p>
                {{ item.data.content | readMore(300, "...") }}
                <NuxtLink :to="`/our-sampraday/${item.uid}`"
                  >Read more
                </NuxtLink>
                <a :href="'/our-sampraday/' + item.uid">Read more</a>
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
    async getContent(search_query) {
      await this.$prismic.api
        .query([
          this.$prismic.predicates.at("document.type", "article"),
          this.$prismic.predicates.fulltext("document", search_query),
        ])
        .then((response) => {
          this.articles = response.results;
        });
    },
    newSearch() {
      this.getContent(this.search_query);
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
