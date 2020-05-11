<template>
  <div v-if="isLoading" class="lds-default">
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
  </div>
  <div v-else class="post-page">
    <h1 class="post-page__title">{{ postInfo && postInfo.title }}</h1>
    <p class="post-page__info">
      {{ postInfo && postInfo.body }}
      <span>{{ author && author.username }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'postPage',
  data() {
    return {
    };
  },
  props: {
    id: String,
  },
  computed: {
    postInfo() {
      return this.$store.getters.POST_INFO;
    },
    isLoading() {
      return this.$store.getters.IS_LOADING;
    },
    users() {
      return this.$store.getters.USERS;
    },
    author() {
      return this.users && this.users.find((el) => el.id === this.postInfo.userId);
    },
  },
  methods: {
  },
  created() {
    this.$store.dispatch('GET_POST_INFO', this.id);
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.post-page {
  &__title {
    font-size: 20px;
    color: $mainColor;
    &::first-letter {
      text-transform: uppercase;
    }
  }
  &__info {
    border: 1px solid $mainColor;
    border-radius: 8px;
    background: #f9f9f9;
    width: 90%;
    margin: 0 auto;
    padding: 5px;
    line-height: 2;
    span {
      font-weight: bold;
      text-align: right;
      display: block;
      margin-right: 10px;
    }
    &::first-letter {
      text-transform: uppercase;
    }
  }
}
</style>
