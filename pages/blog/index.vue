<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Blog</h1>
    </header>

    <h2>Weekly Wisdom</h2>
    <div
      class="post"
      v-for="(item, index) in weeklyWisdomPosts"
      :key="'posts-' + index"
    >
      <div class="well">
        <div class="media">
          <div class="col-sm-10 col-md-10 col-lg-10">
            <h2 class="media-heading" v-for="(title, index) in item.data.title">
              <NuxtLink :to="'/blog/' + item.uid">{{ title.text }}</NuxtLink>
            </h2>
            <p>
              {{ item.data.content | readMore(200, "...") }}
              <NuxtLink :to="'/blog/' + item.uid">Read more</NuxtLink>
            </p>
            <ul class="list-inline list-unstyled">
              <li>
                <span>
                  <i class="glyphicon glyphicon-calendar"></i>
                  Posted on {{ item.first_publication_date | formatDate }}
                </span>
              </li>
            </ul>
          </div>
          <!-- <div class="hidden-xs col-sm-2 col-md-2 col-lg-2">
            <prismic-image
              :field="item.cover"
              class="img pull-right img-responsive"
            />
          </div> -->
        </div>
      </div>
    </div>
    <br />
    <h2>Mission Dharma Blog</h2>
    <div
      class="post"
      v-for="(item, index) in missionDharmaPosts"
      :key="'posts-' + index"
    >
      <div class="well">
        <div class="media">
          <div class="col-sm-10 col-md-10 col-lg-10">
            <h2 class="media-heading" v-for="(title, index) in item.data.title">
              <NuxtLink :to="'/blog/' + item.uid">{{ title.text }} </NuxtLink>
            </h2>
            <!-- <div class="description" v-for="(content, index) in item.data.content">
                {{content.text}}
            </div>-->
            <p>
              {{ item.data.content | readMore(200, "...") }}
              <NuxtLink :to="'/blog/' + item.uid">Read more</NuxtLink>
            </p>
            <ul class="list-inline list-unstyled">
              <li>
                <span>
                  <i class="glyphicon glyphicon-calendar"></i>
                  Posted on {{ item.first_publication_date | formatDate }}
                </span>
              </li>
            </ul>
          </div>
          <div class="hidden-xs col-sm-2 col-md-2 col-lg-2">
            <!-- <prismic-image
              :field="item.cover"
              class="img pull-right img-responsive"
            /> -->
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
      weeklyWisdomPosts: null,
    };
  },
  async asyncData({ $prismic, params, error }) {
    try {
      const missionDharmaPosts = await $prismic.api.query(
        $prismic.predicates.at("document.type", "blog"),
        { orderings: "[document.publication_date]" }
      );
      const weeklyWisdomPosts = await $prismic.api.query(
        $prismic.predicates.at("document.tags", ["weekly-wisdom"]),
        { orderings: "[document.publication_date]" }
      );
      return {
        missionDharmaPosts: missionDharmaPosts.results,
        weeklyWisdomPosts: weeklyWisdomPosts.results,
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>
