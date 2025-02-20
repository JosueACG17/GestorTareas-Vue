<template>
  <div v-if="!route.meta.hideSidebar">
    <nav class="bg-white border-b  border-gray-200 fixed z-30 w-full">
      <div class="px-3 py-3 lg:px-5 lg:pl-3 ">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start">
            <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" @click="isOpen = !isOpen"
              class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
              <svg id="toggleSidebarMobileHamburger" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"></path>
              </svg>
              <svg id="toggleSidebarMobileClose" class="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
            <a href="#" class="text-xl font-bold flex items-center ml-2">
              <img src="https://demo.themesberg.com/windster/images/logo.svg" class="h-6 mr-2" alt="Windster Logo">
              <span class="self-center whitespace-nowrap">Actividad 1 - Notas</span>
            </a>
          </div>
          <div class="flex items-center">
            <div class="flex text-sm bg-gray-200 rounded-full focus:ring-5 focus:ring-gray-300 ">
              <span class="self-center font-semibold mr-2 ml-3">Josue Chan</span>
              <img class="w-8 h-8 rounded-full"
                src="https://media.licdn.com/dms/image/v2/D4D03AQEJMZ6q4deswg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1713916849194?e=2147483647&v=beta&t=d9eytdUOAq86xdFqqgbQ-uAvXL43m4UeVhT2qBl6eYk"
                alt="user photo">
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="flex overflow-hidden bg-white pt-16">
      <aside id="sidebar" :class="{ 'hidden': !isOpen, 'flex': isOpen }"
        class="fixed z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
        aria-label="Sidebar">

        <div class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div class="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto">
            <div class="space-y-3 ">

              <RouterLink to="/"
                class="flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>


                <span class="mx-2 text-medium font-medium">Tareas</span>
              </RouterLink>
              <RouterLink to="/etiquetas"
                class="flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>

                <span class="mx-2 text-medium font-medium">Etiquetas</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </aside>
      <div class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { RouterView, useRoute } from 'vue-router';
import { ref } from 'vue';
const isOpen = ref(false)
const route = useRoute();


</script>
