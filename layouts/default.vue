<template>
  <v-app dark>
    <v-main class="app_main">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../assets/variables.scss";
</style>
