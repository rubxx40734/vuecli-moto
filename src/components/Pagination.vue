<template>
    <nav aria-label="...">
  <ul class="pagination justify-content-center mt-5">
    <li class="page-item" :class="{'disabled': !pages.has_pre}">
      <a class="page-link" href="" @click.prevent="prePage()">Previous</a>
    </li>
    <li class="page-item" aria-current="page"
    v-for="(page, i) in pages.total_pages" :key="i" :class="{'active':page===pages.current_page}">
      <a class="page-link" href="" @click.prevent="updatePage(page)">{{ page }}</a>
    </li>
    <li class="page-item" :class="{'disabled': !pages.has_next}">
      <a class="page-link" href="" @click.prevent="nextPage()">Next</a>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage (page) {
      this.$emit('emit-pages', page)
    },
    prePage () {
      if (this.pages.has_pre) {
        this.$emit('pre-page', this.pages.current_page - 1)
      }
    },
    nextPage () {
      if (this.pages.has_next) {
        this.$emit('next-page', this.pages.current_page + 1)
      }
    }
  }
}
</script>
