import { css, CSSResultGroup } from "lit";

export const ticketFormStyles: CSSResultGroup = css`
    .login_wrapper {
        margin: 3rem auto;
        background: rgb(255, 255, 255);
        padding: 3rem;
        width: 25%;
        display: flex;
        gap: 1rem;
        flex-direction: column;
    }
    select, input, button, textarea {
        width: 100%;
    }
    input, select, textarea {
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }
    button {
        padding: 0.75rem 1rem;
        background-color: #0a95ff;
        color: #ffffff;
        border: none;
        cursor: pointer;
    }
`;