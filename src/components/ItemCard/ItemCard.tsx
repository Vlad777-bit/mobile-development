import { IonCard, IonCardContent, IonLabel, IonCheckbox } from '@ionic/react';
import { Todo } from '@/services/api';
import './ItemCard.css';

interface Props {
	todo: Todo;
	onToggle?: () => void;
}

const ItemCard: React.FC<Props> = ({ todo, onToggle }) => (
	<IonCard className={`item-card ${todo.completed ? 'completed' : ''}`}>
		<IonCardContent className="ion-no-padding">
			<div className="item-row">
				<IonCheckbox checked={todo.completed} onIonChange={onToggle} />
				<IonLabel className="item-title">{todo.title}</IonLabel>
			</div>
		</IonCardContent>
	</IonCard>
);

export default ItemCard;
