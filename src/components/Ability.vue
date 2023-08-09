<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  ability: string
}>()

const showDesc = ref(false);
</script>

<template>
    <div @mouseover="showDesc = true" @mouseleave="showDesc = false" @click="$emit(ability)" class="button">
        <h3 v-if="!showDesc" class="name">
            <slot name="name"></slot>
        </h3>
        <h3 v-if="showDesc" class="description">
            <slot name="description"></slot>
        </h3>
    </div>
</template>

<style scoped>
.button {
    display: flex;
    place-content: center;
    place-items: center;
    width: 250px;
    height: 70px;
    padding: 10px;
    background-color: var(--nv-c-grey);
    border-radius: 5px;
}
.button h3 {
    user-select: none;
    text-align: center;
}
@media (hover: hover) {
    .button:hover {
        background-color: var(--nv-c-lightgrey);
        color: var(--nv-c-grey);
        cursor: pointer;
    }
}
.button:active {
    background-color: var(--nv-v-darkgrey);
    color: var(--nv-c-lightgrey);
}
</style>