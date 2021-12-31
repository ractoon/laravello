<template>
  <div class="list bg-gray-300 rounded-sm p-2 mr-2">
    <div class="flex justify-between">
      <div class="text-gray-800 pl-2 pb-2 font-bold">{{ list.title }}</div>
    </div>

    <Card v-for="card in list.cards" :key="card.id" :card="card" @deleted="$emit('card-deleted', {...$event, listId: list.id})" @updated="$emit('card-updated', {...$event, listId: list.id})" />

    <CardAddEditor v-if="editing" @close="editing = false" :list="list" @added="$emit('card-added', {...$event, listId: list.id})" />
    <CardAddButton v-if="!editing && canAddCard" @click="editing = true" />
  </div>
</template>

<script>
import Card from './Card.vue';
import CardAddButton from './CardAddButton.vue';
import CardAddEditor from './CardAddEditor.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Card,
    CardAddButton,
    CardAddEditor,
  },
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  computed: mapState({
    canAddCard(state) {
      return this.list.board.owner.id == state.user.id;
    },
  }),
}
</script>

<style scoped>
.list {
  width: 250px;
  min-width: 250px;
}
</style>