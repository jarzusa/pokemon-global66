<template>
  <div class="main">
    <div class="get-started">
      <v-row class="rowImg mt-16 mx-16" justify="center" align="center">
        <v-img
          max-width="500"
          :src="require('@/assets/images/welcome-picachu_logo.png')"
        ></v-img>
      </v-row>
      <v-row class="mt-16" justify="center" align="center">
        <div>
          <h1 class="col-sm-12 tittle">Welcome to Pokédex</h1>
        </div>
      </v-row>
      <v-row class="mt-16" justify="center" align="center">
        <div class="description">
          <v-col cols="12">
            <h3 class="text">
              The digital encyclopedia created by Professor Oak is an invaluable
              tool to Trainers in the Pokémon world.
            </h3>
          </v-col>
        </div>
      </v-row>
      <v-row class="mt-16 mb-5" justify="center" align="center">
        <v-btn
          class="white--text"
          x-large
          color="#F22539"
          elevation="0"
          rounded
          @click="getListPokemon()"
          >Get started</v-btn
        >
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getListPokemon() {
      this.$router.push("/list");
    },
  },
};
</script>

<style lang="scss">
@import "./../assets/variables.scss";
.main {
  font-weight: bold;
  .tittle {
    color: #353535;
    font-style: normal;
    font-weight: bold;
    line-height: 31px;
    display: flex;
    align-items: center;
    text-align: center;
  }
  .description {
    color: #5e5e5e;
    text-align: center;
    @media (min-width: $breakpoint-size-px) {
      .text {
        white-space: pre-line;
      }
    }
  }
  .rowImg {
    margin-bottom: 12%;
  }
}
</style>
