import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        background-color: #121214;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button, textarea{
        font-family: "Roboto Slab", serif;
        font-size: 62.5%;
        outline: none;
    }

    a{
        text-decoration: none;
    }
`