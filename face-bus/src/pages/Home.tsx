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
import { qrCodeOutline, cashOutline, ticketOutline, train, trainOutline, playCircle, homeOutline, save, saveOutline, happyOutline, analyticsOutline, cardOutline } from 'ionicons/icons';
import './Home.css';
import { OverlayEventDetail } from '@ionic/core/components';
import { setSourceMapRange } from 'typescript';


const server_adress = "https://8000-weathon-facebus-qiqi4k0uqz8.ws-us104.gitpod.io"

const Home: React.FC = () => {



  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    fetch(server_adress+"/balance_and_pass",{credentials: 'include'})
      .then(x => x.json())
      .then(data => {
        setBal(data[1]);
        setpass(data[0]);
        setpoint(data[2])
      }
      )

    // location.reload()

  };


  const [bal, setBal] = useState('...');
  const [passname, setpass] = useState('No Pass');
  const [point,setpoint] =useState('None');
  const [img_src, set_img_src] = useState(server_adress+"/qrcode?source=pass");
  const [source, setSource] = useState("pass");
  const [name, setName] = useState("Ashar");

  useEffect(() => {
    fetch(server_adress+"/balance_and_pass",{credentials: 'include'})
      .then(x => x.json())
      .then(data => {
        setBal(data[1]);
        setpass(data[0]);
        setpoint(data[2])
      }
      )
  }, [])
  const [showModal, setShowModal] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hi, {name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" >Hi, {name}</IonTitle>
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



        <IonCard color="tertiary">
          <IonRow>
            <IonCol>
              <p style={{ fontSize: '30px', paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
              
                <IonIcon icon={trainOutline} style={{ fontSize: '30px', marginRight: '10px' }} />
                <b>Points</b>
              </p>
            </IonCol>
            <IonCol><p style={{ fontWeight: '600', fontSize: '30px', paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
              {point}</p></IonCol>
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
                    set_img_src(server_adress+"/qrcode?source=pass")
                    setSource("pass")
                }}>
                    <IonLabel>Use Pass</IonLabel>
                  </IonSegmentButton>
                 
                  <IonSegmentButton value="balance" onClick={(a)=>{
                    set_img_src(server_adress+"/qrcode?source=balance")
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

export default Home;
