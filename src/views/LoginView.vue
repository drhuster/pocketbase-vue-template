<template>
  <main>
    <article>
      <header>
        <h1>Login</h1>
      </header>

      <form @submit="login">
        <label>
          Email:
          <input
            v-model="email"
            autocomplete="email"
            required
            placeholder="ex. email@email.com"
          />
        </label>

        <label>
          Password:
          <input v-model="password" type="password" required />
        </label>
        <p class="error" v-if="!loginSuccess">
          Username and password combination not recognized.
        </p>
        <div v-if="!loggingIn">
          <button type="submit">Login</button>
          <RouterLink to="/register">Register</RouterLink>
          <br />
          <br />
          <RouterLink to="/request-password-reset">Forgot password</RouterLink>
        </div>
        <span v-else aria-busy="true">Logging in...</span>
      </form>
    </article>
  </main>
</template>

<script setup>
import { useMainStore } from "@/stores/main";
import { ref } from "vue";
import router from "@/router";
const main = useMainStore();
const email = ref("");
const password = ref("");
const loginSuccess = ref(true);
const loggingIn = ref(false);

const login = async (e) => {
  e.preventDefault();
  main.clear();

  loggingIn.value = true;
  try {
    loginSuccess.value = await main.login(email.value, password.value);
  } catch (error) {
    loginSuccess.value = false;
  }
  loggingIn.value = false;
  if (loginSuccess.value) {
    router.push("/dashboard");
  }
};
</script>

<style scoped>
main {
  min-height: 82vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  margin-right: 20px;
}

form {
  margin: 0;
}
</style>
