<template>
    <Loading :active="isLoading"></Loading>
    這裡是訂單列表
<table class="table mt-4">
  <thead>
    <tr>
      <th width="120">購買時間</th>
      <th>E-mail</th>
      <th width="120">購買款項</th>
      <th width="120">應付金額</th>
      <th width="100">是否付款</th>
      <th width="200">編輯</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>分類</td>
      <td>標題</td>
      <td class="text-right">
        200
      </td>
      <td class="text-right">
        100
      </td>
      <td>
        <span class="text-success">啟用</span>
      </td>
      <td>
        <div class="btn-group">
          <button class="btn btn-outline-primary btn-sm">編輯</button>
          <button class="btn btn-outline-danger btn-sm">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    getOrderList () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders`
      this.axios.get(api)
        .then(res => {
          console.log(res)
        })
    }
  },
  created () {
    this.getOrderList()
  }
}
</script>
