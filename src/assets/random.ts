/*
 * random.ts
 * 랜덤 관련 함수들 있는 모듈
 */

import { type Stats, zeroStats } from "./stats";
import { chaosData } from "./data";

//파라미터로 들어온 확률에 따라 성공 여부 반환하는 함수
export const isSucc = (succP: number) => (Math.random() < (succP / 100));

//혼줌 이름들 타입
export type ChaosName = "혼돈의 주문서" | "긍정의 혼돈 주문서" | "놀라운 혼돈의 주문서" | "놀라운 긍정의 혼돈 주문서";

//파라미터로 들어온 혼줌 확률에 따른 랜덤 수치 하나 반환하는 함수
const randomChaosOption = (probData: { [key: number]: number }) => {
    const rand: number = Math.random();
    let acc: number = 0;

    for (const i in probData) {
        if (rand >= acc && rand < acc + probData[i]) {
            return parseInt(i);
        } else {
            acc += probData[i];
        }
    }
}

//파라미터로 들어온 혼줌 이름, 스탯 양을 바탕으로 변화된 옵션 반환하는 함수 
export const createChaosStats = (chaosName: ChaosName, nowStats: Stats) => {
    const result = {...zeroStats};

    for (const i in nowStats) {
        if (nowStats[i] > 0) { //0 이하면 변화하지 않음
            let enhancedValue = randomChaosOption(chaosData) * (i === "최대 HP" || i === "최대 MP" ? 10 : 1); //최대 HP, 최대 MP는 10씩 변화

            switch (chaosName) {
                case "긍정의 혼돈 주문서": //음수값이면 양수로
                    enhancedValue = Math.abs(enhancedValue);
                    break;

                case "놀라운 혼돈의 주문서": //±5면 ±6으로
                    switch (enhancedValue) {
                        case +5:
                            enhancedValue = +6;
                            break;

                        case -5:
                            enhancedValue = -6;
                            break;
                    }
                    break;

                case "놀라운 긍정의 혼돈 주문서": //음수를 양수로, 그다음 5면 6으로
                    enhancedValue = Math.abs(enhancedValue);
                    enhancedValue = enhancedValue === 5 ? 6 : enhancedValue;
                    break;
            }

            if (nowStats[i] + enhancedValue < 0) { //0 미만으로 내려가지 않게
                enhancedValue = -nowStats[i];
            }

            result[i] = enhancedValue;
        }
    }

    return result as Stats;
}
