import './styles/global.module.css';

import styles from './App.module.css';

import {Header} from './components/Header';
import { List } from './components/List';

function App() {

	return (<>
		<Header />
		<div className={styles.container}>
			<List />
		</div>
	</>
	);
}

export default App;
