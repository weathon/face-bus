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
import { qrCodeOutline, cashOutline, ticketOutline, train, trainOutline, analyticsOutline, happyOutline, homeOutline } from 'ionicons/icons';
import './Home.css';
import { OverlayEventDetail } from '@ionic/core/components';
import { setSourceMapRange } from 'typescript';



const Face: React.FC = () => {


  return (
    <IonPage>
      <IonHeader>
        
        <IonToolbar>
        <IonTitle size="large" >My Face</IonTitle>
        </IonToolbar>
      </IonHeader>
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
          <IonIcon icon={happyOutline} />
          <IonLabel>My Face</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonPage>


  );
};

export default Face;
