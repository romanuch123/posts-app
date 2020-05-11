<template>
  <div v-if="isLoading" class="lds-default">
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
  </div>
  <ul v-else-if="posts && posts.length" class="post-list">
    <PostItem v-for="postItem in posts" :key="postItem.id" :postItem="postItem" />
  </ul>
  <p class="empty" v-else>List is empty...</p>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
  name: 'postList',
  components: {
    PostItem,
  },
  data() {
    return {
    };
  },
  computed: {
    posts() {
      return this.$store.getters.POSTS;
    },
    isLoading() {
      return this.$store.getters.IS_LOADING;
    },
  },
  methods: {
  },
  created() {
    this.$store.dispatch('GET_POSTS');
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.empty {
  font-size: 12px;
}

</style>
