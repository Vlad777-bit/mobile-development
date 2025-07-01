import { IonContent, IonPage } from '@ionic/react';
import Header from '@/components/Header';

const About: React.FC = () => (
	<IonPage>
		<Header title="О приложении" />
		<IonContent className="ion-padding">
			<h2>О нашем TODO приложении</h2>
			<p>
				Это приложение демонстрирует работу с JSONPlaceholder. Вы можете
				просматривать список задач, отмечать их выполнение и создавать
				новые.
			</p>
		</IonContent>
	</IonPage>
);

export default About;
