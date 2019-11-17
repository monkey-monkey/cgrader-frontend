<template>
  <div id="app">
    <nav class="flex items-center bg-orange-700 p-3">
      <img class="h-12 pr-3" src="@/assets/logo_transparent_crop.png" />
      <div class="flex-1 flex justify-around">
        <div :key="label" v-for="{label, to} of routes" class="flex items-center">
          <router-link class="text-white hover:text-orange-300" :to="to">{{ label }}</router-link>
        </div>
        <div v-if="loggedIn()">
          <Logout />
        </div>
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
    Logout,
  },
})
export default class App extends Vue {
  private routes = [
    { label: "Home", to: "/" },
    { label: "Problems", to: "/problems" },
    { label: "Submissions", to: "/submissions" },
  ];
  private loggedIn() {
    return Vue.cookies.get("authToken");
  }
}
</script>
