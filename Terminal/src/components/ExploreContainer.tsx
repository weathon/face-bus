import { useEffect } from 'react';
import './ExploreContainer.css';
import Webcam from 'webcam-easy';
import { IonButton } from '@ionic/react';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  var webcam: any;
  const send = () => {
    const picture = webcam.snap();
    alert(picture)
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
      <IonButton expand="block" onClick={send}>Snap</IonButton>
    </>

  );
};

export default ExploreContainer;
