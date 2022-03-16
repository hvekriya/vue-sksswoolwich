<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <div class="row">
        <div class="col-md-8">
          <h1 class="title">{{ pageTitle }}</h1>
        </div>
        <div class="col-md-4">
          <Search />
        </div>
      </div>
    </header>
    <div class="post" v-for="(item, index) in articles" :key="'posts-' + index">
      <div class="well">
        <div class="media">
          <img
            class="media-object pull-left"
            :src="item.data.cover.url"
            alt=""
            width="10%"
          />
          <div class="col-sm-10 col-md-10 col-lg-10">
            <h2 class="media-heading" v-for="(title, index) in item.data.title">
              <NuxtLink :to="`/our-sampraday/${item.uid}`"
                >{{ title.text }}
              </NuxtLink>
            </h2>
            <!-- <div class="description" v-for="(content, index) in item.data.content">
                {{content.text}}
              </div> -->
            <p>
              {{ item.data.content | readMore(300, "...") }}
              <NuxtLink :to="`/our-sampraday/${item.uid}`">Read more</NuxtLink>
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
</template>

<script>
import Search from "../../../components/Search";
export default {
  name: "Articles",
  components: {
    Search,
  },
  data() {
    return {
      pageTitle: null,
      articles: null,
    };
  },

  methods: {
    async getContent(uid) {
      await this.$prismic.api
        .query(this.$prismic.predicates.at("document.tags", [uid]), {
          orderings: "[document.publication_date]",
        })
        .then((document) => {
          this.articles = document.results;
        });
    },
  },

  created() {
    this.getContent(this.$route.params.uid);
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  watch: {
    async $route(to, from) {
      this.getContent(this.$route.params.uid);
      if (this.$route.params.uid === "lord-swaminarayan") {
        this.pageTitle = "Lord Swaminarayan";
      } else if (this.$route.params.uid === "satsang-philosophy") {
        this.pageTitle = "Satsang Philosophy";
      } else if (this.$route.params.uid === "devotees") {
        this.pageTitle = "Great Devotees";
      } else {
        this.pageTitle = "Nand Santos";
      }
    },
  },
  updated() {
    this.getContent(this.$route.params.uid);
    if (this.$route.params.uid === "lord-swaminarayan") {
      this.pageTitle = "Lord Swaminarayan";
    } else if (this.$route.params.uid === "satsang-philosophy") {
      this.pageTitle = "Satsang Philosophy";
    } else if (this.$route.params.uid === "devotees") {
      this.pageTitle = "Great Devotees";
    } else {
      this.pageTitle = "Nand Santos";
    }
  },
};
</script>

<style lang="scss" scoped>
.col-md-8,
.col-md-4 {
  padding: 0;
}
</style>