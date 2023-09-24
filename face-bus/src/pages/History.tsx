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



const History: React.FC = () => {


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
        
        <IonCard color="primary">
          <IonCardContent>
          
            <IonIcon icon={busOutline} size="large" />

      
            <h2>Route Number: 123</h2>

            <p>Bus Stop: Main Street</p>

            
            <p>Time: 10:00 AM</p>
          </IonCardContent>
        </IonCard>

        <IonCard  color="secondary">
          <IonCardContent>
          
            <IonIcon icon={trainOutline} size="large" />

      
            <h2>Route Number: 123</h2>

            <p>Bus Stop: Main Street</p>

            
            <p>Time: 10:00 AM</p>
          </IonCardContent>
        </IonCard>

        <IonCard color="tertiary">
          <IonCardContent>
          
            <IonIcon icon={boatOutline} size="large" />

      
            <h2>Route Number: 123</h2>

            <p>Bus Stop: Main Street</p>

            
            <p>Time: 10:00 AM</p>
          </IonCardContent>
        </IonCard>


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
