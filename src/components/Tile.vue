<script setup lang="ts">
import { watch } from 'vue';
import './../styles/base.css';

const props = defineProps<{
  type:string | undefined, revealed:boolean, illuminated:boolean | undefined
}>();
const emit = defineEmits(['deilluminate', 'tileClick']);

watch(() => props.illuminated == true, () => {
    setTimeout(() => {
        emit('deilluminate')
    }, 1000)
});
</script>

<template>
    <div @click="$emit('tileClick')" class="tile-container" :class="{selectable:!revealed}">
        <div class="tile">
            <div class="tile-inner" :class="{flipped:revealed, unflipped:!revealed}">
                <div class="tile-back" :class="{bright:illuminated}"></div>
                <div class="tile-front">
                    <i :class="{unhidden:revealed}">
                        <img 
                        v-bind:src="type ? 'https://nmls-pictures-bucket.s3.us-east-2.amazonaws.com/rainier_' + type.toLowerCase() + '.jpg' : ''" 
                        v-bind:alt="type"
                        class="tile-img"
                        />
                    </i>
                    <div class="tile-name">
                        <h3>{{ type }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tile-container {
  --tile-height: 150px;
  --tile-width: 105px;
  --tile-b-rad: 10px;
  --tile-thickness: calc(var(--tile-width)/10);
  --tile-hover-padding: 10px;
  --tile-hover-border-w: 4px;
}

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
    transition: background-color .5s;
}
.tile-front {
    transform: rotateY(180deg);
    background-color: var(--nv-c-grey);
}
.tile-front:has(i.unhidden){
    background: linear-gradient(var(--nv-c-grey), #FFF);
}
.tile-img {
  position: absolute;
  top:0;
  z-index: -1;

  height: var(--tile-height);
  width: var(--tile-width);

  opacity: 0.8;
  border-radius: var(--tile-b-rad);
}
.bright {
    background-color: var(--nv-c-lightgrey);
}
i {
  display: flex;
  place-items: center;
  place-content: center;

  color: var(--color-text);
}

.tile-name {
  height: 100%;
  display: flex;
  align-items: end;
  place-content: center;
}

h3 {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
  color: var(--nv-c-black);
  filter: drop-shadow(0 0 2px #ddd);
  user-select: none;
}

.flipped {
    animation: flip .5s 1 forwards;
}

.unflipped {
    animation: unflip .75s 1 forwards;
}

@media screen and (max-width: 1280px) {
    .tile-container {
        --tile-height: 75px;
        --tile-width: 52.5px;
        --tile-hover-padding: 6px;
        --tile-b-rad: 5px;
    }
    h3 {
        font-size: .7rem;
        margin-bottom: .2rem;
    }
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