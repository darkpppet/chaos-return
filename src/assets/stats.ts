/*
 * stats.ts
 * 스탯 관련 있는 모듈
 */

//아이템 하나의 스탯 인터페이스
export interface Stats {
    "STR": number,
    "DEX": number,
    "INT": number,
    "LUK": number,
    "공격력": number,
    "마력": number,
    "방어력": number,
    "이동속도": number,
    "점프력": number,
    "최대 HP": number,
    "최대 MP": number
}

//Stats 인터페이스 디폴트값 (모두 0)
export const zeroStats = {
    "STR": 0,
    "DEX": 0,
    "INT": 0,
    "LUK": 0,
    "공격력": 0,
    "마력": 0,
    "방어력": 0,
    "이동속도": 0,
    "점프력": 0,
    "최대 HP": 0,
    "최대 MP": 0
} as const;

//두 Stats 더해서 반환하는 함수
export const addStats = (a: Stats, b: Stats) => {
    const r: Stats = {...a};

    for (const i in r) {
        r[i] += b[i];
    }

    return r;
}

//변화된 스탯들을 string으로 만들어 반환하는 함수
export const updatedStatToString = (stat: Stats) => {
    const result: string[] = [];

    for (const i in stat) {
        if (stat[i] !== 0) { //0이 아닌 옵션들에 대해
            result.push(`${i}: ${stat[i] > 0 ? "+" : ""}${stat[i]}`) //<스탯명>: <변화량>
        }
    }

    return result.length !== 0
        ? result.join(", ") //<스탯명>: <변화량>, <스탯명>: <변화량>, ...
        : "어떠한 변화도 일어나지 않았습니다."; //변화량 없을 때
}
