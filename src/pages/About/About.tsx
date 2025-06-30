import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react';

const About: React.FC = () => (
	<IonPage>
		<IonHeader>
			<IonToolbar>
				<IonTitle>О приложении</IonTitle>
			</IonToolbar>
		</IonHeader>
		<IonContent className="ion-padding">
			<h2>О нашем TODO приложении</h2>
			<p>
				Это приложение помогает вести список задач. Вы можете добавлять
				новые дела, отмечать их выполнение и эффективно планировать свой
				день.
			</p>
		</IonContent>
	</IonPage>
);

export default About;
