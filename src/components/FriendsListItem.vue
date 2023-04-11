<template>
  <div v-if="friends">
    <li v-for="friend in friends" :key="friend.id">
      <div class="flex-initial w-3/5">
        <p>Name: {{ friend.name }}</p>
      </div>
    </li>
  </div>
</template>
  
<script>
export default {
  name: "FriendsListItem",

  data() {
    return {
      props: {
        friends: { type: Array, default: () => [] },
      },
    };
  },
};
</script>
  
  <style>
</style>
  