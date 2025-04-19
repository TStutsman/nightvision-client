<script setup lang="ts">
const { numStacks } = defineProps<{numStacks:number}>();
</script>

<template>
    <svg class="match-stack" v-if="numStacks == 0" width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    </svg>

    <svg class="match-stack" v-if="numStacks == 1" width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8H5" stroke="#D5D7D1"/>
    </svg>

    <svg class="match-stack" v-if="numStacks == 2" width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8H5" stroke="#D5D7D1"/>
        <path d="M0 6H5" stroke="#D5D7D1"/>
    </svg>

    <svg class="match-stack" v-if="numStacks == 3" width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8H5" stroke="#D5D7D1"/>
        <path d="M0 6H5" stroke="#D5D7D1"/>
        <path d="M0 4H5" stroke="#D5D7D1"/>
    </svg>

    <svg class="match-stack" v-if="numStacks == 4" width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8H5" stroke="#D5D7D1"/>
        <path d="M0 6H5" stroke="#D5D7D1"/>
        <path d="M0 4H5" stroke="#D5D7D1"/>
        <path d="M0 2H5" stroke="#D5D7D1"/>
    </svg>

    <svg class="match-stack" v-if="numStacks == 5" width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 9H5" stroke="#D5D7D1"/>
        <path d="M0 7H5" stroke="#D5D7D1"/>
        <path d="M0 5H5" stroke="#D5D7D1"/>
        <path d="M0 3H5" stroke="#D5D7D1"/>
        <path d="M0 1H5" stroke="#D5D7D1"/>
    </svg>

    <svg class="match-stack" v-if="numStacks == 6" width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 9H5" stroke="#D5D7D1"/>
        <path d="M0 7H5" stroke="#D5D7D1"/>
        <path d="M0 5H5" stroke="#D5D7D1"/>
        <path d="M0 3H5" stroke="#D5D7D1"/>
        <path d="M0 1H5" stroke="#D5D7D1"/>
        <path d="M6 9H11" stroke="#D5D7D1"/>
    </svg>

    <svg class="match-stack" v-if="numStacks == 7" width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 9H5" stroke="#D5D7D1"/>
        <path d="M0 7H5" stroke="#D5D7D1"/>
        <path d="M0 5H5" stroke="#D5D7D1"/>
        <path d="M0 3H5" stroke="#D5D7D1"/>
        <path d="M0 1H5" stroke="#D5D7D1"/>
        <path d="M6 9H11" stroke="#D5D7D1"/>
        <path d="M6 7H11" stroke="#D5D7D1"/>
    </svg>

    <svg class="match-stack" v-if="numStacks == 8" width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 9H5" stroke="#D5D7D1"/>
        <path d="M0 7H5" stroke="#D5D7D1"/>
        <path d="M0 5H5" stroke="#D5D7D1"/>
        <path d="M0 3H5" stroke="#D5D7D1"/>
        <path d="M0 1H5" stroke="#D5D7D1"/>
        <path d="M6 9H11" stroke="#D5D7D1"/>
        <path d="M6 7H11" stroke="#D5D7D1"/>
        <path d="M6 5H11" stroke="#D5D7D1"/>
    </svg>

    <svg class="match-stack" v-if="numStacks == 9" width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 9H5" stroke="#D5D7D1"/>
        <path d="M0 7H5" stroke="#D5D7D1"/>
        <path d="M0 5H5" stroke="#D5D7D1"/>
        <path d="M0 3H5" stroke="#D5D7D1"/>
        <path d="M0 1H5" stroke="#D5D7D1"/>
        <path d="M6 9H11" stroke="#D5D7D1"/>
        <path d="M6 7H11" stroke="#D5D7D1"/>
        <path d="M6 5H11" stroke="#D5D7D1"/>
        <path d="M6 3H11" stroke="#D5D7D1"/>
    </svg>

    <svg class="match-stack" v-if="numStacks == 10" width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 9H5" stroke="#D5D7D1"/>
        <path d="M0 7H5" stroke="#D5D7D1"/>
        <path d="M0 5H5" stroke="#D5D7D1"/>
        <path d="M0 3H5" stroke="#D5D7D1"/>
        <path d="M0 1H5" stroke="#D5D7D1"/>
        <path d="M6 9H11" stroke="#D5D7D1"/>
        <path d="M6 7H11" stroke="#D5D7D1"/>
        <path d="M6 5H11" stroke="#D5D7D1"/>
        <path d="M6 3H11" stroke="#D5D7D1"/>
        <path d="M6 1H11" stroke="#D5D7D1"/>
    </svg>
</template>

<style>
svg.match-stack {
    height: 1.5em;
    width: 1.5em;

    margin-right: 5px;
}

svg.match-stack>* {
    stroke: var(--yellow);
}

@media screen and (min-width: 967px) {
    svg.match-stack {
        height: 2em;
        width: 2em;

        margin-right: 10px;
    }
}
</style>