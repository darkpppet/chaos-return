<script lang="ts">
	import SettingUI from "./components/SettingUI.svelte";
	import UsingUI from "./components/UsingUI.svelte";
	import ItemUI from "./components/ItemUI.svelte";
	import ResultUI from "./components/ResultUI.svelte";
	import HistoryUI from "./components/HistoryUI.svelte";

	import { totalStats, itemStats, enhancedStats,
        succUpgradeCount, failUpgradeCount, canUpgradeCount,
        isHammered, isReturned, isRecoveried } from "./assets/store/itemStore";
    import { resetAllCount } from "./assets/store/countStore";

    let showSetting = false; //모달 보이는지 여부

    const toggleShowSetting = () => { //showSetting 토글하는 함수
        showSetting = !showSetting;
    }

	const handleSettingUIMessage = (e) => {
		if (!e.detail.show) {
			showSetting = false;
		}
	}

    const reset = () => {
        enhancedStats.reset();
        isHammered.set(false);
        succUpgradeCount.reset();
        failUpgradeCount.reset();
        isReturned.set(false);
        isRecoveried.set(false);
        resetAllCount();
    };
</script>

<main>
	<!-- 제목 -->
	<h1>혼줌 + 리턴 시뮬레이터</h1>
	<div class="buttons">
    	<!-- 모달 여는 버튼 -->
		<button
			class="square-button"
			on:click={toggleShowSetting}
		>
			<img src="./images/settings.svg" alt="설정" />
		</button>
		<!-- 초기화 버튼 -->
		<button
			class="square-button"
			on:click={reset}
		>
			<img src="./images/reset.svg" alt="초기화" />
		</button>
	</div>
    <!-- 세팅 모달 부분 -->
    {#if showSetting}
		<SettingUI on:message={handleSettingUIMessage} />
    {/if}
	<div class="main-container">
		<UsingUI />
		<ItemUI
			title="아이템"
			totalStats={$totalStats}
			itemStats={$itemStats}
			enhancedStats={$enhancedStats}
			succUpgradeCount={$succUpgradeCount}
			failUpgradeCount={$failUpgradeCount}
			canUpgradeCount={$canUpgradeCount}
			isHammered={$isHammered}
			isReturned={$isReturned}
			isRecoveried={$isRecoveried}
		/>
		<ResultUI />
	</div>
	<HistoryUI />
</main>

<style>
	main {
		width: 70%;
		margin: auto;
		text-align: center;
	}

	main h1 {
		font-size: 50px;
	}

	main div {
		display: flex;
		justify-content: space-evenly;
	}

	.buttons {
		position: absolute;
		right: 26%;
		top: 40px;
	}

	.buttons button {
		margin: 0px 5px;
	}

	.main-container {
		margin: 10px;
	}
</style>
