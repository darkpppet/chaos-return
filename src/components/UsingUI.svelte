<!--
    UsingUI.svelte

    아이템들 사용하는 UI 컴포넌트
-->

<script lang="ts">
    import ImageText from "./ImageText.svelte";
    import ReturnUI from "./ReturnUI.svelte";
    import { totalStats, enhancedStats,
        succUpgradeCount, failUpgradeCount, canUpgradeCount,
        isHammered, isReturned, isRecoveried } from "../assets/store/itemStore";
    import { chaosP, chaosOfGoodnessP, incredibleChaosP, incredibleChaosOfGoodnessP, innocentP, pureP, hammerP } from "../assets/store/probStore";
    import { chaosCount, chaosOfGoodnessCount, incredibleChaosCount, incredibleChaosOfGoodnessCount,
        returnCount, recoveryCount, innocentCount, pureCount, hammerCount } from "../assets/store/countStore"
    import { enhanceHistory } from "../assets/store/historyStore";
    import type { WritableWithAdd, WritableWithSub, WritableWithReset } from "../assets/store/storeUtils";
    import { type ChaosName, isSucc, createChaosStats } from "../assets/random";
    import { type Stats, zeroStats, addStats, updatedStatToString } from "../assets/stats";

    let showReturnUI = false; //ReturnUI 보이게 하기 변수
    let updatedStatsForReturn: Stats = {...zeroStats}; //리턴 쓰면 파라미터로 넘길거(옵션 증가량)
    let chaosNameForReturn: ChaosName; //리턴 쓰면 파라미터로 넘길거(주문서 이름)
    let succPForReturn: number; //리턴 쓰면 파라미터로 넘길거(성공확률)

    //ReturnUI 이벤트 핸들러; ReturnUI에서 사용 여부 선택하면 발생
    const handleReturnMessage = (e: { detail: { use: boolean; chaosName: ChaosName; succP: number; }; }) => {
        showReturnUI = false; //일단 ReturnUI 끔
        if (e.detail.use) { //리턴 사용 했으면
            enhanceHistory.add([`리턴 주문서의 힘으로 ${e.detail.chaosName} ${e.detail.succP}% 사용 이전 상태로 돌아왔습니다.`]);
        } else { //리턴 사용 안했으면
            succUpgradeCount.add(1);
            enhancedStats.update(n => addStats(n, updatedStatsForReturn));
            enhanceHistory.add([`리턴 주문서의 효과가 사라졌습니다.`]);
        }
    }

    //바인딩 되는 혼줌류 사용 함수를 생성하는 함수
    const makeUseChaosFunc = (succP: number, chaosName: ChaosName, chaosCountWritable: WritableWithAdd<number> & WritableWithSub<number> & WritableWithReset<number>) => (() => {
        if (isSucc(succP)) {
            chaosCountWritable.add(1);
            const updatedStats = createChaosStats(chaosName, $totalStats);
            enhanceHistory.add([`${chaosName} ${succP}%가 한 순간 빛나더니 신비로운 힘이 그대로 전해졌습니다.`]);
            enhanceHistory.add([`${chaosName} ${succP}%의 힘이 적용되었습니다. (${updatedStatToString(updatedStats)})`]);

            if ($isReturned) { //리턴 써놨으면
                updatedStatsForReturn = updatedStats;
                chaosNameForReturn = chaosName;
                succPForReturn = succP;
                showReturnUI = true; //ReturnUI 켜고 handleReturnMessage가 나머지 실행함
            } else {
                succUpgradeCount.add(1);
                enhancedStats.update(n => addStats(n, updatedStats));
            }
        } else {
            if ($isRecoveried) {
                enhanceHistory.add([`리커버리 실드의 효과로 ${chaosName} ${succP}%가 소멸되지 않았습니다.`]);
            } else {
                chaosCountWritable.add(1);
            }

            enhanceHistory.add([`${chaosName} ${succP}%가 한 순간 빛났지만 아무런 변화도 일어나지 않았습니다.`]);

            if ($isReturned) {
                enhanceHistory.add(["리턴 주문서의 효과가 사라졌습니다."]);
            } else {
                failUpgradeCount.add(1);
            }

        }
        isRecoveried.set(false);
        isReturned.set(false);
    })

    const useChaos = makeUseChaosFunc($chaosP, "혼돈의 주문서", chaosCount); //혼줌 사용 함수
    const useChaosOfGoodness = makeUseChaosFunc($chaosOfGoodnessP, "긍정의 혼돈 주문서", chaosOfGoodnessCount); //긍혼 사용 함수
    const useIncredibleChaos = makeUseChaosFunc($incredibleChaosP, "놀라운 혼돈의 주문서", incredibleChaosCount); //놀혼 사용 함수
    const useIncredibleChaosOfGoodness = makeUseChaosFunc($incredibleChaosOfGoodnessP, "놀라운 긍정의 혼돈 주문서", incredibleChaosOfGoodnessCount); //놀긍 사용 함수

    const useReturn = () => { //리턴 사용 함수
        returnCount.add(1);
        isReturned.set(true);
        enhanceHistory.add(["리턴 스크롤이 한 순간 빛나더니 신비로운 힘이 그대로 전해졌습니다."]);
    };

    const useRecovery = () => { //리커 사용 함수
        recoveryCount.add(1);
        isRecoveried.set(true);
        enhanceHistory.add(["리커버리 실드가 한 순간 빛나더니 신비로운 힘이 그대로 전해졌습니다."]);
    };

    const useInneocent: () => void = () => { //이노 사용 함수
        innocentCount.add(1);
        if (isSucc($innocentP)) {
            enhancedStats.reset();
            succUpgradeCount.reset();
            failUpgradeCount.reset();
            isHammered.set(false);
            enhanceHistory.add([`이노센트 주문서 ${$innocentP}%가 한 순간 빛나더니 신비로운 힘이 그대로 전해졌습니다.`]);
        } else {
            enhanceHistory.add([`이노센트 주문서 ${$innocentP}%가 한 순간 빛났지만 아무런 변화도 일어나지 않았습니다.`]);
        }
    };

    const usePure = () => { //순줌 사용 함수
        pureCount.add(1);
        if (isSucc($pureP)) {
            failUpgradeCount.sub(1);
            enhanceHistory.add([`순백의 주문서 ${$pureP}%가 한 순간 빛나더니 신비로운 힘이 그대로 전해졌습니다.`]);
        } else {
            enhanceHistory.add([`순백의 주문서 ${$pureP}%가 한 순간 빛났지만 아무런 변화도 일어나지 않았습니다.`]);
        }
    };

    const useHammer: () => void = () => { //황망 사용 함수
        hammerCount.add(1);
        isHammered.set(true);
        if (isSucc($hammerP)) {
            enhanceHistory.add(["황금 망치로 제련에 성공하였습니다!"]);
        } else {
            failUpgradeCount.add(1);
            enhanceHistory.add(["황금 망치로 제련에 실패하였습니다."]);
        }
    };
