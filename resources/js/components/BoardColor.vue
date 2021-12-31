<template>
  <div class="w-6 h-6 md:w-8 md:h-8 mr-1 md:mr-2 rounded-sm cursor-pointer flex justify-center items-center text-white text-xl" :class="[colors[color]]" @click="$emit('changed', color)">
    <span v-if="activeColor == color">✓</span>
  </div>
</template>

<script>
import { colorMap500 } from '../utils';

export default {
  props: {
    color: {
      type: String,
      required: true,
    },
    activeColor: {
      type: String,
      required: true,
    },
  },
  computed: {
    colors: () => colorMap500,
  },
}
</script>