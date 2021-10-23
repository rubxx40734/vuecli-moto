<template>
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
           <router-link to="/dashboard/products" class="nav-link">產品</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/order" class="nav-link">訂單</router-link>
        </li>
        <li class="nav-item">
         <router-link to="/dashboard/coupons" class="nav-link">優惠券</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="logout">登出</a>
        </li>
      </ul>
    </div>
     <div class="collapse navbar-collapse text-end" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
           <router-link to="/user/usercart" class="nav-link">購物清單</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      this.axios.post(api)
        .then(res => {
          console.log(res)
          this.$router.push('/login')
        })
    }
  }
}
</script>
