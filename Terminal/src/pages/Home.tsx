import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  const busnumber = 8;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bus {busnumber}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ExploreContainer/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
