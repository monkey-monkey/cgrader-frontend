<template>
  <div class="container lg:px-40 md:px-36 pt-8">
    <div v-if="problem">
      <ProblemHeader v-if="problemDetail" :problemHeader="problemDetail" />
      <hr class="m-4" />
      <div class="flex items-center">
        <div class="mr-4">Problem file</div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="openPdfFile()"
        >Open file</button>
      </div>
      <hr class="m-4" />
      <div class="mb-8">Submit Code</div>
      <form class="pl-4" enctype="multipart/form-data" @submit="handleSubmit">
        <div class="flex items-center mb-4">
          <div class="mr-4">Language</div>
          <div class="inline-block relative w-64">
            <select
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              v-model="lang"
            >
              <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
              >{{ option.text }}</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="flex items-center mb-8">
          <div class="mr-4">Upload file</div>
          <label class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
            <input type="file" class="hidden" @change="handleFileUpload" />
            Select file
          </label>
          <div v-if="srcFile">{{ srcFile.name }}</div>
        </div>
        <div class="flex w-full justify-center">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >Submit</button>
        </div>
      </form>
    </div>
    <div v-else>
      <Loader />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IProblem, FileDetail, ProblemDetail } from "@/types/problems";
import Loader from "@/components/Loader.vue";
import ProblemHeader from "@/components/ProblemHeader.vue";
import * as jwt from "jsonwebtoken";

@Component({
  components: {
    Loader,
    ProblemHeader
  }
})
export default class Problems extends Vue {
  private lang: string = "";
  private problem: IProblem | null = null;
  private srcFile: string | null = null;
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

  public get problemDetail(): ProblemDetail | null {
    return this.problem
      ? {
          name: this.problem.name,
          code: this.problem.code,
          timeLimit: this.problem.timeLimit,
          memLimit: this.problem.memLimit
        }
      : null;
  }

  private openPdfFile() {
    if (this.problem) {
      window.open(this.problem!.problemUrl, "_blank");
    }
  }

  private getFileExtension(file: File): string {
    const arr = file.name.split('.');
    return arr[arr.length - 1];
  }

  private handleFileUpload(e: any) {
    if (e) {
      const file = e.currentTarget.files[0];
      const ext = this.getFileExtension(file);
      if (ext === 'c' || ext === 'cpp') {
        this.srcFile = file;
      } else {
        alert('Please upload only C/C++ file');
      }
    }
  }

  private handleSubmit(e: any) {
    e.preventDefault();
    const token: string = this.$cookies.get("authToken") as string;
    const { userId } = jwt.verify(token, process.env
      .VUE_APP_SECRET as string) as { userId: string };
    const formData = new FormData();
    formData.append("file", this.srcFile!);
    formData.append("userId", userId);
    formData.append("problemId", this.problem!._id);
    formData.append("lang", this.lang);
    this.axios.post("submission", formData);
    this.$router.push("/submissions");
  }
}
</script>