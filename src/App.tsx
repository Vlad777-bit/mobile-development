import { Redirect, Route } from 'react-router-dom';
import {
	IonApp,
	IonRouterOutlet,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel,
	setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { informationCircle, home as homeIcon, list } from 'ionicons/icons';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Todos from './pages/Todos';

setupIonicReact();

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonRouterOutlet>
				<Route exact path="/home">
					<Home />
				</Route>
				<Route exact path="/">
					<Redirect to="/home" />
				</Route>
			</IonRouterOutlet>
			<IonTabs>
				<IonRouterOutlet>
					<Route exact path="/home">
						<Home />
					</Route>
					<Route exact path="/about">
						<About />
					</Route>
					<Route exact path="/todos">
						<Todos />
					</Route>
					<Route exact path="/">
						<Redirect to="/home" />
					</Route>
				</IonRouterOutlet>
				<IonTabBar slot="bottom">
					<IonTabButton tab="home" href="/home">
						<IonIcon icon={homeIcon} />
						<IonLabel>Главная</IonLabel>
					</IonTabButton>
					<IonTabButton tab="todos" href="/todos">
						<IonIcon icon={list} />
						<IonLabel>Задачи</IonLabel>
					</IonTabButton>
					<IonTabButton tab="about" href="/about">
						<IonIcon icon={informationCircle} />
						<IonLabel>О приложении</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	</IonApp>
);

export default App;
