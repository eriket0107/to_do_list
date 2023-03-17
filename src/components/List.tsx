import { ChangeEvent, FormEvent,InvalidEvent ,useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './List.module.css';

import {Item} from './Item';
import {Input} from './Input';
import {Button} from './Button';
import {Counter} from './Counter';

import Clipboard from '../assets/Clipboard.svg';

export function List() {

	interface data {
		id: string;
		text: string;
		isChecked: boolean;
	}
	
	const [newItem, setNewItem] = useState<string>('');
	const [listItems, setListItems] = useState<data[]>([]);
	const [listDone, setListDone] = useState<data[]>([]);

	function handleAddNewItem(event: FormEvent) {
		event.preventDefault();
		setListItems([...listItems, {
			id: uuidv4(),
			text: newItem,
			isChecked:false
		}]);
		setNewItem('');
	}

	function handleNewItemChange(event: ChangeEvent<HTMLInputElement>) {
		event.target.setCustomValidity('');
		setNewItem(event.target.value);
	}

	function handleInvalidTask(event: InvalidEvent<HTMLInputElement>) {
		event.target.setCustomValidity('Insira uma tarefa.');
	}

	function deleteItem(toDeleteItem: string) {
		const updatedList = listItems.filter(item =>{
			return item.id !== toDeleteItem;
		});
		const filteredItems = listDone.filter((item) => item.id !== toDeleteItem);
		setListItems(updatedList);
		setListDone(filteredItems);
	}

	function doneItem (id: string, isChecked: boolean) {
		const updatedItems = listItems.map((item) => {
			if (item.id === id) {
				return { ...item, isChecked };
			}
			return item;
		});
		setListItems(updatedItems);

		if (isChecked) {
			setListDone([...listDone, {
				id,
				text: newItem,
				isChecked
			}]);

		} else {
			const filteredItems = listDone.filter((item) => item.id !== id);
			setListDone(filteredItems);
		}
	}
	console.log('list', listItems);
	console.log('done', listDone);

	return (
		<main className={styles.listWrapper}>
			<form className={styles.inputContainer}  onSubmit={handleAddNewItem}>
				<Input 
					required
					onInvalid={handleInvalidTask}
					onChange={handleNewItemChange} 
					value={newItem}/>
				<Button type='submit' />
			</form>
			<div className={styles.content}>
				<div className={styles.listCounter}>
					<Counter text="Tarefas criadas" allItems={listItems.length} toDo='pending'/>
					<Counter text="Concluídas" count={listDone.length} allItems={listItems.length} toDo='done'/>
				</div>
				{
					listItems.length ?  
						(
							<ul className={styles.list}>
								{listItems.map(item => 
									<Item
										key={item.id}
										id={item.id}
										text={item.text}
										isChecked={item.isChecked}
										onCheckboxChange={doneItem}
										onDeleteItem={deleteItem}
									/>
								)}
							</ul>
						) 
						: (<div className={styles.emptyContainer}>
							<img src={Clipboard} alt="" />
							<div className={styles.emptyText}>
								<strong>
                Você ainda não tem tarefas cadastradas
								</strong>
								<span>
                Crie tarefas e organize seus itens a fazer
								</span>
							</div>
						</div>)
				}
			</div>
		</main>
	);
}
