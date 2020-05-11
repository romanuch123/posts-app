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
    <h2>Comments</h2>
    <ul class="comments">
      <li v-for="commentsItem in postInfo.comments" :key="commentsItem.id" class="comments__item">
        <span class="comments__item__name">{{ commentsItem.name }}</span>
        <span class="comments__item__body">{{ commentsItem.body }}</span>
      </li>
    </ul>
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
      return this.users && this.users
        .find((el) => el.id === (this.postInfo && this.postInfo.userId));
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

h2 {
  margin: 5px;
  font-weight: bold;
}
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
.comments {
  &__item {
    border: 1px solid black;
    border-radius: 5px;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 10px;
    padding: 5px;
    &__name {
      display: block;
      font-weight: bold;
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
}
</style>
