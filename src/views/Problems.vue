<template>
  <div v-if="isLoading">
    <Loader />
  </div>
  <div v-else class="container lg:px-40 md:px-36 pt-8 pb-16">
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
          :class="getClass(problem.isPublic)"
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
import Loader from "@/components/Loader.vue";

@Component({
  components: {
    Loader,
  },
})
export default class Problems extends Vue {
  private problems: IProblem[] = [];
  private isLoading = true;

  private async mounted() {
    const response = await this.axios.get<IProblem[]>("/problem", {
      headers: { authorization: `Bearer ${this.$cookies.get("authToken")}` },
    });
    this.problems = response.data;
    this.isLoading = false;
  }

  private getClass(isPublic: boolean) {
    return isPublic
      ? "hover:bg-gray-300 py-4 border-b"
      : "hover:bg-gray-300 text-gray-500 hover:text-black py-4 border-b";
  }

  private onClick(code: string) {
    this.$router.push(`problem/${code}`);
  }
}
</script>