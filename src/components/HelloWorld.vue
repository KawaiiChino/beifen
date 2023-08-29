<script>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
export default {
  data() {
    return {
      student: {
        name: 'tom',
        age: 18,
        hobby: ['音游', '唱歌', '旅行'],
        friends: [
          { name: 'jerry', age: 19 },
          { name: 'tony', age: 17 },
        ]
      }
    }
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    <ul>
      <li v-for="(h, index) in student.hobby" :key="index">
        {{ h }}
      </li>
    </ul>
    <ul>
      <li v-for="(f, index) in student.friends" :key="index">
        {{ f.name }} - {{ f.age }}
      </li>
    </ul>
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
