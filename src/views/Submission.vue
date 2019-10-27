<template>
  <div>This is submission</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Submission extends Vue {
  async mounted() {
    const response = await this.axios.get("submission");
  }
}
</script>