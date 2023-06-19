<script setup lang="ts">
const title = ref("Bingo");
useHead({ title });

const genreInput = ref("");
const result = ref("");

async function onSubmit() {
  genreInput.value = "";
  const { data } = await useFetch("/api/generate");
  result.value = data.value?.result || "";
}
</script>

<template>
  <main>
    <h1>{{ title }}</h1>
    <h2>Generate Band Names</h2>
    <form @submit.prevent="onSubmit">
      <label for="genre">Genre:</label>
      <input
        id="genre"
        v-model="genreInput"
        type="text"
        name="genre"
        placeholder="Enter a genre"
      />
      <input type="submit" value="Generate names" />
    </form>
    <div>{{ result }}</div>
  </main>
</template>
