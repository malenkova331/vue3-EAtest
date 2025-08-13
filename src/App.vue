<template>
  <NavBar />
  <router-view />
</template>

<script setup>
import NavBar from './components/navBar.vue'
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  color: #2c3e50;
}
</style>
