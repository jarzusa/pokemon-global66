<template>
  <v-container v-if="!loading" class="main-container">
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-text-field
            solo
            v-model="namePokemon"
            label="Search.."
            prepend-inner-icon="mdi-magnify"
            @keydown.enter="searchPokemon"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <v-list v-if="list.length > 0" justify="center" align="center">
      <v-list-item-group v-model="model">
        <v-list-item
          v-for="(pokemon, i) in list"
          :key="i"
          class="item"
          @click="searchPokemon(pokemon)"
        >
          <v-list-item-content>
            <v-row>
              <v-col cols="10" class="text--left">
                <v-list-item-title v-text="pokemon.name"></v-list-item-title>
              </v-col>
              <v-col cols="2" class="text--rigth">
                <v-list-item-icon>
                  <v-icon large :color="getColor(pokemon.fav)" :key="i"
                    >mdi-star</v-icon
                  >
                </v-list-item-icon>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list v-else justify="center" align="center">
      <v-list-item-group v-model="model">
        <div>No hay datos</div>
      </v-list-item-group>
    </v-list>

    <v-dialog v-model="dialog" persistent max-width="850">
      <v-card>
        <div class="back-wallpaper-pokedex">
          <v-card-title class="text-h5">
            <v-spacer></v-spacer>
            <v-icon @click="dialog = false">mdi-close-circle</v-icon>
          </v-card-title>
          <center>
            <v-img class="imgPokedex" :src="urlImg" :lazy-src="urlImg"></v-img>
          </center>
        </div>
        <v-card-text class="mt-7 description">
          <v-row>
            <v-col cols="4" sm="6" class="pokedex" bold> <p>Name:</p></v-col>
            <v-col cols="8" sm="6" class="pokedex"> {{ name }} </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" sm="6" class="pokedex"> <p>Weight:</p> </v-col>
            <v-col cols="8" sm="6" class="pokedex">{{ weight }} </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" sm="6" class="pokedex"> <p>Height:</p> </v-col>
            <v-col cols="8" sm="6" class="pokedex"> {{ height }} </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" sm="6" class="pokedex"> <p>Types:</p> </v-col>
            <v-col cols="8" sm="6" class="pokedex">
              <v-row>
                <v-col cols="12" sm="3" v-for="(type, i) in types" :key="i">
                  {{ type.type.name }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="">
          <v-btn
            class="white--text btn-share"
            color="#F22539"
            elevation="0"
            rounded
            v-clipboard:copy="message"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            Share to my friends
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn elevation="0" rounded color="white" @click="dialog = false">
            <v-icon @click="addFavorite()" :color="getColor(fav)" large
              >mdi-star</v-icon
            >
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  <v-container v-else>
    <loader></loader>
  </v-container>
</template>
<script>
import Backend from "@/services/BackendService.js";
import Loader from "@/components/Loader";
import VueClipboard from "vue-clipboard2";
export default {
  layout: "footer",
  components: {
    Loader,
  },
  data() {
    return {
      message: "Jose Arzusa",
      dialog: false,
      loading: true,
      fixed: false,
      pokemons: [],
      namePokemon: null,
      model: null,
      name: "",
      height: "",
      weight: "",
      types: [],
      fav: false,
      urlImg:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
      idPokedex: null,
    };
  },
  created() {
    this.getPokemons();
  },
  computed: {
    list() {
      return this.$store.getters["getListAll"];
    },
  },
  methods: {
    onCopy: function (e) {
      console.log("Portapapeles: " + e.text);
      this.dialog = false;
    },
    onError: function (e) {
      console.log("No se pudo copiar el texto al portapapeles");
      console.log(e);
    },
    getColor(fav) {
      if (fav) {
        return "#ECA539";
      } else {
        return "grey lighten-1";
      }
    },
    searchPokemon(item) {
      // e.preventDefault();
      Backend.searchPokemon(item.name)
        .then((response) => {
          console.log(response.data);
          // this.pokemons = response.data.results;
          this.viewPokemon(response.data);
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
    },
    getPokemons() {
      this.$store.dispatch("getPokemonsApi");

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    viewPokemon(item) {
      console.log(item);
      this.dialog = true;
      this.name = item.name;
      this.height = item.height;
      this.weight = item.weight;
      this.types = item.types;
      this.urlImg = item.sprites?.other["official-artwork"].front_default;
      this.idPokedex = item.name;
      let existFav = this.$store.getters["getAllFavorites"].filter(
        (p) => p === item.name
      );
      this.fav = existFav.length < 1 ? false : true;
      console.log(this.fav);
      this.message =
        "Name: " +
        this.name +
        ", Height: " +
        this.height +
        ", Weight: " +
        this.weight +
        "";
    },
    addFavorite() {
      if (this.idPokedex != null) {
        this.$store.dispatch("newFavorite", { id: this.idPokedex });
      }
      this.getPokemons();
    },
    copyToClipBoard() {
      var content = document.getElementById("textArea");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./../assets/variables.scss";
</style>
