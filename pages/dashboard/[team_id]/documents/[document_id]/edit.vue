<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

definePageMeta({
  middleware: ["auth"],
});

const { data: team, refresh: refreshTeam } = await useCurrentTeam();

const { data: document, refresh: refreshDocument } = await useCurrentDocument();

const state = reactive({
  title: document.value.title,
  content: document.value.content,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.title) {
    errors.push({ path: "title", message: "Required" });
  }
  if (!state.content) {
    errors.push({ path: "content", message: "Required" });
  }
  if (state.content.length < 10) {
    errors.push({ path: "content", message: "Must be at least 10 characters" });
  }
  return errors;
};

const working = ref(false);

async function onSubmit(event: FormSubmitEvent<any>) {
  working.value = true;
  try {
    await $fetch("/api/documents/update", {
      method: "POST",
      headers: decorateHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(
        Object.assign(event.data, { documentId: document.value.id })
      ),
    });
    navigateTo({
      name: "dashboard-team_id-documents-document_id",
      params: { team_id: team.value.id, document_id: document.value.id },
    });
  } finally {
    working.value = false;
  }
}
</script>

<template>
  <SkeletonDashboard
    title-icon="i-mdi-pencil-box-outline"
    title-name="Update Document"
    :active-team-display-name="team.displayName"
  >
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4 w-full"
      @submit="onSubmit"
    >
      <UFormGroup label="Document Id" name="id">
        <label class="text-sm ps-2">{{ document.id }}</label>
      </UFormGroup>

      <UFormGroup label="Title" name="title">
        <UInput v-model="state.title" />
      </UFormGroup>

      <UFormGroup label="Content" name="content">
        <UTextarea v-model="state.content" :rows="24" />
      </UFormGroup>

      <UButton
        type="submit"
        label="Update"
        icon="i-mdi-pencil-box-outline"
        :loading="working"
        :disabled="working"
      ></UButton>
    </UForm>
  </SkeletonDashboard>
</template>
