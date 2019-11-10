<template>
  <div id="app">
    <nav class="flex items-center bg-orange-700 p-3">
      <img class="h-12 pr-3" src="@/assets/logo_transparent_crop.png" />
      <div class="flex-1 flex justify-around">
        <router-link class="text-white hover:text-orange-300" to="/">Home</router-link>
        <router-link class="text-white hover:text-orange-300" to="/problems">Problems</router-link>
        <router-link class="text-white hover:text-orange-300" to="/submissions">Submissions</router-link>
        <!-- <div v-if="loggedIn()"> -->
          <Logout />
        <!-- </div> -->
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/css/tailwind.scss";
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Logout from "@/components/Logout.vue";

@Component({
  components: {
    Logout
  }
})
export default class App extends Vue {
  private loggedIn() {
    console.log(Vue.cookies.get("authToken"));
    return Vue.cookies.get("authToken");
  }
}
</script>
