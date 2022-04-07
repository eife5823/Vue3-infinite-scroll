<script setup>
import { onMounted, reactive, ref } from 'vue';
import request from '../request';

const repoList = reactive({ lists: [] });
const loading = ref(false);
const noData = ref(false);
const count = ref(6); // 每次載入筆數
const page = ref(1);

const getRepoList = (counts, pages) => {
  request
    .get('https://api.github.com/users/aszx87410/repos', {
      params: { per_page: counts, page: pages },
    })
    .then((res) => {
      loading.value = false;
      if (res.length > 0) {
        res.forEach((item) => {
          repoList.lists.push(item);
        });
        page.value += 1;
      } else {
        noData.value = true;
      }
    })
    .catch((error) => console.log(error));
};

const loadMore = () => {
  window.onscroll = () => {
    const bottomOfWindow = document.documentElement.offsetHeight
        - document.documentElement.scrollTop
        - window.innerHeight <= 50;
    if (bottomOfWindow && !loading.value && !noData.value) {
      loading.value = true;
      getRepoList(count.value, page.value);
    }
  };
};

onMounted(() => {
  getRepoList(count.value, page.value);
  loadMore();
});
</script>

<template>
  <section class="repoList">
    <h1>Huli's Repo List</h1>
    <div class="repoList__item" v-for="item in repoList.lists" :key="item.id">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <a :href="item.html_url">{{ item.html_url }}</a>
    </div>
  </section>
</template>

<style>
body {
  margin: 0;
}
.repoList {
  padding: 40px;
  background-color: #d7c4bb;
}
.repoList__item {
  background-color: #fff;
  color: #333;
  padding: 16px;
  margin: 8px 0;
  border-radius: 8px;
}
</style>
