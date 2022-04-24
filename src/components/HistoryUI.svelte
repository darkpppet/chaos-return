<!--
    HistoryUI.svelte

    강화 결과 출력하는 UI 컴포넌트
    메이플 채팅창 모양
-->

<script lang="ts">
    import { beforeUpdate, afterUpdate } from 'svelte';
    import { enhanceHistory } from "../assets/store/historyStore";

    //채팅 많아지면 자동 스크롤 해주는 부분
    let historyUI: HTMLElement; //bind됨
    let needAutoScroll: boolean; 

    beforeUpdate(() => {
        needAutoScroll = historyUI && (historyUI.offsetHeight + historyUI.scrollTop) > (historyUI.scrollHeight - 20);
    });

    afterUpdate(() => {
        if (needAutoScroll) {
            historyUI.scrollTo(0, historyUI.scrollHeight);
        }
    });
</script>

<main>
    <!-- 채팅창 부분 -->
    <div class="chatting-box maple-box" bind:this={historyUI}>
        {#each $enhanceHistory as line}
            <p>{line}</p>
        {/each}
    </div>
    <!-- 채팅 초기화 버튼 -->
    <button on:click={() => { enhanceHistory.reset(); }}>채팅창 지우기</button>
</main>

<style>
    .chatting-box {
        width: 85%;
        height: 10em;
        margin: auto;
        padding: 5px;
        color: Orange;
        text-align: left;
        overflow: auto;
    }

    main button {
        margin: 5px;
    }
</style>
