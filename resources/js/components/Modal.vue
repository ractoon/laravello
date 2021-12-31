<template>
  <transition name="appear">
    <div v-if="show" class="overlay fixed z-30 top-0 bottom-0 left-0 w-full h-full bg-black" @click.self="$emit('close')">
      <div class="w-full h-full bg-transparent flex justify-center items-center" @click.self="$emit('close')">
        <div class="shadow-xl" :style="style" @click.self="$emit('close')">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    style() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
      };
    },
  },
}
</script>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>