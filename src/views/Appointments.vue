<script setup lang="ts">
import { ref } from 'vue'

import HeaderContentLayout from '../layouts/HeaderContentLayout.vue'
import TextInput from '../components/input/TextInput.vue'
import SelectInput, { type OptionItemType } from '../components/input/SelectInput.vue'
import DateTimeInput from '../components/input/DateTimeInput.vue'
import Button from '../components/button/Button.vue'
import Avatar from '@/components/avatar/Avatar.vue'
import AvatarGroup from '@/components/avatar/AvatarGroup.vue'

const avatars = ref([
  {
    initials: 'MC',
    backgroundColor: '#832135'
  },
  {
    initials: 'SA',
    backgroundColor: '#398361'
  },
  {
    initials: 'AS',
    backgroundColor: '#613983'
  },
  {
    initials: 'HG',
    backgroundColor: '#836913'
  }
])

const x = ref('Hello world')
const y = ref()
const z = ref(new Date())

const dataSource = new Promise<OptionItemType[]>((res) => {
  res([
    { id: '1', label: 'Playstation 5' },
    { id: '2', label: 'Xbox One' },
    { id: '3', label: 'Nintendo Switch' },
    { id: '4', label: 'Steam Deck' }
  ])
})

function onClick() {
  console.log(x.value)
  console.log(y.value)
  console.log(z.value)
}
</script>

<template>
  <HeaderContentLayout>
    <template v-slot:default>
      <div>
        <TextInput type="text" label="hello world" v-model="x"> </TextInput>
        <SelectInput v-model="y" placeholder="Choose one" :data-source="dataSource"></SelectInput>
        <DateTimeInput v-model="z"></DateTimeInput>
        <Button label="Click Me!" @click="onClick"> Click </Button>
      </div>

      <div>
        <Avatar
          :initials="avatars[0].initials"
          :background-color="avatars[0].backgroundColor"
        ></Avatar>
        <AvatarGroup :avatars="avatars" :visible-count="3"></AvatarGroup>
      </div>
    </template>
    <template v-slot:header>
      <div>header content</div>
    </template>
  </HeaderContentLayout>
</template>
