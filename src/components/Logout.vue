<template>
  <button
    class="bg-transparent hover:bg-white text-white font-semibold hover:text-orange-700 py-2 px-4 border border-white hover:border-orange-700 rounded"
    @click="logout()"
  >Logout</button>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class Logout extends Vue {
  private logout() {
    Vue.cookies.remove('authToken');
    location.reload();
  }
}
</script>