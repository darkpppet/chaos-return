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

    const checkValue = () => { //잘못된 입력 거르기
        if (value == null) { //숫자가 아니면 디폴트값으로
            value = defaultValue;
        }
        if (value < min) { //최소값보다 작으면 최소값으로
            value = min;
        } 
        if (value > max) { //최대값보다 크면 최대값으로
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
