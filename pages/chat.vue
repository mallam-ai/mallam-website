<script setup lang="ts">
import { marked } from "marked";

definePageMeta({
  titleLabel: "Chat",
  titleIcon: "i-mdi-chat",
});

const turnstile = ref();

const token = ref("");

const output = ref("");

const outputHTML = computed(() => {
  return marked(output.value);
});

const state = reactive({
  input: "",
});

const working = ref(false);

async function onSubmit(event: any) {
  working.value = true;
  try {
    const { response } = await $fetch("/api/chat", {
      method: "POST",
      immediate: true,
      body: JSON.stringify({
        input: state.input,
        token: token.value,
      }),
    });
    output.value = response;
  } catch (e) {
    output.value = `Error: ${e}`;
  } finally {
    working.value = false;
    turnstile.value?.reset();
  }
}
</script>

<template>
  <div class="flex flex-col w-full md:w-3/4 lg:w-1/2">
    <div class="w-full mb-4">
      <UAlert
        color="amber"
        title="Heads up!"
        description="Chat is currently under development, this is for testing purposes only."
      />
    </div>
    <div class="w-full">
      <UForm :state="state" @submit="onSubmit">
        <UFormGroup label="Input" name="input">
          <UTextarea v-model="state.input" :disabled="working" />
        </UFormGroup>

        <div
          class="py-4 flex flex-col md:flex-row justify-between items-center"
        >
          <div class="mb-4 md:mb-0">
            <NuxtTurnstile v-model="token" ref="turnstile" />
          </div>
          <UButton
            type="submit"
            icon="i-mdi-tray-arrow-up"
            :loading="working"
            :disabled="!token || !state.input"
          >
            Submit
          </UButton>
        </div>
      </UForm>
    </div>
    <div class="w-full" v-if="output">
      <UFormGroup label="Output">
        <article
          class="prose prose-sm lg:prose-base dark:prose-invert"
          v-html="outputHTML"
        ></article>
      </UFormGroup>
    </div>
  </div>
</template>
