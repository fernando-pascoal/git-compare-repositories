import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;
`;

export const Repository = styled.div`
    width: 250px;
    background: #fff;
    border-radius: 3px;
    margin: 0 20px;
    margin-bottom: 50px;

    display: flex;
    flex-direction: column;

    header {
        padding: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        img {
            width: 64px;
        }
        strong {
            font-size: 24px;
            margin-top: 10px;
        }
        small {
            font-size: 14px;
            color: #666;
        }
    }

    ul {
        list-style: none;
        li {
            font-weight: bold;
            padding: 12px 20px;

            small {
                font-weight: normal;
                font-size: 12px;
                color: #999;
                font-style: italic;
            }

            &:nth-child(2n-1) {
                background: #f5f5f5;
            }
        }
        button {
            width: 100%;
            height: 40px;
            cursor: pointer;
            background: #63f5b8;
            color: #fff;
            border: 0;
            font-size: 20px;
            font-weight: bold;
            border-radius: 3px;

            &:hover {
                background: #52d89f;
            }

            &:nth-child(2n) {
                background-color: rgba(214, 69, 65, 0.9);
                &:hover {
                    background-color: rgba(214, 69, 65, 1);
                }
            }
        }
    }
`;
