<template>
  <div>
    <textarea
      :value="value"
      ref="card"
      class="shadow-card rounded-md py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
      placeholder="Enter a title for this card..."
      @keyup.esc="close"
      @keyup.enter="save"
      @input="$emit('input', $event.target.value)"
    ></textarea>

    <div class="flex">
      <button @click="save" class="rounded-sm py-1 px-3 bg-indigo-700 text-white cursor-pointer hover:bg-indigo-600 outline-none">{{ label }}</button>
      <button @click="close" class="py-1 px-3 ml-1 rounded-md hover:bg-gray-400 cursor-pointer text-gray-500">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      default: 'Add Card',
    },
  },
  mounted() {
    this.$refs.card.focus();
  },
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      this.$emit('saved');
    },
  },
};
</script>