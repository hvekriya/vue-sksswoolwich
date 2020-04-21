<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Blog</h1>
    </header>

    <h2>Weekly Wisdom</h2>
    <div class="post" v-for="(item, index) in weeklyWisdomPosts" :key="'posts-' + index">
      <div class="well">
        <div class="media">
          <div class="col-sm-10 col-md-10 col-lg-10">
            <h2 class="media-heading" v-for="(title, index) in item.data.title">
              <a :href="'/post/' + item.uid">{{ title.text }}</a>
            </h2>
            <p>
              {{ item.data.content | readMore(200, '...') }}
              <a :href="'/post/' + item.uid">Read more</a>
            </p>
            <ul class="list-inline list-unstyled">
              <li>
                <span>
                  <i class="glyphicon glyphicon-calendar"></i>
                  Posted on {{item.first_publication_date | formatDate}}
                </span>
              </li>
            </ul>
          </div>
          <div class="hidden-xs col-sm-2 col-md-2 col-lg-2">
            <prismic-image :field="item.cover" class="img pull-right img-responsive" />
          </div>
        </div>
      </div>
    </div>
    <br />
    <h2>Mission Dharma Blog</h2>
    <div class="post" v-for="(item, index) in missionDharmaPosts" :key="'posts-' + index">
      <div class="well">
        <div class="media">
          <div class="col-sm-10 col-md-10 col-lg-10">
            <h2 class="media-heading" v-for="(title, index) in item.data.title">
              <a :href="'/post/' + item.uid">{{ title.text }}</a>
            </h2>
            <!-- <div class="description" v-for="(content, index) in item.data.content">
                {{content.text}}
            </div>-->
            <p>
              {{ item.data.content | readMore(200, '...') }}
              <a :href="'/post/' + item.uid">Read more</a>
            </p>
            <ul class="list-inline list-unstyled">
              <li>
                <span>
                  <i class="glyphicon glyphicon-calendar"></i>
                  Posted on {{item.first_publication_date | formatDate}}
                </span>
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
  name: "Blog",
  data() {
    return {
      missionDharmaPosts: null,
      weeklyWisdomPosts: null
    };
  },
  methods: {
    getMissionDharmaBlog() {
      this.$prismic.client
        .query(this.$prismic.Predicates.at("document.type", "blog"), {
          orderings: "[my.blog.date desc]"
        })
        .then(document => {
          if (document) {
            this.missionDharmaPosts = document.results;
          } else {
            this.$router.push({
              name: "not-found"
            });
          }
        });
    },
    getWeeklyWisdom() {
      this.$prismic.client
        .query(
          this.$prismic.Predicates.at("document.tags", ["weekly-wisdom"]),
          {
            orderings: "[my.blog.date desc]"
          }
        )
        .then(document => {
          if (document) {
            this.weeklyWisdomPosts = document.results;
          } else {
            this.$router.push({
              name: "not-found"
            });
          }
        });
    }
  },
  created() {
    this.getMissionDharmaBlog();
    this.getWeeklyWisdom();
  },
  beforeRouteUpdate(to, from, next) {
    this.getMissionDharmaBlog();
    this.getWeeklyWisdom();
    next();
  }
};
</script>
