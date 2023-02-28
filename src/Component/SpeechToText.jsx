import React from 'react'
import axios from 'axios';

function SpeechToText() {

    return (
        <>
            <input type="file" onChange={(e) => {
                const file = e.target.files[0];

                const reader = new FileReader();
                reader.readAsArrayBuffer(file);

                reader.onload = () => {
                    const data = reader.result;

                    axios.post('https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US', data, {
                        headers: {
                            "Ocp-Apim-Subscription-Key": "8d518c7b84be47e18735490f6239a6e8",
                            "Content-Type": "audio/wav"
                        }
                    })
                        .then(response => {
                            console.log(response);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                };
            }} />
        </>
    )
}

export default SpeechToText