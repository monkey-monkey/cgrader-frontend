<template>
  <div id="app">
    <nav class="flex items-center bg-orange-700 p-3">
      <img class="h-12 pr-3" src="@/assets/logo_transparent_crop.png" />
      <div class="flex-1 flex justify-around">
        <router-link class="text-white hover:text-orange-300" to="/" >Home</router-link>
        <router-link class="text-white hover:text-orange-300" to="/problems" >Problems</router-link>
        <router-link class="text-white hover:text-orange-300" to="/submissions">Submissions</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/css/tailwind.scss";
</style>
