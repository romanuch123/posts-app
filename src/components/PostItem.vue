<template>
  <li class="post-item">
    <router-link :to="`/posts/${postItem.id}`" class="post-item__title post-item__btn">
       {{ postItem && postItem.title }}
    </router-link>
    <router-link :to="`/users/${postItem.userId}`" class="author post-item__btn">
       {{ author && author.username }}
    </router-link>
  </li>
</template>

<script>

export default {
  name: 'postItem',
  props: {
    postItem: Object,
  },
  data() {
    return {
    };
  },
  computed: {
    users() {
      return this.$store.getters.USERS;
    },
    author() {
      return this.users && this.users.find((el) => el.id === this.postItem.userId);
    },
  },
  methods: {
  },
  created() {
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.post-item {
  border: 1px solid black;
  border-radius: 5px;
  background: $white;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 5px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__btn {
    text-decoration: none;
    display: inline-block;
    width: 60%;
    color: $mainColor;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px 3px;
    &::first-letter {
      text-transform: uppercase;
    }
    &.author {
      width: 30%;
      border: none;
      background: $mainColor;
      color: $white;
      &:hover {
        background: darken($mainColor, 10%);
      }
    }
  }
}
</style>
