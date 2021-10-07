<template>
 <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1"
   ref="delmodal" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-danger">
        <h5 class="modal-title text-white" id="exampleModalLabel">此商品將從產品列出移除!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        [{{item.title}}]  刪除後將無法恢復
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary"
        @click="$emit('checkdel',item)">確認</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import Modal from 'bootstrap/js/dist/modal'
import mixinmodal from '../mixin/ModalMixin.js'

export default {
  props: {
    item: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      modal: {},
      tempProduct: {}
    }
  },
  // watch: {
  //   product () {
  //     this.tempProduct = this.item
  //   }
  // },
  mixins: [mixinmodal]
//   methods: {
//     showModal () {
//       this.modal.show()
//     },
//     hideModal () {
//       this.modal.hide()
//     }
//   },
//   mounted () {
//     this.modal = new Modal(this.$refs.delmodal)
//   }
}
</script>
