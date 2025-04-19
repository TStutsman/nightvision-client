<script setup lang="ts">
import { watch } from 'vue';
import './../styles/base.css';

const props = defineProps<{
  type:string | undefined,
  url:string | undefined,
  revealed:boolean, 
  illuminated:boolean | undefined
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
                <div class="tile-back" :class="{bright:illuminated}">
                    <svg width="104" height="145" viewBox="0 0 104 145" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="104" height="145" rx="9" fill="#113824"/>
                        <rect x="9.25" y="9.75" width="85.25" height="125.75" rx="4.5" fill="#004E26" stroke="#D5D7D1"/>
                        <g class="card-logo">
                            <circle cx="52.5" cy="72.5" r="26" fill="#12452B" stroke="#D5D7D1"/>
                            <path d="M27.3243 67.1284L34.3074 64.8006C35.3818 63.2488 37.7811 60.0378 38.7838 59.6081C39.7865 59.1784 42.7827 57.5191 44.1554 56.7432H48.0946L51.3176 54.7736L56.8682 56.7432H61.3446L66.8953 61.3986L78.1757 67.1284" stroke="#D5D7D1"/>
                            <path d="M26.7872 73.3953L32.6959 74.8277L33.7703 74.4696L39.6791 76.6182L40.2162 74.8277L42.902 76.9764L47.1993 76.0811L53.6453 76.9764L56.152 75.5439L58.1216 77.3345L64.9257 76.9764L68.5068 72.5L73.6993 75.5439L72.2669 77.3345L73.3412 78.4088L77.6385 79.3041" stroke="#D5D7D1"/>
                            <path d="M46.4831 56.9223L44.3345 58.8919L40.5743 61.9358L37.1723 64.2635L33.7703 68.7399L34.6655 69.4561L37.8885 68.0236L40.0372 65.875L44.3345 62.2939L42.5439 65.1588H43.9764L46.8412 62.2939V66.5912L48.6318 63.5473L50.7804 67.1284L49.7061 60.6824V57.6385L51.6757 54.9527" stroke="#D5D7D1"/>
                            <path d="M58.4797 63.0101L55.7939 60.1453L60.2703 62.473V64.0845L61.7027 66.5912L59.0169 64.8007L58.4797 63.0101Z" stroke="#D5D7D1"/>
                            <path d="M62.598 62.1148L65.1047 66.5912L72.0878 70.5304L74.2365 72.1418L72.0878 68.9189L66.3581 65.875L62.4189 61.7567" stroke="#D5D7D1"/>
                            <path d="M44.3345 71.4257L47.1993 74.6486L42.1858 72.1419H37.3514L43.2601 67.6655L44.3345 71.4257Z" stroke="#D5D7D1"/>
                            <path d="M61.5236 72.8581L57.5845 72.1418L64.5676 72.8581L61.5236 74.1114V72.8581Z" stroke="#D5D7D1"/>
                            <path d="M28.2196 80.7364L29.652 80.1993L30.9054 80.7364L34.1284 80.1993H36.6351L39.5 81.2736L43.2601 80.7364L44.5135 80.1993L45.5878 81.2736L48.4527 80.1993H52.5709L54.0034 81.2736L56.6892 80.7364L60.4493 81.6317L61.8818 82.706L63.3142 81.6317L64.0304 82.706L65.8209 82.3479L67.7905 81.6317L71.7297 82.3479L76.3851 82.706" stroke="#D5D7D1"/>
                            <path d="M30.8882 86.7691L31.9912 84.0236L34.9321 88.6254L36.8495 87.1929L38.8556 84.5116L42.0881 87.5652L43.0104 84.8069L45.6264 91.4251L47.1461 87.9248L48.7955 97.9256" stroke="#D5D7D1"/>
                            <path d="M73.3094 88.5429L72.3499 86.5514L70.1814 90.0888L68.6227 89.1056L66.9532 87.1994L64.5042 89.6001L63.6867 87.5916L61.8403 92.6117L60.5276 90.0775L59.5541 97.5675" stroke="#D5D7D1"/>
                        </g>
                    </svg>
                </div>
                <div class="tile-front">
                    <i :class="{unhidden:revealed}">
                        <img v-bind:src="url || ''" v-bind:alt="type"/>
                    </i>
                    <h3 class="animal-type">{{ type }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tile-container {
    /* 32:23 ratio */
    --tile-height: 96px;
    --tile-width: 69px;
    --tile-b-rad: 5px;
    --tile-thickness: calc(var(--tile-width)/10);
    --tile-hover-border-w: 4px;

    max-width: 125px;
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

/* ========= TILE BACK ========= */
.tile-back {
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
}
.tile-back svg {
    height: var(--tile-height);
    width: var(--tile-width);
}

/* ========= TILE FRONT ========= */
.tile-front {
    transform: rotateY(180deg);
    background-color: var(--grey);
}
.tile-front:has(i.unhidden){
    background: linear-gradient(var(--grey), #FFF);
}
.tile-front i {
    display: flex;
    place-items: center;
    place-content: center;

    color: var(--color-text);
}
.tile-front img {
    object-fit: cover;

    height: var(--tile-height);
    width: var(--tile-width);

    opacity: 0.8;
    border-radius: var(--tile-b-rad);
}
.tile-front h3.animal-type {
    position: absolute;
    bottom: .2rem;
    left: 0;
    right: 0;

    font-size: .7rem;
    font-weight: 800;
    color: var(--black);
    filter: drop-shadow(0 0 2px #ddd);
    user-select: none;
}
.card-logo>* {
    transition: fill .5s, stroke .5s;
}

.bright .card-logo>* {
    fill: var(--white);
    stroke: var(--green);
}

/* ========= ANIMATION ========= */
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

/* ========= MEDIA QUERIES ========= */

@media screen and (min-width: 1280px) {
    .tile-container {
        --tile-height: 160px;
        --tile-width: 115px;
        --tile-hover-padding: 10px;
        --tile-b-rad: 12px;
    }
    h3 {
        font-size: 1.6rem;
        margin-bottom: 0.4rem;
    }
}

/* Hover effect here is only applied if the device can hover (not mobile device) */
@media (hover: hover) {
  .selectable:hover > .tile {
    -webkit-box-shadow: 0 0 10px 4px var(--orange);
    box-shadow: 0 0 10px 4px var(--orange);
  }
}
</style>