import styled from "styled-components"
import MyTubeLogo from "../../assets/mytube.png"

export const BackgroundImg = styled.img`
    background: url(${MyTubeLogo}) center/cover no-repeat;
    height: 600px;
    padding: 13rem;
`
export const ContainerFirst = styled.main`
    display: flex;
    width: 100%;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div{
        display: flex;
        width: 60%;

        input{
            font-size: 1.8rem;
            width: 100%;
            padding: 1rem;
            border: none;
            border-top-left-radius: .3rem;
            border-bottom-left-radius: .3rem;
        }
    
        button{
            padding: 1rem;
            font-size: 1.5rem;
            border: none;
            border-top-right-radius: .3rem;
            border-bottom-right-radius: .3rem;
        }
    }

    @media(max-width: 1008px){
        div{
            width: 90%;
        }
    }
`

export const Container = styled.main`
    max-width: 94.4rem;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    flex-wrap: wrap;
` 
export const Video = styled.div`
    order: 1;
    width: 70%;

    @media(max-width: 917px){
        width: 100%;
    }
`

export const List = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 28%;
    background-color: #19191C;
    border-radius: 0 0 6px 6px;
    font-family: "roboto slab", sans-serif;
    order: 2;

    ul{
        color: #9CA3AF;
        list-style: none;
        font-size: 0.8rem;
        overflow-y: auto;
        
        li{
            padding: 1.2rem 1.2rem;
            display: flex;
            justify-content: space-between;
            text-transform: capitalize;
        

            &:hover{
                background-color: #202024;
                cursor: pointer;
            }

            span{
                font-size: 16px;
                opacity: 0.5;
                display: flex;
                margin-left: 1.2rem;
                align-self: start;

                .deleted{
                    color: red;
                    align-self: center;
                    transition: .2s;

                    &:hover{
                        opacity: 1;
                        transition: .2s;
                    }
                }
            }
        }
    }

    input{
        width: 90%;
        border-bottom-left-radius: .5rem;
        font-size: 1.5rem;
    }

    button{
        width: 10%;
        border-bottom-right-radius: .5rem;
        font-size: 21px;

        &:hover{
            cursor: pointer;
            svg{
                fill: #363636;
                transition: .3s;
            }
        }
    }

    input, button{
        padding: .8rem;
        border: none;
    }

    @media(max-width: 917px){
        width: 100%;
        order: 4;
        height: 400px;
    }

    @media(max-width: 407px){
        ul li p{
            width: 60%;
        }
    }

    @media(max-width: 320px){
        ul{
            font-size: .7rem;
        }

        input{
            font-size: 1.3rem;
        }

        button{
            padding: .7rem;
        }
    }
`

export const Description = styled.div`
    margin: 1rem 0;
    color: #F9FAFB;
    width: 70%;
    order: 3;
    font-family: "roboto slab", sans-serif;

    h1{
        padding: 1.2rem 1.6rem;
        text-align: center;
        width: 12rem;
        border-bottom: 3px solid #E11D48;
    }

    div{
        border-top: 1px solid #363535;
        padding-top: 1.5rem;
        
        p{
            margin-top: .4rem;
            font-size: large;
        }
    }

    @media(max-width: 917px){
        margin-top: 0;
        margin-bottom: 6.5rem;
        width: 100%;

        h1{
            font-size: medium;
        }

        div p{
                margin: .5rem 0 0 1rem;
                font-size: medium;
        }  
    }

    @media(max-width: 320px){
        h1{
            font-size: small;
        }

        div p{
                font-size: small;
        }  
    }
`

