import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';

interface HeaderProps {
	title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
	<IonHeader>
		<IonToolbar>
			<IonTitle>{title}</IonTitle>
		</IonToolbar>
	</IonHeader>
);

export default Header;
