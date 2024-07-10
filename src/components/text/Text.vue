<script setup lang="ts">
import { type Props, type Emits } from './TextBase'

defineProps<Props>()
defineEmits<Emits<MouseEvent>>()
</script>

<template>
  <span>
    <slot>
      {{ text }}
    </slot>
  </span>
</template>
