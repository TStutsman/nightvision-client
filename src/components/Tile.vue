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
        <div class="tile" :class="{bright:illuminated}">
            <div class="tile-inner" :class="{flipped:revealed, unflipped:!revealed}">
                <div class="tile-back"></div>
                <div class="tile-front">
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
    height: var(--tile-height);
    width: var(--tile-width);
    border-radius: var(--tile-b-rad);
    transform-origin: center;
    transition: background-color .5s;

    background-color: transparent;
    perspective: 1000px;
}
.tile-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transform-style: preserve-3d;
}
.tile-back, .tile-front {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    border-radius: var(--tile-b-rad);
}
.tile-back {
    background-color: var(--nv-c-grey);
}
.tile-front {
    transform: rotateY(180deg);
    background-color: var(--nv-c-grey);
}
.bright {
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
    animation: unflip .75s 1 forwards;
}

@keyframes flip {
    from {
        transform: rotateY(0);
    }
    20% {
        transform: translateX(-20px);
    }
    to {
        transform: translateX(0) rotateY(180deg);
    }
}

@keyframes unflip {
    from {
        transform: rotateY(180deg);
    }
    20% {
        transform: rotateY(150deg) translateX(-20px);
    }
    to {
        transform: translateX(0) rotateY(0);
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