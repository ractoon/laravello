<template>
  <div class="list bg-gray-300 rounded-sm p-2 mr-2">
    <div class="flex justify-between">
      <div class="text-gray-800 pl-2 pb-2 font-bold">{{ list.title }}</div>
    </div>

    <Card v-for="card in list.cards" :key="card.id" :card="card" @deleted="$emit('card-deleted', {...$event, listId: list.id})" @updated="$emit('card-updated', {...$event, listId: list.id})" />

    <CardAddEditor v-if="editing" @close="editing = false" :list="list" @added="$emit('card-added', {...$event, listId: list.id})" />
    <CardAddButton v-else @click="editing = true" />
  </div>
</template>

<script>
import Card from './Card.vue';
import CardAddButton from './CardAddButton.vue';
import CardAddEditor from './CardAddEditor.vue';

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
}
</script>

<style scoped>
.list {
  width: 250px;
  min-width: 250px;
}
</style>