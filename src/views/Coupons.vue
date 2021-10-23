<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, key) in coupons" :key="key">
        <td>{{item.title}}</td>
        <td>{{item.percent}}</td>
        <td>{{$filters.getLocalTime(item.due_date)}}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span  class="text-muted" v-else>未起用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm"
             @click="openModal(false, item)"
            >編輯</button>
            <button class="btn btn-outline-danger btn-sm"
            @click="opendelmodal(item)"
            >刪除</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <CouponsModal ref="couponsmodal"
  :coupons="tempCoupons"
  @update-coupons="updateCoupons"></CouponsModal>

  <DelModal ref="delmodal"
  :item="tempCoupons"
  @checkdel="deleteCoupon"></DelModal>
</template>

<script>
import CouponsModal from '../components/CouponsModal.vue'
import DelModal from '../components/DelModal.vue'
export default {
  data () {
    return {
      tempCoupons: {},
      coupons: [],
      pagination: '',
      isNew: false,
      isLoading: false
    }
  },
  components: { CouponsModal, DelModal },
  inject: ['emitter'],
  methods: {
    getCoupons () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.isLoading = true
      this.axios.get(api)
        .then(res => {
          console.log(res.data)
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
          this.isLoading = false
        })
    },
    updateCoupons (item) {
      // 新增
      this.isLoading = true
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethods = 'post'

      // 修改
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
        httpMethods = 'put'
      }

      this.axios[httpMethods](api, { data: item })
        .then(res => {
          if (res.data.success) {
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功'
            })
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗><',
              content: res.data.message.join('、')
            })
          }
          this.$refs.couponsmodal.hideModal()
          this.getCoupons()
          this.isLoading = false
        })
    },
    openModal (isNew, item) {
      if (this.isNew) {
        this.tempCoupons = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupons = { ...item }
      }
      this.isNew = isNew
      const coupons = this.$refs.couponsmodal
      coupons.showModal()
    },
    deleteCoupon (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
      this.axios.delete(api)
        .then(res => {
          if (res.data.success) {
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功'
            })
          }
          this.$refs.delmodal.hideModal()
          this.getCoupons()
        })
    },
    // 跳出刪除視窗
    opendelmodal (item) {
      const delmodal = this.$refs.delmodal
      this.tempCoupons = { ...item }
      delmodal.showModal()
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
