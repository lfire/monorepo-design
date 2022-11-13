<script>
import { getQuery } from '@yarn/lib-utils';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    query: String,
  },
  mounted() {
    this.query = JSON.stringify(getQuery());
  },
};
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
