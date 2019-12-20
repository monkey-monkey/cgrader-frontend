<template>
  <div class="container lg:px-40 md:px-36 pt-8 pb-16">
    <h1 class="text-3xl font-semibold pb-8">Problems</h1>
    <table class="table-fixed">
      <thead>
        <tr class="border-b">
          <th class="w-1/6 px-2 py-2">#</th>
          <th class="w-1/2 px-2 py-2">Name</th>
          <th class="w-1/6 px-2 py-2">Time limit (s)</th>
          <th class="w-1/6 px-2 py-2">Memory limit (MiB)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="problem._id"
          v-for="problem of problems"
          class="hover:bg-gray-300 py-4 border-b"
          @click="onClick(problem.code)"
        >
          <td class="px-4 py-3 text-center">{{ problem.code }}</td>
          <td class="px-4 py-3 text-center">{{ problem.name }}</td>
          <td class="px-4 py-3 text-center">{{ problem.timeLimit }}</td>
          <td class="px-4 py-3 text-center">{{ problem.memLimit }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IProblem } from "@/types/problems";
@Component
export default class Problems extends Vue {
  private problems: IProblem[] = [];

  private async mounted() {
    const response = await this.axios.get<IProblem[]>("/problem", {
      headers: { authorization: `Bearer ${this.$cookies.get("authToken")}` },
    });
    this.problems = response.data;
  }

  private onClick(code: string) {
    this.$router.push(`problem/${code}`);
  }
}
</script>