</script>

<main>
    <h1>사용</h1>
    <div>
        <button on:click={useReturn} disabled={$isReturned}>
            <ImageText imgSrc="/images/Return_Scroll.png" text="리턴 스크롤 사용" />
        </button>
        <button on:click={useRecovery} disabled={$isRecoveried}>
            <ImageText imgSrc="/images/Recovery_Shield.png" text="리커버리 실드 사용" />
        </button>
        <button on:click={useChaos} disabled={$canUpgradeCount === 0}>
            <ImageText imgSrc="/images/Use_Chaos_Scroll.webp" text={`혼돈의 주문서 ${$chaosP}% 사용`} />
        </button>
        <button on:click={useChaosOfGoodness} disabled={$canUpgradeCount === 0}>
            <ImageText imgSrc="/images/Use_Chaos_Scroll.webp" text={`긍정의 혼돈 주문서 ${$chaosOfGoodnessP}% 사용`} />
        </button>
        <button on:click={useIncredibleChaos} disabled={$canUpgradeCount === 0}>
            <ImageText imgSrc="/images/Use_Chaos_Scroll.webp" text={`놀라운 혼돈의 주문서 ${$incredibleChaosP}% 사용`} />
        </button>
        <button on:click={useIncredibleChaosOfGoodness} disabled={$canUpgradeCount === 0}>
            <ImageText imgSrc="/images/Use_Chaos_Scroll.webp" text={`놀라운 긍정의 혼돈 주문서 ${$incredibleChaosOfGoodnessP}% 사용`} />
        </button>
        <button on:click={useInneocent} disabled={$succUpgradeCount === 0 && $failUpgradeCount === 0 && !$isHammered}>
            <ImageText imgSrc="/images/Use_Innocence_Scroll.webp" text={`이노센트 주문서 ${$innocentP}% 사용`} />
        </button>
        <button on:click={usePure} disabled={$failUpgradeCount === 0}>
            <ImageText imgSrc="/images/Use_Clean_Slate_Scroll.webp" text={`순백의 주문서 ${$pureP}% 사용`} />
        </button>
        <button on:click={useHammer} disabled={$isHammered}>
            <ImageText imgSrc="/images/Use_Golden_Hammer.webp" text={`황금 망치 ${$hammerP}% 사용`} />
        </button>
    </div>
    {#if showReturnUI}
        <ReturnUI
            updatedStats={updatedStatsForReturn}
            chaosName={chaosNameForReturn}
            succP={succPForReturn}
            on:message={handleReturnMessage}
        />
    {/if}
</main>

<style>
    main div {
        display: flex;
        flex-direction: column;
    }

    main div button {
        font-size: 18px;
        margin: 3px;
        width: 17em;
    }

</style>
