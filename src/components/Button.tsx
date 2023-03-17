import { PlusCircle } from 'phosphor-react';
import styles from './Button.module.css';

interface Button {
	type: 'button' | 'submit' | 'reset';
}

export function Button({ ...rest}) {
	return (
		<button  {...rest} className={styles.container}>
			Criar <PlusCircle size={20}/>
		</button>		
	);
} 