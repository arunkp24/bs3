import { css, CSSResultGroup } from "lit";

export const ticketItemStyles: CSSResultGroup = css`
    .card {
        background: #ffffff;
        cursor: pointer;
    }
    .card_body {
        padding: 2rem;
    }
    .card_footer {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        border-top: 1px solid #eee;
    }
    .status {
        width: 1rem;
        height: 1rem;
        border-radius: 1rem;
    }
    .red {
        background-color: red;
    }
    .orange {
        background-color: orange;
    }
    .green {
        background-color: green;
    }
    .owner {
        font-size: 12px;
        font-style: italic;
    }
`;