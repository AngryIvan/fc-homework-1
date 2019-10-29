export default `
    img {
        max-width: 50%;
        align-self: center
    }

    .container {
        width: 100%;
    }

    article {
        margin: 30px 0;
        display: flex;
        flex-flow: row;
    }

    .content {
        padding: 20px;
    }

    a {
        color: #e6e664;
    }

    @media only screen and (max-width: 768px) {
        article {
            display: flex;
            flex-flow: column;
        }

        img {
            max-width: 100%;
        }
    }
`