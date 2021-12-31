<template>
  <div class="bg-white sm:bg-gray-100 h-full flex justify-center">
    <div class="container mt-2 sm:mt-10 flex flex-col items-center">
      <div class="text-3xl text-blue-700 font-bold mb-10">
        <span>Laravello</span>
      </div>
      <div class="w-full sm:shadow-xl sm:bg-white sm:py-8 sm:px-12">
        <Errors :errors="errors" />

        <div class="w-full text-center text-gray-600 font-bold mb-8">
          Create an account
        </div>

        <form @submit.prevent="register">
          <div class="w-full mb-4">
            <input v-model="email" type="text" class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm" placeholder="Enter email" />
          </div>
          <div class="w-full mb-4">
            <input v-model="name" type="text" class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm" placeholder="Enter full name" />
          </div>
          <div class="w-full mb-4">
            <input v-model="password" type="password" class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm" placeholder="Enter password" />
          </div>
          <div class="w-full mb-6">
            <button type="submit" class="rounded-sm px-4 py-2 text-sm bg-green-500 font-bold outline-none focus:outline-none hover:bg-opacity-75 w-full text-white disabled:opacity-25">Sign Up</button>
          </div>
        </form>

        <div class="bg-gray-400 h-px w-full mb-6"></div>

        <div class="text-center text-sm"><router-link :to="{name: 'login'}" class="text-blue-600 hover:underline">Already have an account? Log in.</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import Register from './graphql/Register.gql';
import { gqlErrors } from './utils';
import Errors from './components/Errors.vue';

export default {
  components: {
    Errors,
  },
  data() {
    return {
      email: null,
      password: null,
      name: null,
      errors: [],
    };
  },
  methods: {
    async register() {
      this.errors = [];

      try {
        const response = await this.$apollo.mutate({
          mutation: Register,
          variables: {
            email: this.email,
            password: this.password,
            name: this.name,
          },
        });

        const user = response.data?.register;
        if (user) {
          this.$store.dispatch('setLoggedIn', true);
          this.$store.commit('setUser', user);
          this.$router.push({ name: 'board' });
        }
      } catch (err) {
        this.errors = gqlErrors(err);
      }
    },
  },
}
</script>

<style scoped>
  .container {
    width: 300px;
    max-width: 300px;
  }

  @media(min-width: 640px) {
    .container {
      width: 400px;
      max-width: 400px;
    }
  }
</style>