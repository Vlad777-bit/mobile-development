import { useEffect, useState } from 'react';
import {
	IonContent,
	IonPage,
	IonSegment,
	IonSegmentButton,
	IonLabel,
	IonButton,
	IonSpinner,
	IonInput,
	IonItem,
	IonSelect,
	IonSelectOption,
} from '@ionic/react';
import Header from '@/components/Header';
import ItemCard from '@/components/ItemCard';
import { fetchTodos, createTodo, Todo } from '@/services/api';

const pageSize = 10;

const Home: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
	const [sort, setSort] = useState<'asc' | 'desc'>('asc');
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [newTitle, setNewTitle] = useState('');

	useEffect(() => {
		const load = async () => {
			try {
				const data = await fetchTodos();
				setTodos(data.slice(0, 50)); // ограничиваем список для примера
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	const handleAdd = async () => {
		if (!newTitle.trim()) return;
		try {
			const todo = await createTodo(newTitle.trim());
			setTodos((prev) => [todo, ...prev]);
			setNewTitle('');
		} catch (err) {
			setError((err as Error).message);
		}
	};

	const handleToggle = (id: number) => {
		setTodos((prev) =>
			prev.map((t) =>
				t.id === id ? { ...t, completed: !t.completed } : t
			)
		);
	};

	const filtered = todos.filter((t) => {
		if (filter === 'completed') return t.completed;
		if (filter === 'active') return !t.completed;
		return true;
	});

	const sorted = [...filtered].sort((a, b) => {
		const res = a.title.localeCompare(b.title);
		return sort === 'asc' ? res : -res;
	});

	const pageCount = Math.ceil(sorted.length / pageSize);
	const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

	return (
		<IonPage>
			<Header title="Задачи" />
			<IonContent className="ion-padding">
				{loading && <IonSpinner />}
				{error && <p>{error}</p>}
				{!loading && !error && (
					<>
						<IonItem>
							<IonInput
								value={newTitle}
								placeholder="Новая задача"
								onIonChange={(e) =>
									setNewTitle(e.detail.value!)
								}
							/>
							<IonButton onClick={handleAdd}>Добавить</IonButton>
						</IonItem>

						<IonSegment
							value={filter}
							onIonChange={(e) => {
								setFilter(
									e.detail.value as
										| 'all'
										| 'active'
										| 'completed'
								);
								setPage(1);
							}}
						>
							<IonSegmentButton value="all">
								<IonLabel>Все</IonLabel>
							</IonSegmentButton>
							<IonSegmentButton value="active">
								<IonLabel>Активные</IonLabel>
							</IonSegmentButton>
							<IonSegmentButton value="completed">
								<IonLabel>Выполненные</IonLabel>
							</IonSegmentButton>
						</IonSegment>

						<IonItem>
							<IonLabel>Сортировка</IonLabel>
							<IonSelect
								value={sort}
								placeholder="Порядок"
								onIonChange={(e) => {
									setSort(e.detail.value);
									setPage(1);
								}}
							>
								<IonSelectOption value="asc">
									По названию (А-Я)
								</IonSelectOption>
								<IonSelectOption value="desc">
									По названию (Я-А)
								</IonSelectOption>
							</IonSelect>
						</IonItem>

						{paginated.map((todo) => (
							<ItemCard
								key={todo.id}
								todo={todo}
								onToggle={() => handleToggle(todo.id)}
							/>
						))}

						{pageCount > 1 && (
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									paddingTop: '1rem',
								}}
							>
								<IonButton
									disabled={page === 1}
									onClick={() => setPage(page - 1)}
								>
									Назад
								</IonButton>
								<span>
									{page} / {pageCount}
								</span>
								<IonButton
									disabled={page === pageCount}
									onClick={() => setPage(page + 1)}
								>
									Далее
								</IonButton>
							</div>
						)}
					</>
				)}
			</IonContent>
		</IonPage>
	);
};

export default Home;
