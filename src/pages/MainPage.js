import {useState} from "react";
import axios from "axios"

function MainPage(){
    const [url, setUrl] = useState(null)
    const [message, setMessage] = useState(null)
    const token = "EAAF16jKZAliIBO350v0Xyiv5DOKSEbsrEr3sejh6h2ROWyH9wYzZAegynYZARSZBzDM32qpRQxEaZBR2lbGhLAmpkAGneUsDRR3iHArdVwXkQaQCGWpp1hkJQJOBVB76IQCjV1C5IovmMZBQ2f5GeBVWA7ByivKcisCqQYxhTW9qQBgJQfQQr3jpLGyEaZBJQ4IDuCk59FFbfrybzmqja7DiDcZD"
    const sendPostUrl = "https://graph.facebook.com/107046711659175/photos"
    function onFormSubmit(event) {
        event.preventDefault()
        let data ={
            url:url,
            message:message,
            access_token: token
        }
        axios.post(sendPostUrl, data )
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
    }

    return(
        <div className={"main-div"}>
            <form onSubmit={onFormSubmit}>
                <label>Url</label>
                <input required={true} onChange={event=> setUrl(event.target.value)}/>
                <label>Message</label>
                <textarea  required={true} onChange={event=> setMessage(event.target.value)}/>
                <button type={"submit"}>Prześlij</button>
            </form>
        </div>
    )
}
export default MainPage;