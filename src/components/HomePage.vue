<template>
  <div class="home-page">
    <h1>Posts</h1>
    <PostList />
  </div>
</template>

<script>
import PostList from './PostList.vue';

export default {
  name: 'homePage',
  components: {
    PostList,
  },
  data() {
    return {
    };
  },
  methods: {
  },
  created() {
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

</style>
