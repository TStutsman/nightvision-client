<script setup lang="ts">
const { message } = defineProps<{message:string}>();
</script>

<template>
    <div class="modal">
        <div class="alert">
            <svg preserve-aspect-ratio="xMinYMax meet" viewBox="0 0 560 100">
                <text x="50%" y="50%">{{ message }}</text>
            </svg>
        </div>
    </div>
</template>

<style scoped>
.modal {
    position: absolute;
    top: 0;
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100%;
}

.alert {
    display: flex;
    justify-content: center;
    
    padding: 40px 120px;
    user-select: none;
    width: 100%;
    
    filter: drop-shadow(0 0 10px rgb(33, 35, 32));

    animation: float 1.5s 1 forwards;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.465, 1);
}

svg {
    font-size: 40px;
    width: 60%;
}

text {
    font-family: Arial, Helvetica, sans-serif;
    text-anchor: middle;
    fill: #f0ebbd;
    stroke: rgb(108, 94, 18);
    stroke-width: 2px;
    stroke-linejoin: round;
    paint-order: stroke;
}

@keyframes float {
    from {
        opacity: 0;
        transform: scale(.8) translateY(120px);
    }
    20% {
        opacity: 1;
        transform: scale(1) translateY(-30px);
    }
    70% {
        opacity: 1;
    }
    to {
        opacity: 0;
        transform: translateY(-40px);
    }
}
</style>