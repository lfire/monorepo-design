<script lang="ts">
export default {
  name: 'HelloWorld',
};
</script>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getQuery } from '@yarn/lib-utils';

interface AvatarProps {
  msg: string;
}
const props = withDefaults(defineProps<AvatarProps>(), {
  msg: 'Hello',
});
const query = ref('');
onMounted(() => {
  query.value = JSON.stringify(getQuery());
});
</script>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ query }}</p>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
