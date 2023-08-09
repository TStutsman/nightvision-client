<script setup lang="ts">
const props = defineProps<{
  hasSpray: boolean,
}>()
</script>

<template>
    <div class="inventory">
        <h1 :class="{hidden:!hasSpray}">Bear Spray</h1>
    </div>
</template>

<style>
.inventory {
    display: flex;
    place-content: center;
    align-items: center;
    height: 70px;
    width: 180px;
    background-color: var(--nv-c-grey);
    border-radius: 5px;
}
h1 {
    font-size: 2em;
}
.hidden {
  visibility: hidden;
}
</style>