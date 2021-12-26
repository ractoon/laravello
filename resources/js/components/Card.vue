<template>
  <div>
    <div v-if="!editing" class="group shadow-card flex justify-between bg-white rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2">
      <div>
        {{ card.title }}
      </div>
      <div class="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500">
        <div class="text-gray-400 pr-2 hover:text-yellow-700" @click="editing = true">E</div>
        <div class="text-gray-400 hover:text-red-700" @click="cardDelete">D</div>
      </div>
    </div>
    <CardEditor v-else v-model="title" class="mb-2" label="Save Card" @close="editing = false" @saved="cardUpdate" />
  </div>
</template>

<script>
import { EVENT_CARD_UPDATED, EVENT_CARD_DELETED } from '../constants';
import CardUpdate from '../graphql/CardUpdate.gql';
import CardDelete from '../graphql/CardDelete.gql';
import CardEditor from './CardEditor.vue';

export default {
  components: {
    CardEditor,
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editing: false,
      title: this.card.title,
    };
  },
  methods: {
    cardUpdate() {
      const self = this;

      this.$apollo.mutate({
        mutation: CardUpdate,
        variables: {
          id: this.card.id,
          title: this.title,
        },
        update(store, {data: { cardUpdate }}) {
          self.$emit('updated', { store, data: cardUpdate, type: EVENT_CARD_UPDATED });
          self.editing = false;
        },
      });
    },
    cardDelete() {
      const self = this;

      this.$apollo.mutate({
        mutation: CardDelete,
        variables: {
          id: this.card.id,
        },
        update(store, {data: { cardDelete }}) {
          self.$emit('deleted', { store, data: cardDelete, type: EVENT_CARD_DELETED });
        },
      });
    },
  },
}
</script>
