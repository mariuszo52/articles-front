import {useState} from "react";
import axios from "axios"


function MainPage() {
    const [url, setUrl] = useState(null)
    const [articleUrl, setArticleUrl] = useState(null)
    const [spanishBody, setSpanishBody] = useState(null)
    const [polishBody, setPolishBody] = useState("")
    const [pass, setPass] = useState(null)
    const [errors, setErrors] = useState("")
    const token = "EAAF16jKZAliIBO3yIssTAIeCjU8FIFBoYBo1wERgVJNsmAFJW2QsktL3GxMHDZAzowyYGZCJumlKdc1ZAzVZAj9dTIVqlM4QlfChFxXNDUtKeELA2rYgWc3vkt4hDVZAceFttQQmB0jRof3y8XrSBF4Hc0eO6yvbaDOImGpFN19F1roeYQ4ZB8q4fyk8XelKp0ZD"
    const sendPostUrl = "https://graph.facebook.com/107046711659175/photos"
    const translateApiUrl = "https://api.openai.com/v1/chat/completions"



    function scrapArticle(event) {
        event.preventDefault()
        let params ={
            url: articleUrl
        }

        axios.post("http://localhost:8080/scrap", null, {params: params})
            .then(response => {
                setSpanishBody(response.data.body)
                setUrl(response.data.photoUrl)
            })
            .catch(err => setErrors(err.response.data))

    }

    function onFormSubmit(event) {
        event.preventDefault()
        let data = {
            url: url,
            message: polishBody,
            access_token: token
        }
        axios.post(sendPostUrl, data)
            .then(response => console.log(response.data))
            .catch(err => setErrors(err.response.data))

    }

    function translate(event) {
        event.preventDefault()

        let data = {
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: "Translate the following text to Polish: " + spanishBody
                }],
        }
        let headers = {
            Authorization: process.env.REACT_APP_GPT_API_KEY
        }
        axios.post(translateApiUrl, data, {headers: headers})
            .then(response => setPolishBody(response.data.choices[0].message.content))
            .catch(err => setErrors(err.response.data))
    }


    return (
        <div className={"main-div"}>
            <p>SCRAPOWANIE</p>
            <form onSubmit={scrapArticle}>
                <label>PODAJ URL ARTYKUŁU</label>
                <input onChange={event => setArticleUrl(event.target.value)}/>
                <button type={"submit"}>SCRAPUJ ARTYKUŁ</button>
            </form>
            TŁUMACZ AI
            <form onSubmit={translate}>
                <textarea value={spanishBody} onChange={event => setSpanishBody(event.target.value)}></textarea>
                <button type={"submit"}>TŁUMACZ AI</button>
            </form>
            WYŚLIJ NA FANPAGE
            <form onSubmit={onFormSubmit}>
                <label>Url</label>
                <input required={true} value={url} onChange={event => setUrl(event.target.value)}/>
                <label>Message</label>
                <textarea required={true} value={polishBody} onChange={event => setPolishBody(event.target.value)}/>
                <label>Password</label>
                <input required={true} onChange={event => setPass(event.target.value)}/>
                <button type={"submit"}>Prześlij</button>
            </form>
            <p>ERRORS: {errors}</p>
        </div>
    )
}

export default MainPage;