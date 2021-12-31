<template>
  <div>
    <button class="header-btn" @click="showBoards = !showBoards">Boards</button>
    <DropdownMenu :show="showBoards" @close="showBoards = false">
      <div class="text-gray-600 text-xs font-semibold mb-2 ml-1">BOARDS</div>
      <router-link v-for="board in userBoards" :key="board.id" :to="{name: 'board', params: { id: board.id }}" @click.native="showBoards = false" :class="[`bg-${board.color}-100`]" class="rounded-sm opacity-100 hover:opacity-75 text-gray-700 font-bold cursor-pointer flex mb-1">
        <div class="w-10 rounded-sm rounded-r-none" :class="[`bg-${board.color}-200`]"></div>
        <div class="p-2">{{ board.title }}</div>
      </router-link>

      <div class="round-sm hover:bg-gray-200 p-2 underline cursor-pointer mt-2" @click="showModal = true">Add new board</div>

      <BoardAddModal :show="showModal" @close="showModal = false" />
    </DropdownMenu>
  </div>
</template>

<script>
import DropdownMenu from './DropdownMenu.vue';
import BoardAddModal from './BoardAddModal.vue';
import UserBoards from '../graphql/UserBoards.gql';
import { mapState } from 'vuex';
import { colorMap100, colorMap200 } from '../utils';

export default {
  components: {
    DropdownMenu,
    BoardAddModal,
  },
  apollo: {
    userBoards: {
      query: UserBoards,
      variables() {
        return {
          userId: this.userId,
        };
      },
      skip() {
        return !this.userId;
      },
    },
  },
  data() {
    return {
      showBoards: false,
      showModal: false,
    };
  },
  computed: {
    colorMap100: () => colorMap100,
    colorMap200: () => colorMap200,
    ...mapState({
      userId: state => state.user.id,
    })
  },
}
</script>

<style>

</style>