<template>
    <Loading :active="isLoading"></Loading>
    <div class="text-end">
      <div class="button btn btn-primary" type="button"
      @click="openModal(true)">
        新增一個產品
      </div>
    </div>
    <table class="table mt-4">
  <thead>
    <tr>
      <th width="120">分類</th>
      <th>產品名稱</th>
      <th width="120">原價</th>
      <th width="120">售價</th>
      <th width="100">是否啟用</th>
      <th width="200">編輯</th>
    </tr>
  </thead>
  <tbody>
    <tr  v-for="item in products" :key="item.id">
      <td>{{item.category}}</td>
      <td>{{item.title}}</td>
      <td class="text-right">
        {{item.origin_price}}
      </td>
      <td class="text-right">
        {{item.price}}
      </td>
      <td>
        <span class="text-success" v-if="item.is_enabled">啟用</span>
        <span class="text-success" v-else>停用</span>
      </td>
      <td>
        <div class="btn-group">
          <button class="btn btn-outline-primary btn-sm"
          @click="openModal(false, item)">編輯</button>
          <button class="btn btn-outline-danger btn-sm"
          @click="opendelmodal(item)">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<ProductModal ref="productModal"
v-bind:product="tempProduct"
@update-product="updateProduct"></ProductModal>

<DelModal ref="delmodal"
v-bind:item="tempProduct"
@checkdel="checkDel"></DelModal>
</template>

<script>
import ProductModal from '../components/ProductsModal.vue'
import DelModal from '../components/DelModal.vue'
export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DelModal
  },
  inject: ['emitter'],
  methods: {
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },
    closeModal () {
      this.tempProduct = {}
      const productComponent = this.$refs.productModal
      productComponent.hideModal()
    },
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`
      console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH)
      this.isLoading = true
      this.axios.get(api)
        .then(res => {
          console.log(res.data)
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
    },
    updateProduct (item) {
      this.tempProduct = item
      this.isLoading = true
      // 這是新增的方法
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethods = 'post'

      // 這邊是編輯的方法
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethods = 'put'
      }

      this.axios[httpMethods](api, { data: this.tempProduct })
        .then(res => {
          console.log(res)
          if (res.data.success) {
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功'
            })
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗><',
              content: res.data.messages
            })
          }
          this.closeModal()
          this.tempProduct = {}
          this.getProducts()
        })
    },

    // 新增刪除視窗
    opendelmodal (item) {
      const delmodal = this.$refs.delmodal
      this.tempProduct = { ...item }
      delmodal.showModal()
    },
    // 確認刪除品項
    checkDel (item) {
      const delmodal = this.$refs.delmodal
      const id = item.id
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`
      console.log(api)
      this.axios.delete(api)
        .then(res => {
          console.log(res)
          delmodal.hideModal()
          this.getProducts()
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
