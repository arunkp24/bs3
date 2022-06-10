import { css, CSSResultGroup } from "lit";

export const whiteColor = css`#ffffff`;
export const blueColor = css`#0a95ff`;
export const redColor = css`#ff0000`;
export const orangeColor = css`#ffa500`;
export const greenColor = css`#008000`;
export const borderColor = css`#eeeeee`;

export const buttonStyle: CSSResultGroup = css`
    .btn {
        padding: 0.5rem 1rem;
        background-color: ${blueColor};
        border: none;
        color: ${whiteColor};
        text-decoration: none;
        cursor: pointer;
    }
`;

export const formElementStyle: CSSResultGroup = css`
    select, input, button {
        width: 100%;
    }
`;