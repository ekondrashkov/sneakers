<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  loggedIn: boolean
  onSignIn: (email: string, password: string) => Promise<void>
  onSignUp: (email: string, password: string) => Promise<void>
  onLogOff: () => Promise<void>
  onClose: () => void
}

const enum SignAction {
  SIGN_IN = 'Sign In',
  SIGN_UP = 'Sign Up',
  LOG_OFF = 'Log Off'
}

const action = ref<SignAction>(SignAction.SIGN_IN)
const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const errorText = ref('')

const onSignTypeToggle = (type: SignAction): void => {
  action.value = type
  email.value = ''
  password.value = ''
  repeatPassword.value = ''
}

const props = defineProps<Props>()
const isDisabled = ref(false)

const onSignUserAction = async (type: SignAction): Promise<void> => {
  try {
    isDisabled.value = true
    errorText.value = ''

    if (type === SignAction.SIGN_UP) {
      await props.onSignUp(email.value, password.value)
    } else if (type === SignAction.SIGN_IN) {
      await props.onSignIn(email.value, password.value)
    } else if (type === SignAction.LOG_OFF) {
      await props.onLogOff()
    }
    props.onClose()
  } catch (error) {
    console.error(`${type} failed`, error.message)
    errorText.value = error.message
  } finally {
    isDisabled.value = false
  }
}
</script>

<template>
  <div
    class="absolute right-0 top-[100%] w-64 flex flex-col p-2 bg-white rounded-xl shadow-lg z-10 border border-slate-100"
  >
    <div v-if="loggedIn">
      <RouterLink
        to="/profile"
        class="block w-full text-gray-500 hover:text-black mb-2"
        @click="onClose"
        >My profile</RouterLink
      >
      <RouterLink
        to="/orders"
        class="block w-full text-gray-500 hover:text-black mb-2"
        @click="onClose"
        >Orders</RouterLink
      >
      <button
        class="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200 active:bg-red-700"
        :disabled="isDisabled"
        @click="onSignUserAction(SignAction.LOG_OFF)"
      >
        Log Off
      </button>
    </div>

    <form
      v-else
      @submit.prevent="
        onSignTypeToggle(action === SignAction.SIGN_IN ? SignAction.SIGN_UP : SignAction.SIGN_IN)
      "
    >
      <h5 class="mb-2 font-bold">
        {{ action === SignAction.SIGN_IN ? 'Sign In to your account' : 'Create an account' }}
      </h5>
      <div class="flex flex-col w-full gap-y-2 mb-2">
        <input
          type="text"
          placeholder="Email"
          v-model="email"
          :disabled="isDisabled"
          class="w-full border border-slate-300 placeholder:text-slate-300 rounded-lg p-2 text-sm outline-none focus:border-slate-400 transition duration-200"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          :disabled="isDisabled"
          class="w-full border border-slate-300 placeholder:text-slate-300 rounded-lg p-2 text-sm outline-none focus:border-slate-400 transition duration-200"
        />
        <input
          v-show="action === SignAction.SIGN_UP"
          type="password"
          placeholder="Repeat password"
          v-model="repeatPassword"
          :disabled="isDisabled"
          class="w-full border border-slate-300 placeholder:text-slate-300 rounded-lg p-2 text-sm outline-none focus:border-slate-400 transition duration-200"
        />
        <span class="block text-red-400 text-sm">
          {{ errorText }}
        </span>
        <button
          class="w-full bg-lime-500 text-white p-2 rounded-lg disabled:bg-slate-300 hover:bg-lime-600 transition duration-200 active:bg-lime-700"
          :disabled="!email || !password || isDisabled"
          @click="onSignUserAction(action)"
        >
          {{ action === SignAction.SIGN_IN ? 'Sign In' : 'Sign Up' }}
        </button>
      </div>
      <span class="block text-slate-400 mb-2 text-sm">
        {{
          action === SignAction.SIGN_IN ? "Don't have an account?" : 'Already have an account?'
        }}</span
      >
      <button
        class="w-full bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white p-2 rounded-lg transition duration-200"
        :disabled="isDisabled"
      >
        {{ action === SignAction.SIGN_IN ? 'Sign Up' : 'Sign In' }}
      </button>
    </form>
  </div>
</template>
