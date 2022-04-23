/*
 * probStore.ts
 * 확률 관련 수치 있는 store
 */

import { createNumber } from './storeUtils';

export const chaosP = createNumber(60); //혼줌 성공확률
export const chaosOfGoodnessP = createNumber(50); //긍혼 성공확률
export const incredibleChaosP = createNumber(60); //놀혼 성공확률
export const incredibleChaosOfGoodnessP = createNumber(60); //놀긍혼 성공확률
export const innocentP = createNumber(50); //이노 성공확률
export const pureP = createNumber(10); //순줌 성공확률
export const hammerP = createNumber(50); //황망 성공확률

export const resetAllProb = () => { //주문서들 성공확률 전부 기본값으로 설정하는 함수
    chaosP.reset();
    chaosOfGoodnessP.reset();
    incredibleChaosP.reset();
    incredibleChaosOfGoodnessP.reset();
    innocentP.reset();
    pureP.reset();
    hammerP.reset();
};
