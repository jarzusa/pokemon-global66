<template>
  <div class="loader">
    <v-row class="rowImg mx-5" justify="center" align="center">
      <v-img
        max-width="100"
        :src="require('@/assets/images/pokeball-logo.png')"
        :lazy-src="require('@/assets/images/pokeball-logo.png')"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              :size="70"
              :width="7"
              color="#0069AD"
              indeterminate
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-row>
  </div>
</template>
<style lang="scss" scoped>
@import "./../assets/variables.scss";
.loader {
  // margin-top: 25%;
  @media (min-width: $min-mobile) and (max-width: $max-mobile) {
    margin-top: 40%;
  }
  @media (min-width: $min-mobile-x) and (max-width: $min-mobile) {
    margin-top: 50%;
  }
  @media (min-width: $min-mobile-xx) and (max-width: $min-mobile-x) {
    margin-top: 60%;
  }
  @media (min-width: $min-mobile-xxx) and (max-width: $min-mobile-xx) {
    margin-top: 65%;
  }
  @media (min-width: $min-mobile-xxxx) and (max-width: $min-mobile-xxx) {
    margin-top: 70%;
  }

  @media (min-width: $min-tablet) and (max-height: $max-tablet) {
    margin-top: 20%;
  }
  @media (min-width: $max-mobile) {
    margin-top: 25%;
  }
}
</style>
