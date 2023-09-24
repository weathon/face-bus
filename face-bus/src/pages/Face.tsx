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
  IonList,
  IonItem,
  IonInput,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { qrCodeOutline, cashOutline, ticketOutline, train, trainOutline, analyticsOutline, happyOutline, homeOutline, cardOutline } from 'ionicons/icons';
import './Home.css';
import { OverlayEventDetail } from '@ionic/core/components';
import { setSourceMapRange } from 'typescript';



const Face: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const handleSubmit = () => {
    
    console.log('Card Number Entered:', cardNumber);
    fetch("https://8000-weathon-facebus-qiqi4k0uqz8.ws-us104.gitpod.io/link_card?card="+cardNumber, {credentials: 'include'})      .then(x => x.json())
    .then(data => {
      alert("Linked with "+cardNumber)
    }
    ).catch(()=>
    alert("Error"))
  };

  

 

  return (
    <IonPage>
    <IonHeader>
        <IonToolbar>
          <IonTitle>Link My Card</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" >Link My Card</IonTitle>
          </IonToolbar>
        </IonHeader>

      <IonList>
          <br />
          <br />
      <IonItem>
        <IonInput label="Enter Card Number"  value={cardNumber}  onIonChange={(e) => setCardNumber(e.detail.value!)}></IonInput>
      </IonItem>
      </IonList>
      <IonButton expand="block" onClick={handleSubmit}>
          Submit
        </IonButton>
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

export default Face;
