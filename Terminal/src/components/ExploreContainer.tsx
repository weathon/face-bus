import { useEffect, useState } from 'react';
import './ExploreContainer.css';
import Webcam from 'webcam-easy';
import { IonButton, IonCard, IonCardContent, IonContent } from '@ionic/react';

interface ContainerProps { }
var webcam: any; //forgot what i changed why

const ExploreContainer: React.FC<ContainerProps> = () => {

  const [message, setMessage] = useState("");
  const [hid, setHid] = useState("hidden");
  const send = () => {
    const picture = webcam.snap();
    console.log(picture)
    fetch("https://8000-weathon-facebus-qiqi4k0uqz8.ws-us104.gitpod.io/onboard", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "img":picture,
        "bus_number":8
      }),
    }).then(response => response.json()).then(
      (x)=>{
        setMessage(x);
        setHid("visible");
        setTimeout(()=>{
          setHid("hidden")
          //@ts-ignore
          document.getElementById("error").stop()
          //@ts-ignore
          document.getElementById("success").stop()

        }, 1000)
        if(x=="Success")
        {
          //@ts-ignore
          document.getElementById("success").play()
        }
        else{
            //@ts-ignore
            document.getElementById("error").play()
        }
      }
    )

  }
  useEffect(() => {
    //fotgot this
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    const snapSoundElement = document.getElementById('snapSound');
    webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
    webcam.start()

  }, [])

  return (
    <>
      {/* https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos */}
      <video id="webcam" autoPlay width={window.innerWidth}></video>
      <canvas id="canvas" className="d-none" hidden></canvas>
      <audio id="snapSound" preload="auto"></audio>
      <audio id="success" preload="auto" src="src/success.mp3"></audio>
      <audio id="error" preload="auto" src="src/error.mp3"></audio>
      <IonButton expand="block" onClick={send}>Snap</IonButton>

      <IonCard color={message=="Success"? "success" :"danger"} style={{visibility:hid}}>
        <IonCardContent>
        <h1>{message}</h1>
        </IonCardContent>
      </IonCard>
    </>

  );
};

export default ExploreContainer;
