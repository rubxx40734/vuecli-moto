<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-7">
        <table class="table align-middle">
          <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in productList" :key="item.id">
            <td style="width: 200px">
              <div style="height: 100px; background-size: cover; background-position: center"
                   :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
            </td>
            <td><a href="#" class="text-dark">{{item.title}}</a></td>
            <td>
              <del class="h6">原價 {{$filters.currency(item.origin_price)}}  元</del>
              <div class="h5">現在只要 {{$filters.currency(item.price)}} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary"
                        @click="getProduct(item.id)"
                        >
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger"
                        @click="addCart(item.id)"
                        :disabled="item.id === status.lodingItem">
                  加到購物車
                <div v-if="item.id === status.lodingItem"
                class="spinner-grow text-info" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                </button>

              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
            <!-- 購物車列表 -->
      <div class="col-md-5">
        <div class="sticky-top">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.product.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                          >
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
                <td>
                  {{item.product.title}}
                  <div class="text-success" v-if="cart.total != cart.final_total">
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <input type="number" class="form-control"
                         v-model="item.qty" @change="updateCart(item)"
                         :disabled="status.lodingItem === item.id"
                         min="0">
                    <div class="input-group-text">/個</div>
                  </div>
                </td>
                <td class="text-end">
                  {{$filters.currency(item.total)}}
                  <small class="text-success"
                  v-if="cart.total != cart.final_total">折扣價：{{$filters.currency(item.final_total)}}</small>
                </td>
              </tr>
            </template>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{$filters.currency(cart.total)}}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success"
              v-if="cart.total != cart.final_total">{{$filters.currency(cart.final_total)}}</td>
            </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control"
            v-model="couponCode" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button"
              @click="UseCoupon">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    //訂單欄位
    <div class="my-5 row justify-content-center">
      <Form class="col-md-6"  v-slot="{ errors}"
            @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field id="email" name="email" type="email" class="form-control"
                  :class="{ 'is-invalid': errors['email'] }"
                   placeholder="請輸入 Email"
                   rules="email|required" v-model="form.user.email"></Field>
                  <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field id="name" name="姓名" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['姓名'] }"
                   placeholder="請輸入姓名"  rules="required"
                   v-model="form.user.name"
                  ></Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field id="tel" name="電話" type="tel" class="form-control"
                   :class="{ 'is-invalid': errors['電話'] }"
                   placeholder="請輸入電話" :rules="isPhone"
                   v-model="form.user.tel"
                  ></Field>
             <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field id="address" name="地址" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['地址'] }"
                   placeholder="請輸入地址"  rules="required"
                  v-model="form.user.address"></Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea name="" id="message" class="form-control" cols="30" rows="10"
                  ></textarea>
        </div>
        <div class="text-end">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      productList: [],
      cart: [],
      status: {
        lodingItem: ''
      },
      orderId: '',
      couponCode: '',
      couponsPrice: [],
      form: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getProductList () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.axios.get(api)
        .then(res => {
          // console.log(res.data.data)
          this.productList = res.data.products
          this.isLoading = false
        })
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.axios.get(url)
        .then(res => {
          console.log(res.data.data)
          this.cart = res.data.data
        })
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    addCart (id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const obj = {
        product_id: id,
        qty: 1
      }
      this.status.lodingItem = id
      this.axios.post(url, { data: obj })
        .then(res => {
          this.status.lodingItem = ''
          this.getCart()
        })
    },
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const obj = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.status.lodingItem = item.id
      this.axios.put(url, { data: obj })
        .then(res => {
          this.status.lodingItem = ''
          this.getCart()
        })
    },
    UseCoupon () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const code = this.couponCode
      this.axios.post(url, { data: { code: code } })
        .then(res => {
          console.log(res)
          this.getCart()
        })
    },
    isPhone (value) {
      const MobileReg = /^(09)[0-9]{8}$/
      return MobileReg.test(value) ? true : '需填寫正確手機格式><'
    },
    createOrder () {
      this.isLoading = true
      const email = document.querySelector('#email')
      const name = document.querySelector('#name')
      const tel = document.querySelector('#tel')
      const address = document.querySelector('#address')
      const message = document.querySelector('#message')
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.axios.post(url, { data: order })
        .then(res => {
          console.log(res)
          console.log(res.data.orderId)
          email.value = ''
          name.value = ''
          tel.value = ''
          address.value = ''
          message.value = ''
          this.getCart()
          this.isLoading = false
          this.$router.push(`/user/checkout/${res.data.orderId}`)
        })
    }
  },
  created () {
    this.getProductList()
    this.getCart()
  }
}
</script>
