import { css, CSSResultGroup } from "lit";

export const headerStyles: CSSResultGroup = css`
    header {
        background: #0a95ff;
    }
    .nav {
        position: sticky;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        top: 0;
        color: #ffffff;
        margin: 0 5rem;
    }
    .btn {
        padding: 0.5rem 1rem;
        background-color: #ffffff;
        border-color: #ffffff;
        color: #0a95ff;
        text-decoration: none;
        cursor: pointer;
    }
    .title {
        text-decoration: none;
        color: #ffffff;
        cursor: pointer;
    }
`;