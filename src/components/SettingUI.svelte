<!-- 
    SettingUI.svelte

    ProbSettingUI, ItemSettingUI가 같이 있는 설정 UI 컴포넌트
    버튼을 눌러서 모달 형식으로 컴포넌트 띄움
-->

<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import ProbSettingUI from "./ProbSettingUI.svelte";
    import ItemSettingUI from "./ItemSettingUI.svelte";

    const dispatch = createEventDispatcher();

    const dispatchClose = () => {
        dispatch("message", {
            show: false
        });
    }
</script>

<main>
    <!-- 뒷배경 어둡게 하는 필터 -->
    <div class="gray-filter"></div>

    <!-- 세팅 부분 -->
    <div class="setting-container modal">
        <!-- header -->
        <h1>설정</h1>
        <!-- 진짜 세팅 컴포넌트들 있는 부분 -->
        <div class="setting">
            <ProbSettingUI />
            <ItemSettingUI />
        </div>
        <!-- 확인 버튼 -->
        <button on:click={dispatchClose}>확인</button>
    </div>
</main>

<style>
    .setting-container {
        width: 780px;
        border-radius: 5px;
        padding: 5px;
    }

    h1 {
        margin: 15px;
    }

    main button {
        width: 6em;
        height: 55px;
        margin: 15px;
        font-size: 30px;
    }

    .setting {
        display: flex;
        justify-content: center;
        align-items: stretch;
    }
</style>
