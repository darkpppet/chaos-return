<!--
    ItemUI.svelte

    강화되는 아이템 나타내는 UI 컴포넌트
-->

<script lang="ts">
    import { type Stats, zeroStats } from "../assets/stats";

    export let title: string = "아이템"; //컴포넌트 타이틀
    export let totalStats: Stats = {...zeroStats}; //총 스탯
    export let itemStats: Stats = {...zeroStats}; //기본 스탯
    export let enhancedStats: Stats = {...zeroStats}; //추가된 스탯
    export let succUpgradeCount: number = 0; //강화 횟수
    export let failUpgradeCount: number = 0; //강화 실패 횟수
    export let canUpgradeCount: number = 0; //남은 업횟
    export let isHammered: boolean = false; //황망 여부
    export let isReturned: boolean = false; //리턴 여부
    export let isRecoveried: boolean = false; //리커 여부

    //총 스탯 부분 색깔 정하는 함수
    const getColorTotal = (totalStat: number, enhancedStat: number) => {
        if (totalStat === 0) { //총스탯 0이면 회색
            return "gray";
        } else if (enhancedStat > 0) { //추가 스탯이 양수면 파란색
            return "blue";
        } else if (enhancedStat < 0) { //추가 스탯이 음수면 빨간색
            return "red";
        }
        return "";
    }

    //추가 스탯 부분 색깔 정하는 함수
    const getColorEnhance = (enhancedStat: number) => {
        if (enhancedStat === 0) { //추가 스탯 없으면 회색
            return "gray";
        } else if (enhancedStat > 0) { //추가 스탯 양수면 파란색
            return "blue";
        } else if (enhancedStat < 0) { //추가 스탯 음수면 빨간색
            return "red";
        }
        return "";
    }
</script>

<main>
    <h1>{title}</h1>
    <div class="maple-box">
        <!-- 몇강인지; (+몇) -->
        <h2>{`(+${succUpgradeCount})`}</h2>
        <hr />
        <!-- 제목 부분 -->
        <p class="stats">
            <span>스탯</span>
            <span>현재옵션</span>
            <span>추가된 양</span>
        </p>
        <hr />
        <!-- 스탯 부분 -->
        {#each Object.entries(itemStats) as stat}
            <p class="stats">
                <!-- 스탯이름 -->
                <span class={getColorTotal(totalStats[stat[0]], enhancedStats[stat[0]])}>
                    {stat[0]}
                </span>
                <!-- 총 수치 -->
                <span class={getColorTotal(totalStats[stat[0]], enhancedStats[stat[0]])}>
                    {totalStats[stat[0]] > 0 ? totalStats[stat[0]] : 0}
                </span>
                <!-- 추가 수치 -->
                <span>
                    (
                    <span class="left-align">
                        {itemStats[stat[0]]}
                    </span>
                    <span class={"right-align " + getColorEnhance(enhancedStats[stat[0]])}>
                        {`${(enhancedStats[stat[0]] >= 0 ? "+" : "")}${enhancedStats[stat[0]]}`}
                    </span>
                    )
                </span>
            </p>
        {/each}
        <hr />
        <p>
            <!-- 업횟 -->
            <span>업그레이드 가능 횟수: {canUpgradeCount}</span>
            <!-- 복구 가능 횟수 -->
            <span class="orange">(복구 가능 횟수: {failUpgradeCount})</span>
        </p>
        <!-- 황망 적용 여부 -->
        {#if isHammered}
            <p>황금망치 제련 적용</p>
        {/if}
        {#if isReturned || isRecoveried}
            <hr />
            <!-- 리커 여부 -->
            {#if isRecoveried}
                <p class="orange">주문서 보호 효과가 적용되어 있습니다.</p>
            {/if}
            <!-- 리턴 여부 -->
            {#if isReturned}
                <p class="orange">리턴 주문서 효과가 적용되어 있습니다.</p>
            {/if}
        {/if}
    </div>
</main>

<style>
    main {
        height: 480px;
    }

    main div {
        width: 285px;
        margin: auto;
        padding: 0px;
        text-align: left;
        display: flex;
        flex-direction: column;
    }

    main h2 {
        text-align: center;
        margin: 10px auto auto;
    }

    hr {
        width: 100%;
    }

    main div p {
        margin: 0px 5px;
    }

    main div p:first-child {
        margin: 5px 5px 0px;
    }

    main div p:last-child {
        margin: 0px 5px 5px;
    }

    main div p:first-child span:nth-child(2),
    .stats>span:not(:last-child) {
        display: inline-block;
        width: 4.5em;
        text-align: left;
    }

    .left-align {
        display: inline-block;
        width: 2em;
        text-align: left;
    }

    .right-align {
        display: inline-block;
        width: 3em;
        text-align: right;
    }

    .orange {
        color: Orange
    }

    .gray {
        color: Gray;
    }

    .blue {
        color: LightSkyBlue;
    }

    .red {
        color: Crimson;
    }
</style>
