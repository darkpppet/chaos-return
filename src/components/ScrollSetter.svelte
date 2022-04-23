<!--
    ScrollSetter.svelte

    확률 설정하는 컴포넌트
    input number, input range 같이 있음
-->

<script lang="ts">
    import ImageText from "./ImageText.svelte";

    export let imgSrc: string | null = null; //이미지 경로
    export let text: string; //텍스트
    export let min: number; //최소
    export let max: number | null = null; //최대

    export let value: number; //확률
</script>

<main>
    {#if imgSrc !== null}
        <ImageText imgSrc={imgSrc} text={text + ": "} />
    {:else}
        <span>{text + ": "}</span>
    {/if}
    <span><input type="number" bind:value={value} min={min} max={max} /> %</span>
    <input type="range" bind:value={value} min={min} max={max} />
</main>

<style>
</style>
