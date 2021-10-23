<template>
  <navbar>
  </navbar>
  <!-- <div class="container">
      <router-view/>
  </div> -->
  <div class="container mt-3 position-relative border">
    新竹關之琳
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>

<script>
// import mitt from 'mitt'
// const emitter = mitt()  下面這行等於這兩行
import emitter from '../methods/emitter.js'
import Navbar from '../components/Navbar.vue'
import ToastMessages from '../components/ToastMessages.vue'

export default {
  components: { Navbar, ToastMessages },
  created () {
    // 文件參考https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
    var token = document.cookie.replace(/(?:(?:^|.*;\s*)doSomethingOnlyOnce\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // 文件參考https://github.com/axios/axios/search?q=axios.defaults.headers.common
    this.axios.defaults.headers.common.Authorization = token

    const api = `${process.env.VUE_APP_API}api/user/check`
    this.axios.post(api, token)
      .then((res) => {
        // 如果這邊沒cookie紀錄 會跳轉到登入頁面
        if (!res.data.success) {
          this.$router.push('/login')
        }
      })
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>
