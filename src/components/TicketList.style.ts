import { css, CSSResultGroup } from "lit";

export const ticketListStyles: CSSResultGroup = css`
    .list_wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
    }
    .item {
        flex-basis: 30%;
    }
`;