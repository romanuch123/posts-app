<template>
  <div id="header">
    <div class="header-container d-flex justify-content-between align-items-center">
      <router-link to="/" class="header-logo">
        Home
      </router-link>
      <div class="auth" v-if="user">
        <span>Hi, {{ user.username }}</span>
        <button class="logout" @click="logout">Logout</button>
      </div>
      <router-link v-else  to="/login" class="header-logo">
        Login
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Header',
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT_USER_REQUEST').then(() => {
        localStorage.removeItem('authUserEmail');
        this.$router.push('/login');
      });
    },
  },
  computed: {
    user() {
      return this.$store.getters.AUTH_USER;
    },
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';
  #header {
    background: $mainColor;
    color: $white;
    .header-container {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      padding: 10px;
      font-size: 18px;
      .header-logo {
        color: $white;
        &:hover {
          text-decoration: none;
        }
      }
      .auth {
        display: flex;
        align-items: center;
      }
      .logout {
        background: transparent;
        border: 1px solid $white;
        border-radius: 5px;
        color: $white;
        margin-left: 10px;
        &:hover {
          color: darken($white, 20%);
          cursor: pointer;
        }
        &:focus {
          outline: none;
        }
      }
    }
    .header-container {
      a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
          color: #ce0000;
        }
      }
    }
  }
</style>
