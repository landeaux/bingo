<script setup lang="ts">
const title = ref("Bingo");
useHead({ title });

const genre = ref("");
const wordLength = ref(2);
const result = ref("");
const errorMessage = ref("");

async function onSubmit() {
  try {
    const { data, error } = await useFetch("/api/generate", {
      method: "POST",
      body: {
        genre: genre.value,
        wordLength: wordLength.value,
      },
    });
    if (error && error.value) {
      const errMessage =
        error.value.statusMessage ||
        `Request failed with status ${error.value.statusCode}`;
      throw new Error(errMessage);
    }
    result.value = data.value?.result || "";
    genre.value = "";
    errorMessage.value = "";
  } catch (err) {
    if (err instanceof Error) {
      errorMessage.value = err.message;
    } else {
      errorMessage.value = "Something went wrong";
    }
  }
}
</script>

<template>
  <main class="main">
    <h1>{{ title }}</h1>
    <h2>GPT-Driven Band Name Generator</h2>
    <form @submit.prevent="onSubmit">
      <label for="genre">Genre</label>
      <input
        id="genre"
        v-model="genre"
        type="text"
        name="genre"
        placeholder="Enter a genre"
      />

      <label for="word-length">Word Length</label>
      <input
        id="word-length"
        v-model.number="wordLength"
        type="number"
        name="word-length"
        placeholder="Word length"
        min="1"
        max="7"
      />

      <input type="submit" value="Generate names" />
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-else-if="result" class="result">{{ result }}</div>
  </main>
</template>

<style>
@import url("~/assets/css/main.css");
</style>
