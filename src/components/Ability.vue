<script setup lang="ts">
import { ref } from 'vue';
defineProps<{name: string, text:string, description:string}>();

const showDesc = ref(false);
</script>

<template>
    <button class="btn-large ability"
     @mouseover="showDesc = true"
     @touchstart="showDesc = true"
     @mouseleave="showDesc = false"
     @touchend="showDesc = false"
     @click="$emit(name)"
    >
        <h3 v-if="!showDesc">{{ text }}</h3>
        <h3 v-if="showDesc">{{ description }}</h3>
    </button>
</template>

<style scoped>
.ability {
    font-size: 1em;
}

button > h3 {
    user-select: none;
    text-align: center;
}
</style>