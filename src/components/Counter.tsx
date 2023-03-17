import styles from './Counter.module.css';

interface CounterProps {
  text: string;
  count?: number;
  toDo: 'pending' | 'done';
  allItems: number;
}

export function Counter({text, count, toDo, allItems}: CounterProps) {
	const hasItems = allItems === 0 ? '0': `${count} de ${allItems}`;
	return (
		toDo === 'pending' ?  
			(<div className={styles.pending}>
				<strong>{text}</strong>
				<span className={styles.pending}>{allItems}</span>
			</div>) : 
			(<div className={styles.done}>
				<strong>{text}</strong>
				<span>{hasItems}</span>
			</div>)
    
	);
}