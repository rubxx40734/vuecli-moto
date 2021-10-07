<template>
 <div class="container mt-5">
 <form class="row justify-content-center">
   <div class="col-md-6">
     <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
     <div class="mb-2">
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
        v-model="user.username"
      />
    </div>
    <div class="mb-2">
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        v-model="user.password"
      />
    </div>

    <div class="text-end mt-4">
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="signIn">登入</button>
    </div>
  </div>
</form>
</div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.axios.post(api, this.user)
        .then((res) => {
          // 這邊判斷是否登入成功 如果成功就轉頁面到dashboard  success = true
          if (res.data.success) {
            const token = res.data.token
            const offtime = res.data.expired
            console.log(res)
            document.cookie = `doSomethingOnlyOnce=${token};expires=${new Date(offtime)}`
            this.$router.push('/dashboard/products')
          }
        })
    }
  }
}
</script>
