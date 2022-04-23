<!--
    ItemSettingUI.svelte

    기본 스탯, 기본 업횟 설정하는 UI 컴포넌트
-->

<script lang="ts">
    import { itemStats, maxUpgrade } from "../assets/store/itemStore";

    const reset = () => { //기본값으로 설정하는 함수
        itemStats.reset();
        maxUpgrade.reset();
    }
</script>

<main>
    <div>
        <h2>기본옵션 설정</h2>
        <!-- 추옵 부분 -->
        <div>
            <div>
                <span>STR: <input type="number" min={0} bind:value={$itemStats["STR"]}></span>
                <span>DEX: <input type="number" min={0} bind:value={$itemStats["DEX"]}></span>
                <span>INT: <input type="number" min={0} bind:value={$itemStats["INT"]}></span>
                <span>LUK: <input type="number" min={0} bind:value={$itemStats["LUK"]}></span>
                <span>공격력: <input type="number" min={0} bind:value={$itemStats["공격력"]}></span>
                <span>마력: <input type="number" min={0} bind:value={$itemStats["마력"]}></span>
            </div>
            <div>
                <span>방어력: <input type="number" min={0} bind:value={$itemStats["방어력"]}></span>
                <span>이동속도: <input type="number" min={0} bind:value={$itemStats["이동속도"]}></span>
                <span>점프력: <input type="number" min={0} bind:value={$itemStats["점프력"]}></span>
                <span>최대 HP: <input type="number" min={0} bind:value={$itemStats["최대 HP"]}></span>
                <span>최대 MP: <input type="number" min={0} bind:value={$itemStats["최대 MP"]}></span>
                <span>&nbsp;</span>
            </div>
        </div>
        <hr />
        <!-- 업횟 부분 -->
        <div>
            <span>업그레이드 가능 횟수: <input type="number" min={0} bind:value={$maxUpgrade}></span>
        </div>
    </div>
    <!-- 초기화 버튼 -->
    <button on:click={reset}>기본값으로 설정</button>
</main>

<style>
    main {
        margin: 5px;
    }

    main>div {
        height: 17em;
        border: 1px black solid;
        border-radius: 5px;
        padding: 5px;
    }

    main>div>div {
        display: flex;
    }

    main>div>div>div {
        margin: 3px;
        display: flex;
        flex-direction: column;
        text-align: right;
    }

    main h2 {
        margin: 6px auto;
    }

    main span {
        margin: 2px;
    }

    main input {
        width: 4em;
    }

    main button {
        margin-top: 10px;
    }
</style>
