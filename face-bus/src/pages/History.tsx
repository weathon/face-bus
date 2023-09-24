import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonRow,
  IonCol,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonButton,
  IonText,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { qrCodeOutline, cashOutline, ticketOutline, train, trainOutline, analyticsOutline, happyOutline, homeOutline, busOutline, boatOutline, cardOutline } from 'ionicons/icons';
import './Home.css';
import { OverlayEventDetail } from '@ionic/core/components';
import { setSourceMapRange } from 'typescript';
// const data = [["bus", 90, "UBCO", "July 23, 2023 3:20pm"],["Train", 8, "Downtown", "July 23, 2023 3:20pm"],["Train", 8, "Downtown", "July 23, 2023 3:20pm"],["Train", 8, "Downtown", "July 23, 2023 3:20pm"],["Train", 8, "Downtown", "July 23, 2023 3:20pm"],["Train", 8, "Downtown", "July 23, 2023 3:20pm"]]


const History: React.FC = () => {
  const [d, setData] = useState([]);

 useEffect(()=>{
  fetch("https://9999-weathon-facebus-qiqi4k0uqz8.ws-us104.gitpod.io/history",{credentials: 'include'}).then(x => x.json())
  .then(data => {
    console.log(data)
    setData(data.reverse())
  }
  )
 },[])
  return (
    <IonPage>
    <IonHeader>
        <IonToolbar>
          <IonTitle>Travel History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" >Travel History</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        {d.map(x=>(
            <IonCard color="primary">
          <IonCardContent>
          
            <IonIcon icon={x[0]=="bus"?busOutline:(x[0]=="ferry"?boatOutline:trainOutline)} size="large" />      
            <h2>Route Number: {x[1]}</h2>
            <p>Stop: {x[2]}t</p>
            <p>Date and Time: {x[3]}</p>
          </IonCardContent>
        </IonCard>

          ))}
          
        

       


      </IonContent>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="history" href="/history">
          <IonIcon icon={analyticsOutline} />
          <IonLabel>History</IonLabel>
        </IonTabButton>

        <IonTabButton tab="face" href="/face">
        <IonIcon icon={cardOutline} />
          <IonLabel>Link card</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonPage>


  );
};

export default History;
