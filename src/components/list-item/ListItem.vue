<script setup lang="ts">
import { type Props, type Emits } from './ListItemBase'
defineProps<Props>()
defineEmits<Emits<MouseEvent>>()
</script>

<template>
  <div>ListItem</div>
</template>
