<!--
    ResultUI.svelte

    강화에 사용한 주문서들 표시하는 UI 컴포넌트
-->

<script>
    import ImageText from "./ImageText.svelte";
    import { chaosCount, chaosOfGoodnessCount, incredibleChaosCount, incredibleChaosOfGoodnessCount,
        returnCount, recoveryCount, innocentCount, pureCount, hammerCount } from "../assets/store/countStore"
    import { chaosP, chaosOfGoodnessP, incredibleChaosP, incredibleChaosOfGoodnessP, innocentP, pureP, hammerP } from "../assets/store/probStore";
</script>

<main>
    <h1>사용량</h1>
    <p>
        <ImageText
            imgSrc="./images/Use_Chaos_Scroll.webp"
            text={`혼돈의 주문서 ${$chaosP}%`}
        />
        <span><strong>x{$chaosCount}</strong></span>
    </p>
    <p>
        <ImageText
            imgSrc="./images/Use_Chaos_Scroll.webp"
            text={`긍정의 혼돈 주문서 ${$chaosOfGoodnessP}%`}
        />
        <span><strong>x{$chaosOfGoodnessCount}</strong></span>
    </p>
    <p>
        <ImageText
            imgSrc="./images/Use_Chaos_Scroll.webp"
            text={`놀라운 혼돈의 주문서 ${$incredibleChaosP}%`}
        />
        <span><strong>x{$incredibleChaosCount}</strong></span>
    </p>
    <p>
        <ImageText
            imgSrc="./images/Use_Chaos_Scroll.webp"
            text={`놀라운 긍정의 혼돈 주문서 ${$incredibleChaosOfGoodnessP}%`}
        />
        <span><strong>x{$incredibleChaosOfGoodnessCount}</strong></span>
    </p>
    <p>
        <ImageText
            imgSrc="./images/Return_Scroll.png"
            text="리턴 스크롤"
        />
        <span><strong>x{$returnCount}</strong></span>
    </p>
    <p>
        <ImageText
            imgSrc="./images/Recovery_Shield.png"
            text="리커버리 실드"
        />
        <span><strong>x{$recoveryCount}</strong></span>
    </p>
    <p>
        <ImageText
            imgSrc="./images/Use_Innocence_Scroll.webp"
            text={`이노센트 주문서 ${$innocentP}%`}
        />
        <span><strong>x{$innocentCount}</strong></span>
    </p>
    <p>
        <ImageText
            imgSrc="./images/Use_Clean_Slate_Scroll.webp"
            text={`순백의 주문서 ${$pureP}%`}
        />
        <span><strong>x{$pureCount}</strong></span>
    </p>
    <p>
        <ImageText
            imgSrc="./images/Use_Golden_Hammer.webp"
            text={`황금 망치 ${$hammerP}%`}
        />
        <span><strong>x{$hammerCount}</strong></span>
    </p>
</main>

<style>
    main p {
        text-align: left;
        font-size: 20px;
        width: 16em;
        height: 36px;
        margin: 3px;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
</style>
