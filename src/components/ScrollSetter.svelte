<!--
    ScrollSetter.svelte

    확률 설정하는 컴포넌트
    input number, input range 같이 있음
-->

<script lang="ts">
    import ImageText from "./ImageText.svelte";

    export let imgSrc: string | null = null; //이미지 경로
    export let text: string; //텍스트
    export let defaultValue: number; //디폴트값
    export let min: number; //최소
    export let max: number | null = null; //최대
    export let disableRange: boolean = false; //range 비활성화 할지
    export let isPercent: boolean = false; //%인지

    export let value: number; //확률

    const checkValue = () => {
        if (value == null) {
            value = defaultValue;
        }
        if (value < min) {
            value = min;
        } 
        if (value > max) {
            value = max;
        }
    }
</script>

<main>
    {#if imgSrc !== null}
        <ImageText imgSrc={imgSrc} text={text + ": "} />
    {:else}
        <span>{text + ": "}</span>
    {/if}
    <span>
        <input type="number" bind:value={value} min={min} max={max} on:focusout={checkValue} />
        {#if isPercent}
            %
        {/if}
    </span>
    {#if !disableRange}
        <input type="range" bind:value={value} min={min} max={max} />
    {/if}
</main>

<style>
    main {
        margin: 2px;
    }
</style>
