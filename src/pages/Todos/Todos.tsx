import { useState, useEffect } from 'react';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonInput,
	IonButton,
	IonList,
	IonItem,
	IonCheckbox,
	IonLabel,
	IonSegment,
	IonSegmentButton,
} from '@ionic/react';
import './Todos.css';

interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

const Todos: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>(() => {
		const saved = localStorage.getItem('todos');
		return saved ? JSON.parse(saved) : [];
	});
	const [text, setText] = useState('');
	const [filter, setFilter] = useState<Filter>('all');
	const [page, setPage] = useState(1);
	const pageSize = 5;

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const addTodo = () => {
		if (text.trim() === '') return;
		setTodos([{ id: Date.now(), text, completed: false }, ...todos]);
		setText('');
		setPage(1);
	};

	const toggleTodo = (id: number) => {
		setTodos(
			todos.map((t) =>
				t.id === id ? { ...t, completed: !t.completed } : t
			)
		);
	};

	const filtered = todos.filter((t) => {
		if (filter === 'completed') return t.completed;
		if (filter === 'active') return !t.completed;
		return true;
	});

	const pageCount = Math.ceil(filtered.length / pageSize);
	const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Задачи</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<IonInput
					value={text}
					placeholder="Новая задача"
					onIonChange={(e) => setText(e.detail.value!)}
				/>
				<IonButton onClick={addTodo}>Добавить</IonButton>

				<IonSegment
					value={filter}
					onIonChange={(e) => setFilter(e.detail.value as Filter)}
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

				<IonList>
					{paginated.map((todo) => (
						<IonItem key={todo.id}>
							<IonCheckbox
								checked={todo.completed}
								onIonChange={() => toggleTodo(todo.id)}
								slot="start"
							/>
							<IonLabel
								className={
									todo.completed ? 'todo-completed' : ''
								}
							>
								{todo.text}
							</IonLabel>
						</IonItem>
					))}
				</IonList>

				{pageCount > 1 && (
					<div className="pagination">
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
			</IonContent>
		</IonPage>
	);
};

export default Todos;
