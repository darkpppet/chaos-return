<!--
    ProbSettingUI.svelte

    확률들 설정하는 UI 컴포넌트
-->

<script lang="ts">
    import ScrollSetter from "./ScrollSetter.svelte";
    import { chaosP, chaosOfGoodnessP, incredibleChaosP, incredibleChaosOfGoodnessP,
        innocentP, pureP, hammerP, resetAllProb } from "../assets/store/probStore";
</script>

<main>
    <div>
        <h2>주문서 확률 설정</h2>
        <!-- 주문서 성공 확률들 설정 부분 -->
        <div>
            <ScrollSetter
                imgSrc="/images/Use_Chaos_Scroll.webp"
                text="혼돈의 주문서 성공 확률"
                min={1}
                max={100}
                bind:value={$chaosP}
            />
            <ScrollSetter
                imgSrc="/images/Use_Chaos_Scroll.webp"
                text="긍정의 혼돈 주문서 성공 확률"
                min={1}
                max={100}
                bind:value={$chaosOfGoodnessP}
            />
            <ScrollSetter
                imgSrc="/images/Use_Chaos_Scroll.webp"
                text="놀라운 혼돈의 주문서 성공 확률"
                min={1}
                max={100}
                bind:value={$incredibleChaosP}
            />
            <ScrollSetter
                imgSrc="/images/Use_Chaos_Scroll.webp"
                text="놀라운 긍정의 혼돈 주문서 성공 확률"
                min={1}
                max={100}
                bind:value={$incredibleChaosOfGoodnessP}
            />
            <ScrollSetter
                imgSrc="/images/Use_Innocence_Scroll.webp"
                text="이노센트 주문서 성공 확률"
                min={1}
                max={100}
                bind:value={$innocentP}
            />
            <ScrollSetter
                imgSrc="/images/Use_Clean_Slate_Scroll.webp"
                text="순백의 주문서 성공 확률"
                min={1}
                max={100}
                bind:value={$pureP}
            />
            <ScrollSetter
                imgSrc="/images/Use_Golden_Hammer.webp"
                text="황금 망치 성공 확률"
                min={1}
                max={100}
                bind:value={$hammerP}
            />
        </div>
    </div>
    <!-- 초기화 버튼 -->
    <button on:click={resetAllProb}>기본값으로 설정</button>
</main>

<style>
    main {
        margin: 5px;
    }

    main>div {
        height: 17em;
        width: max-content;
        border: 1px black solid;
        border-radius: 5px;
        padding: 5px;
    }

    main>div>div {
        display: flex;
        flex-direction: column;
        text-align: right;
    }

    main h2 {
        margin: 6px auto;
        text-align: center;
    }

    main button {
        margin-top: 10px;
    }
</style>
