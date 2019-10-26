<template>
  <div class="container lg:px-40 md:px-36 pt-8">
    <div v-if="problem">
      <h1 class="text-3xl font-medium pb-3 text-center">{{ `${problem.code}: ${problem.name}` }}</h1>
      <p class="text-center p-1">Time limit: {{ problem.timeLimit }} sec</p>
      <p class="text-center p-1">Memory limit: {{ problem.memLimit }} MiB</p>
      <hr class="m-4" />
      <!-- <pdf :src="problem.fileUrl"></pdf> -->
      <hr class="m-4" />
      <form enctype="multipart/form-data">
        <h2 class="text-xl font-medium p-3">Submit code</h2>
        <h4 class="text-md p-3">Language</h4>
        <select v-model="lang" class="p-3">
          <option disabled value>Select Language</option>
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >{{ option.text }}</option>
        </select>
        <h4 class="text-md p-3">Upload file</h4>
        <input
          class="p-3 text-md"
          type="file"
          ref="file"
          @change="handleChange($event.target.value)"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
    <div v-else>
      <h1 class="text-3xl font-medium pb-3 text-center">Loading...</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Vue, Model } from "vue-property-decorator";
import { IProblem, FileDetail } from "@/types/problems";
// import pdf from 'vue-pdf';
@Component({
  // components: {
  //   pdf,
  // },
})
export default class Problems extends Vue {
  private problem: IProblem | null = null;
  private srcFile: string | null = null;
  @Model() lang: string = "";
  private readonly options = [
    { text: "C", value: "c" },
    { text: "C++", value: "cpp" }
  ];

  private async mounted() {
    const code = this.$route.params.code;
    const problemResponse = await this.axios.get<IProblem>(`problem/${code}`);
    this.problem = problemResponse.data;
    const fileResponse = await this.axios.get<FileDetail>(
      `problem/${code}/file`
    );
    this.problem!.problemUrl = fileResponse.data.signedUrl;
  }

  private handleChange(value: string) {
    this.srcFile = value;
  }
}
</script>