<template>
 <index />
</template>

<script>
import Index from "./components/Index.vue";

export default {
 components: {
  Index,
 },
};
</script>

<style>
html,
body {
 background-color: #fff;
 background-size: 400px 400px, 400px 400px, 400px 40px, 40px 40px;
 background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
 background-image: linear-gradient(
   rgba(160, 160, 160, 0.14) 1px,
   transparent 1px
  ),
  linear-gradient(90deg, rgba(160, 160, 160, 0.14) 1px, transparent 1px),
  linear-gradient(rgba(160, 160, 160, 0.14) 1px, transparent 1px),
  linear-gradient(90deg, rgba(160, 160, 160, 0.14) 1px, transparent 1px);
}

#app {
 font-family: Avenir, Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 text-align: center;
 color: #2c3e50;
 margin-top: 50px;
}
</style>
