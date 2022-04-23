/*
 * itemStore.ts
 * 아이템 관련 수치들 있는 store
 */

import { writable, derived } from 'svelte/store';
import { createNumber, createStats } from "./storeUtils";
import { zeroStats, addStats } from "../stats"; 

export const isHammered = writable(false); //황망 사용 여부

export const maxUpgrade = createNumber(3); //최대 업횟
export const maxUpgradeWithHammer = derived( //황망 포함 최대 업횟
    [maxUpgrade, isHammered],
    ([$maxUpgrade, $isHammered]) => ($maxUpgrade + ($isHammered ? 1 : 0))
);
export const succUpgradeCount = createNumber(0); //성공 업횟
export const failUpgradeCount = createNumber(0); //실패 업횟
export const canUpgradeCount = derived( //남은 업횟
    [maxUpgradeWithHammer, succUpgradeCount, failUpgradeCount],
    ([$maxUpgradeWithHammer, $succUpgradeCount, $failUpgradeCount]) => ($maxUpgradeWithHammer - ($succUpgradeCount + $failUpgradeCount))
);

export const isReturned = writable(false); //리턴 사용 여부
export const isRecoveried = writable(false); //리커 사용 여부

export const itemStats = createStats({ //기본 아이템 수치
    "STR": 50,
    "DEX": 50,
    "INT": 50,
    "LUK": 50,
    "공격력": 6,
    "마력": 6,
    "방어력": 150,
    "이동속도": 0,
    "점프력": 0,
    "최대 HP": 150,
    "최대 MP": 150
});

export const enhancedStats = createStats({...zeroStats}); //강화된 수치

export const totalStats = derived( //총 아이템 수치
	[itemStats, enhancedStats],
	([$itemStats, $enhancedStats]) => addStats($itemStats, $enhancedStats)
);
