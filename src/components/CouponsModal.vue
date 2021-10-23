<template>
  <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input type="text" class="form-control" id="title"
                   placeholder="請輸入標題" v-model="tempCoupons.title">
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input type="text" class="form-control" id="coupon_code"
                   placeholder="請輸入優惠碼" v-model="tempCoupons.code">
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="date" class="form-control" id="due_date"
                  v-model="due_date">
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input type="number" class="form-control" id="price"
                    placeholder="請輸入折扣百分比" v-model="tempCoupons.percent">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                     :true-value="1"
                     :false-value="0" v-model="tempCoupons.is_enabled"
                    id="is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"
          @click="this.$emit('update-coupons', this.tempCoupons)"
                  >更新優惠券
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  data () {
    return {
      modal: {},
      tempCoupons: {},
      due_date: ''
    }
  },
  props: {
    coupons: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    coupons () {
      this.tempCoupons = this.coupons
      // 這邊是參考老師範例
      const dateAndTime = new Date(this.tempCoupons.due_date * 1000)
        .toISOString().split('T')
      this.due_date = dateAndTime
    },
    due_date () {
      this.tempCoupons.due_date = Math.floor(new Date(this.due_date) / 1000)
      // 這邊是我自己寫的  功能正常但沒辦法顯示西年月日
      // this.due_date = new Date().getTime()
      // console.log(this.due_date)
      // this.tempCoupons.due_date = this.due_date
    }
  },
  methods: {
    showModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
  }
}
</script>
