<template>
  <div class="login-wrapper">
    <div>
      <form class="login" @submit.prevent="login">
        <h1>Login</h1>
        <input
          class="form-control login-data"
          required
          v-model="email"
          type="email"
          placeholder="E-mail"/>
          <span class="wrong-email" v-if="!isUserExist">
            User doesn't exist. Try this one Sincere@april.biz
          </span>
        <button type="submit" class="btn login-btn">Login</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      email: '',
      isUserExist: true,
    };
  },
  computed: {
    users() {
      return this.$store.getters.USERS;
    },
  },
  methods: {
    login() {
      const { email } = this;
      const existingUser = this.users.find((el) => el.email === email);
      if (existingUser) {
        localStorage.setItem('authUserEmail', email);
        this.$store.dispatch('AUTH_USER_REQUEST', existingUser).then(() => {
          this.$router.push('/');
        });
      } else {
        this.isUserExist = false;
      }
    },
  },
  created() {
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

h1 {
  margin: 10px;
}
.login-wrapper {
  min-height: 100%;
  width: 100%;
  display: table;
  div {
    display: table-cell;
    vertical-align: middle;
    .login {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      width: 300px;
      .login-data {
        border-radius: 5px;
        border: 1px solid $mainColor;
        padding: 10px;
        color: $mainColor;
      }
      .login-btn {
        margin: 10px 0;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        background: $mainColor;
        padding: 5px;
        color: $white;
        &:hover {
          background: darken($mainColor, 10%);
          cursor: pointer;
        }
      }
    }
  }
}
.wrong-email {
  color: red;
  font-size: 10px;
  text-align: left;
  margin: 3px;
}
</style>
