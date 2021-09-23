import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    :root {
        --darkblue: #07153C;
        --blue: #017AFF;
        --lightblue: #689CD3;
        --lightblue2: #B1D4F0;
        --white: #f5f5f5;
        --black: #0c0d0d;
    }

    body {
        background: var(--lightblue2);
        color: var(--darkblue);
    }

    body, input, button {
        font-family: 'PT Serif', serif;
        font-size: 1rem;
    }

    h1,h2,h3,h4,h5,h6 {
        font-family: 'Roboto Mono', monospace;
        font-weight: 700;
    }

    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }
`;
