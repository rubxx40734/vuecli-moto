<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/user/usercart">用戶端範例</router-link>
    </div>
  </nav>
  <p>這裡只是購物車而已</p>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>

<script>

import ToastMessages from '../components/ToastMessages.vue'
import emitter from '../methods/emitter.js'
export default {
  data () {
    return {

    }
  },
  components: { ToastMessages },
  provide () {
    return {
      emitter
    }
  },
  created () {

  }
}
</script>
