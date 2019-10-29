export default `
    .content {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    select {
        width: 80%;
        margin: 0;
        font-size: 1.5em;
        line-height: 1.3;
        padding: .6em 1.4em .5em .8em;
        border: 1px solid #aaa;
        border-radius: .5em;
    }

    section {
        width: 80%;
    }

    @media only screen and (max-width: 768px) {
        select {
            width: 100%;
        }
        
        section {
            width: 100%;
        }
    }
`