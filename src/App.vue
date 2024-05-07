<template>
  <div id="base">
    <header>
      <h1>Pocketbase Vue Template</h1>

      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: teal;
  color: white;
  padding: 16px;
}

nav {
  display: flex;
  gap: 10px;
}

nav a {
  color: white;
}

#base {
  display: flex;
  flex-direction: column;
}
</style>
