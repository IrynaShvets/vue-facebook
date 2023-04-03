<template>
    <section>
      <h1 class="text-center text-5xl">404 - Page Not Found</h1>
      <p>This page no longer exists or was moved to another location.</p>
  
      <button @click="goTo" class="px-4 py-2 bg-sky-900 text-white rounded-2xl">&lt; Back</button>
    </section>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
    methods: {
      goTo() {
        this.$router.push({ name: 'homePage' })
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  </style>