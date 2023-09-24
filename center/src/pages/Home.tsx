import {React, useState} from 'react';
import { IonContent, IonButton, IonGrid, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonList, IonTextarea } from '@ionic/react';
import './Home.css';
const address = 'https://9999-weathon-facebus-qiqi4k0uqz8.ws-us104.gitpod.io/'
const Home: React.FC = () => {
  const [res, setRes] = useState("")
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Statistics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol size="6">

              <div className="left-half">

                <img src={address + "/center_chart?id=1"} style={{ width: '100%' }} />
              </div>
            </IonCol>
            <IonCol size="6">

              <div className="right-half">
                <IonList>
                  <IonItem>
                    <IonTextarea label="Let GPT analyse data" placeholder="Type something here" id="text"></IonTextarea>
                  </IonItem>

                  <IonButton expand="block" onClick={() => {
                    //@ts-ignore
                    // console.log(document.getElementById("text").value)
                    setRes("Loading...")
                    fetch("https://9999-weathon-facebus-qiqi4k0uqz8.ws-us104.gitpod.io/chat?prompt=" + document.getElementById("text").value, { credentials: 'include' }).then(x => x.json())
                      .then(data => {
                        // alert(data)
                        setRes(data)
                      })
                  }}>
                    Submit
                  </IonButton>
                  <IonItem>
                  <p>{res}</p>

                  </IonItem>
                </IonList>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
