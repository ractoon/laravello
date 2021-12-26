<template>
  <CardEditor v-model="title" @close="close" @saved="addCard" />
</template>

<script>
import { EVENT_CARD_ADDED } from '../constants';
import CardAdd from '../graphql/CardAdd.gql';
import CardEditor from './CardEditor.vue';

export default {
  components: {
    CardEditor,
  },
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: null,
    };
  },
  methods: {
    addCard() {
      const self = this;

      this.$apollo.mutate({
        mutation: CardAdd,
        variables: {
          title: this.title,
          listId: this.list.id,
          order: this.list.cards.length + 1,
        },
        update(store, {data: { cardAdd }}) {
          self.$emit('added', { store, data: cardAdd, type: EVENT_CARD_ADDED });
          self.close();
        },
      });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>