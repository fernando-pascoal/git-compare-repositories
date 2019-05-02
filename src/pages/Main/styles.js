import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
`;

export const Form = styled.form`
    margin-top: 20px;
    width: 100%;
    max-width: 400px;
    display: flex;

    input {
        flex: 1;
        height: 55px;
        padding: 0 20px;
        background: #fff;
        font-size: 18px;
        color: #444;
        border-radius: 3px;

        border: ${props => (props.withError ? "2px solid #f00" : "0")};
    }
    button {
        height: 55px;
        padding: 0 20px;
        margin-left: 10px;
        background: #63f5b8;
        color: #fff;
        border: 0;
        font-size: 20px;
        font-weight: bold;
        border-radius: 3px;

        &:hover {
            background: #52d89f;
        }
    }
`;

export const Message = styled.div`
    color: #fff;
    background: red;

    position: absolute;
    top: 5px;
    right: 5px;

    opacity: 0;
    transition: 0.5s;

    z-index: 999;
    border-radius: 2px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);

    padding: ${props => (props.withError ? "20px" : 0)};
    opacity: ${props => (props.withError ? 1 : 0)};
`;
