<!--
    ImageText.svelte

    이미지랑 텍스트 같이 있는 컴포넌트
-->

<script lang="ts">
    export let imgSrc: string; //이미지 경로
    export let text: string; //텍스트
</script>

<main>
    <img src={imgSrc} alt="" />
    <span>{text}</span>
</main>

<style>
    main {
        display: inline;
    }

    main img {
        width: 1.5em;
        height: 1.5em;
        vertical-align: sub;
    }
</style>
