<script setup lang="ts">
import { watch } from 'vue';
import './../assets/base.css'
const props = defineProps<{
  revealed: boolean
  illuminated: boolean
}>()
const emit = defineEmits(['deilluminate', 'showTile']);

watch(() => props.illuminated == true, () => {
    setTimeout(() => {
        emit('deilluminate')
    }, 1000)
});

</script>

<template>
    <div @click="$emit('showTile')" class="tile-container" :class="{selectable:!revealed}">
        <div class="tile" :class="{flipped:revealed, unflipped:!revealed, bright:illuminated}">
            <i :class="{hidden:!revealed, unhidden:revealed}">
                <slot v-if="revealed" name="icon"></slot>
            </i>
            <div class="tile-name" :class="{hidden:!revealed, unhidden:revealed}">
                <h3>
                    <slot v-if="revealed" name="description"></slot>
                </h3>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tile-container {
    max-width: 125px;
    padding: var(--tile-hover-padding);
    position: relative;
    border-radius: calc(var(--tile-b-rad)*2);
}
.tile{
    background-color: var(--nv-c-grey);
    height: var(--tile-height);
    width: var(--tile-width);
    border-radius: var(--tile-b-rad);
    transform-origin: center;
    transition: background-color .5s;
}
.bright{
    background-color: var(--nv-c-lightgrey);
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  /* TODO: fix these later */
  width: 32px; 
  height: 32px;

  color: var(--color-text);
}

.tile-name {
  display: flex;
  place-items: center;
  place-content: center;
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
  user-select: none;
}

.flipped {
    animation: flip .5s 1 forwards;
}

.unflipped {
    animation: unflip .5s 1 forwards;
}

.hidden {
    visibility: hidden;
    transition-property: visibility;
    transition-delay: .5s;
}
.unhidden {
    visibility: visible;
}

@keyframes flip {
    from {
        margin: 0;
        transform: scaleX(1);
        /* width: var(--tile-width); */
    }
    10% {
        transform: translateX(-20px);
    }
    50% {
        /* margin: 0 calc(65px/2); */
        transform: scaleX(.1);
        /* width: var(--tile-thickness); */
    }
    to {
        margin: 0;
        /* width: var(--tile-width); */
        transform: translateX(0) scaleX(1);
    }
}

@keyframes unflip {
    from {
        margin: 0;
        width: var(--tile-width);
        border-radius: var(--tile-b-rad);
    }
    20% {
        transform: translateX(20px);
    }
    50% {
        margin: 0 calc(65px/2);
        width: var(--tile-thickness);
        border-radius: 1px;
    }
    to {
        margin: 0;
        width: var(--tile-width);
        transform: translateX(0);
        border-radius: var(--tile-thickness);
    }
}

/* Hover effect here is only applied if the device can hover (not mobile device) */
@media (hover: hover) {
  .selectable:hover {
    padding: calc(var(--tile-hover-padding) - var(--tile-hover-border-w));
    border: var(--tile-hover-border-w) solid var(--nv-c-green);
  }
}
</style>