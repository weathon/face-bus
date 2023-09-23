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
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { qrCodeOutline, cashOutline, ticketOutline } from 'ionicons/icons';
import './Home.css';
import { OverlayEventDetail } from '@ionic/core/components';
import { setSourceMapRange } from 'typescript';



const Home: React.FC = () => {



  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  const [bal, setBal] = useState('...');
  const [passname, setpass] = useState('No Pass');
  const [img_src, set_img_src] = useState("https://8000-weathon-facebus-qiqi4k0uqz8.ws-us104.gitpod.io/qrcode?source=pass");
  const [source, setSource] = useState("pass");
  useEffect(() => {
    fetch("https://8000-weathon-facebus-qiqi4k0uqz8.ws-us104.gitpod.io/balance_and_pass")
      .then(x => x.json())
      .then(data => {
        setBal(data[1]);
        setpass(data[0])
      }
      )
  }, [])
  const [showModal, setShowModal] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" >My Transit</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard color="primary">
          <IonRow>
            <IonCol>
              <p style={{ fontSize: '30px', paddingLeft: '10px', display: 'flex', alignItems: 'center', fontWeight: '600' }}>
                <IonIcon icon={ticketOutline} style={{ fontSize: '30px', marginRight: '10px' }} />
                Pass
              </p>
            </IonCol>

            <IonCol><p style={{ fontSize: '30px', paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
              <b>{passname}</b></p></IonCol>
          </IonRow>
        </IonCard>
        <IonCard color="secondary">
          <IonRow>
            <IonCol>
              <p style={{ fontSize: '30px', paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
                <IonIcon icon={cashOutline} style={{ fontSize: '30px', marginRight: '10px' }} />
                <b>Balance</b>
              </p>
            </IonCol>
            <IonCol><p style={{ fontWeight: '600', fontSize: '30px', paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
              <b>$</b>{bal}</p></IonCol>
          </IonRow>
        </IonCard>
        <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{ margin: '20px' }}>
          <IonFabButton onClick={openModal}>
            <IonIcon icon={qrCodeOutline} />
          </IonFabButton>
        </IonFab>
        <IonModal isOpen={showModal} onDidDismiss={closeModal}>
          <IonContent>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Your Buss Pass</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonCardContent>
            
                <IonSegment value={source}>
                  <IonSegmentButton value="pass" onClick={(a)=>{
                    set_img_src("https://8000-weathon-facebus-qiqi4k0uqz8.ws-us104.gitpod.io/qrcode?source=pass")
                    setSource("pass")
                }}>
                    <IonLabel>Use Pass</IonLabel>
                  </IonSegmentButton>
                 
                  <IonSegmentButton value="balance" onClick={(a)=>{
                    set_img_src("https://8000-weathon-facebus-qiqi4k0uqz8.ws-us104.gitpod.io/qrcode?source=balance")
                    setSource("balance")

                }}>
                    <IonLabel>Use Balance</IonLabel>
                  </IonSegmentButton>
                </IonSegment>

              <br/>
              <img style={{ backgroundColor: 'white', width: '100%' }} src={img_src}></img>
            </IonCardContent>
            <IonButton expand="full" onClick={closeModal}>
              Close
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>


  );
};

export default Home;
