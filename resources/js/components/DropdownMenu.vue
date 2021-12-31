<template>
  <transition name="appear">
    <div v-if="show" v-on-clickaway="close" class="dropdown-menu absolute bg-gray-100 rounded-sm mt-2 text-sm text-gray-600 border-gray-200 shadow w-64 overflow-y-auto z-10 p-2">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
  directives: {
    onClickaway,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
}
</script>

<style scoped>
.dropdown-menu {
  max-height: 80%;
}
</style>