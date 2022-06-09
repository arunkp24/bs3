import { css, CSSResultGroup } from "lit";

export const dashboardStyles: CSSResultGroup = css`
    .dashboard_wrapper {
        margin: 1rem 5rem;
    }
    .dashboard_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .btn {
        padding: 0.5rem 1rem;
        background-color: #0a95ff;
        border: none;
        color: #ffffff;
        text-decoration: none;
        cursor: pointer;
    }
`;