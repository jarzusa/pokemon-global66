<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <v-container class="main-container">
        <v-row>
          <v-col cols="5" sm="6" md="6">
            <v-btn
              block
              class="white--text btn-filter"
              color="#F22539"
              elevation="0"
              :disabled="!all"
              rounded
              @click="getAll()"
            >
              <v-icon class="px-3" dark> mdi-format-list-bulleted</v-icon>
              ALL
            </v-btn>
          </v-col>
          <v-col cols="3" sm="6" md="6">
            <v-btn
              block
              class="white--text btn-filter"
              color="#F22539"
              elevation="0"
              :disabled="all"
              rounded
              @click="getFavorites()"
            >
              <v-icon class="px-3" dark> mdi-star</v-icon>
              FAVORITES
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      fixed: false,
      all: false,
      list: [],
    };
  },
  methods: {
    getAll() {
      this.all = false;
      this.$store.dispatch("setListAll");
    },
    getFavorites() {
      this.all = true;
      this.$store.dispatch("setListOnlyFavorite");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./../assets/variables.scss";
</style>
