import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import Header from '@/components/Header';
import { fetchTodo, Todo } from '@/services/api';

interface Params {
	id: string;
}

const Detail: React.FC = () => {
	const { id } = useParams<Params>();
	const [todo, setTodo] = useState<Todo | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const load = async () => {
			try {
				const data = await fetchTodo(Number(id));
				setTodo(data);
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [id]);

	return (
		<IonPage>
			<Header title="Детали" />
			<IonContent className="ion-padding">
				{loading && <IonSpinner />}
				{error && <p>{error}</p>}
				{todo && !loading && !error && (
					<div>
						<h2>{todo.title}</h2>
						<p>
							Статус: {todo.completed ? 'Выполнена' : 'Активна'}
						</p>
					</div>
				)}
			</IonContent>
		</IonPage>
	);
};

export default Detail;
