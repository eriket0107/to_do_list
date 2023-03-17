import styles from './Input.module.css';

export function Input({...rest}){
	return (
		<div className={styles.container}>
			<input type="text" placeholder='Adicione uma nova tarefa' {...rest}/>
		</div>
	);
}