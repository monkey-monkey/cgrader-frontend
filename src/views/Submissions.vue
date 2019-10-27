<template>
  <div class="container lg:px-40 md:px-36 pt-8">
    <h1 class="text-3xl font-semibold pb-8">Submissions</h1>
    <table class="table-fixed w-full">
      <thead>
        <tr class="border">
          <th class="w-1/12 px-2 py-2 border">#</th>
          <th class="w-3/12 px-2 py-2 border">When</th>
          <th class="w-2/12 px-2 py-2 border">Who</th>
          <th class="w-2/12 px-2 py-2 border">Problem</th>
          <th class="w-1/12 px-2 py-2 border">Lang</th>
          <th class="w-3/12 px-2 py-2 border">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(submission, index) of submissions"
          :key="submission._id"
          :class="getClass(index)"
        >
          <td class="px-4 py-2 text-center border">{{ submissions.length - index }}</td>
          <td class="px-4 py-2 text-center border">{{ formatDate(submission.createdAt) }}</td>
          <td class="px-4 py-2 text-center border">{{ submission.user.username }}</td>
          <td class="px-4 py-2 text-center border">{{ submission.problem.code }}</td>
          <td class="px-4 py-2 text-center border">{{ submission.lang }}</td>
          <td class="px-4 py-2 text-center border font-mono">{{ submission.result }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from 'moment-timezone';

@Component
export default class Submissions extends Vue {
  private submissions = [];

  private async mounted() {
    const response = await this.axios.get("submission");
    this.submissions = response.data.reverse();
  }

  private getClass(index: number) {
    return index % 2 === 0 ? 'bg-gray-200' : null;
  }

  private formatDate(timestamps: number) {
    return moment(timestamps).tz('Asia/Bangkok').format("DD/MM/YYYY HH:MM");
  }
}
</script>