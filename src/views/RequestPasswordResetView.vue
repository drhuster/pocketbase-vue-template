<template>
  <main>
    <article>
      <header>
        <h1>Request password reset</h1>
      </header>

      <form @submit="requestReset">
        <label>
          Email:
          <input
            v-model="email"
            autocomplete="email"
            required
            placeholder="ex. email@email.com"
          />
        </label>

        <div v-if="!sendingEmail">
          <button type="submit">Reset password</button>
          <RouterLink to="/login">Login</RouterLink>
        </div>
        <span v-else aria-busy="true">Requesting reset...</span>
      </form>
    </article>
  </main>
</template>

<script setup>
import { useMainStore } from "@/stores/main";
import { ref } from "vue";
const main = useMainStore();
const email = ref("");
const sendingEmail = ref(false);

const requestReset = async (e) => {
  e.preventDefault();
  main.clear();

  sendingEmail.value = true;
  const result = await main.requestPasswordRest(email.value);
  console.log(result);
  sendingEmail.value = false;
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
</style>
