<script setup>
// import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';

const repoList = reactive({ lists: [] });
const loading = ref(false);
const count = ref(6); // 每次載入筆數

const getRepoList = (counts) => {
  const url = 'https://api.github.com/users/aszx87410/repos';
  const headers = new Headers();
  headers.append('Accept', 'application/vnd.github.v3+json');
  headers.append('Authorization', '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');

  const config = {
    method: 'GET',
    headers,
    redirect: 'follow',
  };
  fetch(url, config).then((response) => response.json())
    .then((result) => {
      repoList.lists = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < counts.value; i++) {
        repoList.lists.push(result[i]);
      }
    })
    .catch((error) => console.log('error', error));
};

const loadMore = () => {
  loading.value = true;
  setTimeout(() => {
    count.value += 6;
    loading.value = false;
    getRepoList(count);
  }, 3000);
};

onMounted(() => {
  getRepoList(count);
});
</script>

<template>
  <section class="repoList">
    <h1>Huli's Repo List</h1>
    <div v-infinite-scroll="loadMore">
      <div class="repoList__item" v-for="item in repoList.lists" :key="item.id">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <a :href="item.html_url">{{ item.html_url }}</a>
      </div>
    </div>
    <p v-if="loading.value">Loading...</p>
  </section>
</template>

<style>
body {
  margin: 0;
}
.repoList {
  padding: 40px;
  background-color: #D7C4BB;
}
.repoList__item {
  background-color: #fff;
  color: #333;
  padding: 16px;
  margin: 8px 0;
  border-radius: 8px;
}
</style>
