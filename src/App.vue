<template>
  <div id="app">
    <nav class="flex items-center justify-between flex-wrap bg-orange-700 p-3">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <img class="h-16 w-full" src="@/assets/logo_transparent_crop.png">
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-orange-200 hover:text-white mr-4"
          >Docs</a>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/css/tailwind.scss";
</style>
