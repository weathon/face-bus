import React from 'react';
import { IonContent, IonGrid, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonList, IonTextarea } from '@ionic/react';
import './Home.css';
const address = 'https://8000-weathon-facebus-qiqi4k0uqz8.ws-us104.gitpod.io/'
const Home: React.FC = () => {
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
               
                 
                  
                    <img src={address+"/center_chart?id=1"} style={{width:'100%'}} />
                  
                  
                
              </div>
            </IonCol>
            <IonCol size="6">
              
              <div className="right-half">
              <IonList>
      <IonItem>
        <IonTextarea label="Let GPT analyse data" placeholder="Type something here"></IonTextarea>
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
