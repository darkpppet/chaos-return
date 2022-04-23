/* 
 * storeUtils.ts
 * store 관련 유틸들(파생 타입, 생성 함수들) 있는 모듈
 */

import { type Writable, writable } from 'svelte/store';
import { type Stats, addStats } from "../stats"; 

export type WritableWithAdd<T> = Writable<T> & { add: (e: T) => void }; //add 메소드가 있는 Writable<T>
export type WritableWithSub<T> = Writable<T> & { sub: (e: T) => void }; //sub 메소드가 있는 Writable<T>
export type WritableWithReset<T> = Writable<T> & { reset: () => void }; //reset 메소드가 있는 Writable<T>
export type WritableWithGetDefulat<T> = Writable<T> & { getDefault: () => T }; //getDefault 메소드가 있는 Writable<T>

export type NewWritable<T> = WritableWithAdd<T> & WritableWithReset<T> & WritableWithGetDefulat<T>;

//초기값을 initial로 하고, add, sub, reset, getDefault 있는 Writable<number>를 생성하는 함수
export const createNumber: (initial: number) => (NewWritable<number> & WritableWithSub<number>) = (initial: number) => {
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
        },
        getDefault: () => initial
	};
}

//초기값을 initial로 하고, add, reset, getDefault 있는 Writable<Stats>를 생성하는 함수
export const createStats: (initial: Stats) => NewWritable<Stats> = (initial: Stats) => {
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
        },
        getDefault: () => ({...initial})
	};
}

//초기값을 initial로 하고, add, reset, getDefault 있는 Writable<string[]>을 생성하는 함수
export const createList: (initial: string[]) => NewWritable<string[]> = (initial: string[]) => {
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
        },
        getDefault: () => ([...initial])
	};
}
