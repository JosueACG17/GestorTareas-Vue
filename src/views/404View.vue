<template>
  <section class="bg-white">
    <div class="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
      <div class="wf-ull lg:w-1/2 text-center lg:text-start">
        <h1 class="text-9xl font-extrabold text-gray-800 tracking-widest">404</h1>
        <div class="bg-[#FF6A3D] px-2 text-sm rounded absolute">
          Pagina no encontrada
        </div>
        <h1 class="mt-7 text-2xl font-semibold text-gray-800  md:text-3xl">¡Lo siento, te haz perdido bro!</h1>

        <div class="flex items-center gap-x-3">
          <RouterLink to="/" class="mt-5">
            <a
              class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
              <span
                class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

              <span class="relative block px-8 py-3 bg-gray-800 border border-current">
                Regresar
              </span>
            </a>
          </RouterLink>

        </div>
      </div>

      <div class="relative w-full mt-8 lg:w-1/2 lg:mt-0">
        <img class="w-full max-w-lg lg:mx-auto" src="https://merakiui.com/images/components/illustration.svg" alt="">
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup></script>

<style scoped></style>
