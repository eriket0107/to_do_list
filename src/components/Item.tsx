import styles from './Item.module.css';

import {Trash, Check } from 'phosphor-react';
import { ChangeEvent } from 'react';

interface CheckboxProps {
  id: string;
  text: string;
  isChecked: boolean;
	onDeleteItem: (item: string) => void
  onCheckboxChange: (id: string, isChecked: boolean) => void;
}

export function Item({id, text, isChecked, onCheckboxChange, onDeleteItem }:CheckboxProps) {
	
	function handleDeleteItem() {
		onDeleteItem(id);
	}

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		onCheckboxChange(id, event.target.checked);
	};

	const done = isChecked ? styles.done : styles.toDo;

	return (
		<li className={styles.listItem}>
			<label className={done}>
				<input className={styles.checkbox} onChange={handleCheckboxChange} type="checkbox" checked={isChecked}/>
				{isChecked ? <span className={styles.checkmark} ><Check/></span> : <span className={styles.checkmark}></span>}
				{text}
			</label>
			<button onClick={handleDeleteItem}><Trash size={20}/></button>
		</li>
	);
}
