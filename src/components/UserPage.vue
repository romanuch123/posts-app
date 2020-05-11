<template>
 <div v-if="isLoading" class="lds-default">
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
  </div>
  <div v-else class="user-page">
    <h1 class="user-page__title">{{ userInfo && userInfo.name }}</h1>
    <!-- <h1 class="user-page__title">{{ userInfo }}</h1> -->
    <p class="user-page__info">
      <span>Some user info!</span>
      <br/>
      Username: {{ userInfo && userInfo.username }}
      <br/>
      Email: {{ userInfo && userInfo.email }}
      <br/>
      Phone: {{ userInfo && userInfo.phone }}
      <br/>
      Street: {{ userInfo && userInfo.address.street }}
      <br/>
      Suite: {{ userInfo && userInfo.address.suite }}
      <br/>
      City: {{ userInfo && userInfo.address.city }}
      <br/>
      Zip-code: {{ userInfo && userInfo.address.zipcode }}
      <br/>
      Website: {{ userInfo && userInfo.website }}
      <br/>
      Company name: {{ userInfo && userInfo.company.name }}
      <br/>
    </p>
  </div>
</template>

<script>
export default {
  name: 'userPage',
  data() {
    return {
    };
  },
  props: {
    id: String,
  },
  computed: {
    userInfo() {
      return this.$store.getters.USER_INFO;
    },
    isLoading() {
      return this.$store.getters.IS_LOADING;
    },
  },
  methods: {
  },
  created() {
    this.$store.dispatch('GET_USER_INFO', this.id);
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';
.user-page {
  &__title {
    font-size: 20px;
    color: $mainColor;
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
    }
  }
}
</style>
