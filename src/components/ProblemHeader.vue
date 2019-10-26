<template>
  <div class="flex flex-col items-center">
    <div class="text-4xl">{{ `${problemHeader.code}: ${problemHeader.name}` }}</div>
    <div class="text-base">Time limit: {{ problemHeader.timeLimit }} sec</div>
    <div class="text-base">Memory limit: {{ problemHeader.memLimit }} MiB</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ProblemDetail } from "@/types/problems";
@Component
export default class ProblemHeader extends Vue {
  @Prop() private problemHeader!: ProblemDetail;
}
</script>