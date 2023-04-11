<template>
    <div class="relative">
    <header-app class="fixed z-10 top-0 left-0 w-screen border-b-2 border-b-white" />
    <sidebar-home
      class="fixed w-[250px] h-[100%] overflow-y-auto bg-[#001524]"
    />
    <section class="absolute overflow-y-auto top-[80px] right-[20%]">
        <h1>Friends</h1>
    </section>
    </div>
</template>

<script>

    export default {
        name: "FriendsPage",
        
    }
</script>

<style lang="scss" scoped>

</style>