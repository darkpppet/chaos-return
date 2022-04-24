<!--
    ItemSettingUI.svelte

    기본 스탯, 기본 업횟 설정하는 UI 컴포넌트
-->

<script lang="ts">
    import ScrollSetter from "./ScrollSetter.svelte";
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
        <div class="stat-setting-container">
            <div>
                <ScrollSetter
                    text="STR"
                    defaultValue={itemStats.getDefault()["STR"]}
                    min={0}
                    bind:value={$itemStats["STR"]}
                    disableRange={true}
                />
                <ScrollSetter
                    text="DEX"
                    defaultValue={itemStats.getDefault()["DEX"]}
                    min={0}
                    bind:value={$itemStats["DEX"]}
                    disableRange={true}
                />
                <ScrollSetter
                    text="INT"
                    defaultValue={itemStats.getDefault()["INT"]}
                    min={0}
                    bind:value={$itemStats["INT"]}
                    disableRange={true}
                />
                <ScrollSetter
                    text="LUK"
                    defaultValue={itemStats.getDefault()["LUK"]}
                    min={0}
                    bind:value={$itemStats["LUK"]}
                    disableRange={true}
                />
                <ScrollSetter
                    text="공격력"
                    defaultValue={itemStats.getDefault()["공격력"]}
                    min={0}
                    bind:value={$itemStats["공격력"]}
                    disableRange={true}
                />
                <ScrollSetter
                    text="마력"
                    defaultValue={itemStats.getDefault()["마력"]}
                    min={0}
                    bind:value={$itemStats["마력"]}
                    disableRange={true}
                />
            </div>
            <div>
                <ScrollSetter
                    text="방어력"
                    defaultValue={itemStats.getDefault()["방어력"]}
                    min={0}
                    bind:value={$itemStats["방어력"]}
                    disableRange={true}
                />
                <ScrollSetter
                    text="이동속도"
                    defaultValue={itemStats.getDefault()["이동속도"]}
                    min={0}
                    bind:value={$itemStats["이동속도"]}
                    disableRange={true}
                />
                <ScrollSetter
                    text="점프력"
                    defaultValue={itemStats.getDefault()["점프력"]}
                    min={0}
                    bind:value={$itemStats["점프력"]}
                    disableRange={true}
                />
                <ScrollSetter
                    text="최대 HP"
                    defaultValue={itemStats.getDefault()["최대 HP"]}
                    min={0}
                    bind:value={$itemStats["최대 HP"]}
                    disableRange={true}
                />
                <ScrollSetter
                    text="최대 MP"
                    defaultValue={itemStats.getDefault()["최대 MP"]}
                    min={0}
                    bind:value={$itemStats["최대 MP"]}
                    disableRange={true}
                />
                <span>&nbsp;</span>
            </div>
        </div>
        <hr />
        <!-- 업횟 부분 -->
        <div>
            <ScrollSetter
                text="업그레이드 가능 횟수"
                defaultValue={maxUpgrade.getDefault()}
                min={0}
                bind:value={$maxUpgrade}
                disableRange={true}
            />
        </div>
    </div>
    <!-- 초기화 버튼 -->
    <button on:click={reset}>기본값으로 설정</button>
</main>

<style>
    main {
        margin: 5px;
    }

    main > div {
        height: 17em;
        border: 1px black solid;
        border-radius: 5px;
        padding: 5px;
    }

    .stat-setting-container {
        display: flex;
        justify-content: space-around;
    }

    .stat-setting-container > div {
        margin: 3px;
        display: flex;
        flex-direction: column;
        text-align: right;
    }

    main h2 {
        margin: 6px auto;
    }

    main button {
        margin-top: 10px;
    }
</style>
