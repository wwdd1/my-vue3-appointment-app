<script setup lang="ts">
import { computed } from 'vue'
import { type Avatar, type Emits, EMIT_TYPE_CLICK } from './AvatarBase'
import AvatarComponent from './Avatar.vue'
import { createUUID } from '@/lib/utils/id'

const props = defineProps<{
  avatars: Avatar[]
  visibleCount: number
}>()
const emit = defineEmits<Emits<MouseEvent>>()
const avatarsWithId = computed((): Avatar[] => {
  return props.avatars.slice(0, props.visibleCount).map((avatar) => ({
    ...avatar,
    id: createUUID()
  }))
})
const invisibleAvatarCountLabel = computed((): string | null => {
  const diff = props.avatars.length - props.visibleCount
  if (diff > 0) {
    return `+${props.avatars.length - props.visibleCount}`
  } else {
    return null
  }
})

function onClick(event: MouseEvent) {
  console.log('group item click', event)
  emit(EMIT_TYPE_CLICK, event)
}
</script>

<template>
  <div class="flex [&>*:not(:first-child)]:ml-[-.4rem]">
    <AvatarComponent
      v-for="avatar in avatarsWithId"
      :key="avatar.id"
      :initials="avatar.initials"
      :background-color="avatar.backgroundColor"
      @click="onClick"
    ></AvatarComponent>
    <span
      v-if="invisibleAvatarCountLabel"
      class="rounded-full w-12 h-12 flex items-center justify-center border border-white bg-gray border-2 font-bold text-white"
    >
      {{ invisibleAvatarCountLabel }}
    </span>
  </div>
</template>
