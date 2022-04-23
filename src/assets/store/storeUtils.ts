/* 
 * storeUtils.ts
 * store 관련 유틸들(파생 타입, 생성 함수들) 있는 모듈
 */

import { type Writable, writable } from 'svelte/store';
import { type Stats, addStats } from "../stats"; 

export type WritableWithAdd<T> = Writable<T> & { add: (e: T) => void }; //add 메소드가 있는 Writable<T>
export type WritableWithSub<T> = Writable<T> & { sub: (e: T) => void }; //sub 메소드가 있는 Writable<T>
export type WritableWithReset<T> = Writable<T> & { reset: () => void }; //reset 메소드가 있는 Writable<T>

//초기값을 initial로 하고, add, sub, reset 있는 Writable<number>를 생성하는 함수
export const createNumber: (initial: number) => (WritableWithAdd<number> & WritableWithSub<number> & WritableWithReset<number>) = (initial: number) => {
    const { subscribe, set, update }: Writable<number> = writable(initial);

	return {
		subscribe,
        set,
        update,
        add: (e: number) => {
            update(n => n + e)
        },
		sub: (e: number) => {
            update(n => n - e)
        },
		reset: () => { //initial값으로 초기화
            set(initial);
        }
	};
}

//초기값을 initial로 하고, add, reset 있는 Writable<Stats>를 생성하는 함수
export const createStats: (initial: Stats) => (WritableWithAdd<Stats> & WritableWithReset<Stats>) = (initial: Stats) => {
	const { subscribe, set, update }: Writable<Stats> = writable({...initial});

	return {
		subscribe,
        set,
        update,
        add: (e: Stats) => {
            update (n => addStats(n, e));
        },
		reset: () => { //initial값으로 초기화
            set({...initial})
        }
	};
}

//초기값을 initial로 하고, add, reset 있는 Writable<string[]>을 생성하는 함수
export const createList: (initial: string[]) => (WritableWithAdd<string[]> & WritableWithReset<string[]>) = (initial: string[]) => {
    const { subscribe, set, update }: Writable<string[]> = writable([...initial]);

	return {
		subscribe,
        set,
        update,
        add: (e: string[]) => {
            update(n => [...n, ...e]);
        },
		reset: () => { //initial값으로 초기화
            set([...initial])
        }
	};
}
