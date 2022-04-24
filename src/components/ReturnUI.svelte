<!--
    ReturnUI.svelte

    리턴 썼을 때 나오는 UI 컴포넌트
-->

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import ItemUI from "./ItemUI.svelte";
    import { type Stats, zeroStats, addStats } from "../assets/stats";
    import { totalStats, itemStats, enhancedStats,
        succUpgradeCount, failUpgradeCount, canUpgradeCount,
        isHammered } from "../assets/store/itemStore";
    import type { ChaosName } from '../assets/random';

    export let updatedStats: Stats = {...zeroStats}; //추가된 스탯
    export let chaosName: ChaosName; //주문서 이름(이벤트로 올려야함)
    export let succP: number; //성공 확률(이벤트로 올려야함)

    const dispatch = createEventDispatcher(); //이벤트 보내주는거

    const useReturn = () => { //리턴 쓸때 보낼 이벤트
        dispatch("message", {
            use: true,
            chaosName: chaosName,
            succP: succP
        });
    }

    const notUseReturn = () => { //리턴 안쓸때 보낼 이벤트
        dispatch("message", {
            use: false,
            chaosName: chaosName,
            succP: succP
        });
    }
</script>

<main>
    <div class="gray-filter"></div>

    <div class="return-container modal">
        <h1>리턴 스크롤을 사용 하시겠습니까?</h1>
        <div class="explain">
            <span>주문서 사용에 성공했습니다.</span>
            <span>아이템 옵션을 되돌리시겠습니까?</span>
            <span>리턴스크롤 효과는 무조건 사라집니다.</span>
        </div>
        <div class="compare">
            <div>
                <ItemUI 
                    title="주문서 사용 전"
                    totalStats={$totalStats}
                    itemStats={$itemStats}
                    enhancedStats={$enhancedStats}
                    succUpgradeCount={$succUpgradeCount}
                    failUpgradeCount={$failUpgradeCount}
                    canUpgradeCount={$canUpgradeCount}
                    isHammered={$isHammered}
                />
                <button on:click={useReturn}>예 (옵션 미적용)</button>
            </div>
            <div>
                <ItemUI 
                    title="주문서 사용 후"
                    totalStats={addStats($totalStats, updatedStats)}
                    itemStats={$itemStats}
                    enhancedStats={addStats($enhancedStats, updatedStats)}
                    succUpgradeCount={$succUpgradeCount + 1}
                    failUpgradeCount={$failUpgradeCount}
                    canUpgradeCount={$canUpgradeCount - 1}
                    isHammered={$isHammered}
                />
                <button on:click={notUseReturn}>아니오 (옵션 적용)</button>
            </div>
        </div>
    </div>
</main>

<style>
    .return-container {
        border-radius: 5px;
        padding: 5px;

    }

    .explain {
        width: 80%;
        margin: auto;
        border: 1px black solid;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        font-size: 20px;
        align-items: center;
    }

    .compare {
        display: flex;
    }

    .compare div {
        margin: 10px;
    }

    main button {
        position: relative;
        top: -50px;
        width: 10em;
    }
</style>