<template>
  <Loading :active="isLoading"></Loading>
  查看更多的頁面
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/user/usercart">購物車</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ product.title }}</h2>
        <div>{{ product.category }}</div>
        <div>{{ product.description }}</div>
        <img :src="product.imageUrl" alt="" class="img-fluid mb-3">
      </article>
      <div class="col-4">
        <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
        <del class="h6" v-if="product.price">原價 {{ $filters.currency(product.origin_price )}} 元</del>
        <div class="h5" v-if="product.price">現在只要 {{ $filters.currency(product.price) }} 元</div>
        <hr>
        <button type="button" class="btn btn-outline-danger"
                @click="addToCart(product.id)"
                :disabled="product.id === this.status.lodingItem">
           <div v-if="product.id === this.status.lodingItem"
                class="spinner-grow text-info" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
          加到購物車
        </button>
      </div>
    </div>
    數量 {{product.qty}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      status: {
        lodingItem: ''
      },
      id: ''
    }
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      this.axios.get(api).then((response) => {
        console.log(response.data)
        this.isLoading = false
        if (response.data.success) {
          this.product = response.data.product
        }
      })
    },
    addToCart (id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const obj = {
        product_id: id,
        qty: 1
      }
      this.status.lodingItem = id
      this.axios.post(url, { data: obj })
        .then(res => {
          this.status.lodingItem = ''
          console.log(res.data.data.qty)
          this.product.qty = res.data.data.qty
          // this.$router.push('user/usercart')
        })
    }
  },
  created () {
    console.log(this.$route)
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>
