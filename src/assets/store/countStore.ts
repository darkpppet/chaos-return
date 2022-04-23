/*
 * countStore.ts
 * 주문서 사용량 있는 store
 */

import { createNumber } from "./storeUtils";

export const chaosCount = createNumber(0); //혼줌 사용개수
export const chaosOfGoodnessCount = createNumber(0); //긍혼 사용개수
export const incredibleChaosCount = createNumber(0); //놀혼 사용개수
export const incredibleChaosOfGoodnessCount = createNumber(0); //놀긍혼 사용개수
export const returnCount = createNumber(0); //리턴 사용개수
export const recoveryCount = createNumber(0); //리커 사용개수
export const innocentCount = createNumber(0); //이노 사용개수
export const pureCount = createNumber(0); //순줌 사용개수
export const hammerCount = createNumber(0); //황망 사용개수

export const resetAllCount = () => { //사용 개수 전부 초기화하는 함수
    chaosCount.reset();
    chaosOfGoodnessCount.reset();
    incredibleChaosCount.reset();
    incredibleChaosOfGoodnessCount.reset();
    returnCount.reset();
    recoveryCount.reset();
    innocentCount.reset();
    pureCount.reset();
    hammerCount.reset();
}
