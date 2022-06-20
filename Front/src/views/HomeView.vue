<template>
  <Albums />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import Albums from '../components/Albums.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    Albums,
  },
});
</script>
