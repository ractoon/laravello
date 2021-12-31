<template>
<div>
  <div v-if="!editing" class="list bg-white hover:bg-gray-500 rounded-sm p-2 mr-2 opacity-75 text-black cursor-pointer" @click="startEditing">＋&nbsp;Add new list</div>
  <div v-else class="bg-gray-300 rounded-sm p-2 list" v-on-clickaway="hideEditor">
    <input v-model="title" type="text" ref="title" class="rounded-sm border-blue-600 border-2 py-1 px-2 outline-none w-full text-gray-800 text-sm" placeholder="Enter list title" @keyup.esc="hideEditor" @keypress.enter="addList" />

    <div class="flex">
      <button class="mt-2 rounded-sm py-1 px-3 bg-blue-700 text-white cursor-pointer hover:bg-blue-500 outline-none" @click="addList">Add List</button>
      <div class="flex justify-center items-center mt-2 ml-1 px-3 rounded-md hover:bg-gray-400 cursor-pointer text-gray-500" @click="hideEditor"><div>✖</div></div>
    </div>
  </div>
</div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import ListAdd from '../graphql/ListAdd.gql';
import { EVENT_LIST_ADDED } from '../constants';

export default {
  directives: {
    onClickaway,
  },
  props: {
    board: {
      type: Number|String,
      required: true,
    },
  },
  data() {
    return {
      editing: false,
      title: null,
    };
  },
  methods: {
    hideEditor() {
      this.editing = false;
    },
    startEditing() {
      this.editing = true;
      this.$nextTick(() => this.$refs.title.focus());
    },
    addList() {
      const self = this;

      this.$apollo.mutate({
        mutation: ListAdd,
        variables: {
          title: this.title,
          board: this.board,
        },
        update(store, { data: { listAdd } }) {
          self.$emit('added', { store, data: listAdd, type: EVENT_LIST_ADDED });
          self.title = '';
          self.hideEditor();
        },
      });
    },
  },
}
</script>

<style>

</style>