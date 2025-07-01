const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface Todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

export async function fetchTodos(): Promise<Todo[]> {
	const res = await fetch(`${BASE_URL}/todos`);
	if (!res.ok) {
		throw new Error('Ошибка загрузки списка задач');
	}
	return res.json();
}

export async function fetchTodo(id: number): Promise<Todo> {
	const res = await fetch(`${BASE_URL}/todos/${id}`);
	if (!res.ok) {
		throw new Error('Ошибка загрузки задачи');
	}
	return res.json();
}

export async function createTodo(title: string): Promise<Todo> {
	const res = await fetch(`${BASE_URL}/todos`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ title, completed: false, userId: 1 }),
	});
	if (!res.ok) {
		throw new Error('Ошибка создания задачи');
	}
	return res.json();
}
