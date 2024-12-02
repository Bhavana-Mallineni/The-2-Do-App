import React, { useState } from "react";
import { DndProvider } from "react-dnd"; //The context provider for drag-and-drop functionality
import { HTML5Backend } from "react-dnd-html5-backend"; //The backend responsible for handling drag-and-drop interactions in a browser
import Header from "./components/Header";
import Board from "./components/Board";
import "./App.css";
import Footer from "./components/Footer";
import CardModal from "./components/cardModal";
import { useLocalStorage } from "./components/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

function App() {
	const defaultLists = [
		{
			id: uuidv4(),
			title: "To Do",
			cards: [
				{
					id: uuidv4(),
					title: "Kickoff meeting",
					description: "Discuss Project",
					dueDate: "2024-12-03"
				},
				{
					id: uuidv4(),
					title: "Wireframe design",
					description: "Create basic wireframes",
					dueDate: ""
				}
			]
		},
		{
			id: uuidv4(),
			title: "In Progress",
			cards: [
				{
					id: uuidv4(),
					title: "UI Prototyping",
					description: "Work on Tailwind CSS",
					dueDate: "2024-12-05"
				}
			]
		},
		{
			id: uuidv4(),
			title: "Done",
			cards: [
				{
					id: uuidv4(),
					title: "Project Setup",
					description: "Initialize React project",
					dueDate: "2024-12-01"
				}
			]
		}
	];

	const [lists, setLists] = useLocalStorage("taskBoard", defaultLists);
	const [currentCard, setCurrentCard] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openCardModal = (listId, card) => {
		setCurrentCard({ ...card, listId });
		setIsModalOpen(true);
	};

	const closeModal = () => setIsModalOpen(false);

	const updateCardDetails = (listId, updatedCard) => {
		setLists((prevLists) =>
			prevLists.map((list) =>
				list.id === listId
					? {
							...list,
							cards: list.cards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
					  }
					: list
			)
		);
		closeModal();
	};

	const moveCard = (draggedCard, targetListId, targetIndex) => {
		const updatedLists = [...lists];
		const sourceList = updatedLists.find((list) => list.id === draggedCard.listId);
		const targetList = updatedLists.find((list) => list.id === targetListId);

		if (sourceList && targetList) {
			sourceList.cards = sourceList.cards.filter((card) => card.id !== draggedCard.id);
			targetList.cards.splice(targetIndex, 0, { ...draggedCard, listId: targetListId });
		}
		setLists(updatedLists);
	};

	const moveList = (draggedListIndex, targetListIndex) => {
		const reorderedLists = [...lists];
		const [movedList] = reorderedLists.splice(draggedListIndex, 1);
		reorderedLists.splice(targetListIndex, 0, movedList);
		setLists(reorderedLists);
	};

	const addCard = (listId, cardTitle) => {
		if (!cardTitle) return;
		const newCard = { id: uuidv4(), title: cardTitle, description: "", dueDate: "" };
		const newLists = lists.map((list) =>
			list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list
		);
		setLists(newLists);
	};

	const addList = (title) => {
		if (title.trim()) {
			const newList = { id: uuidv4(), title, cards: [] };
			setLists([...lists, newList]);
		}
	};

	const deleteCard = (listId, cardId) => {
		const updatedLists = lists.map((list) =>
			list.id === listId
				? { ...list, cards: list.cards.filter((card) => card.id !== cardId) }
				: list
		);
		setLists(updatedLists);
	};

	const deleteList = (listId) => {
		const updatedLists = lists.filter((list) => list.id !== listId);
		setLists(updatedLists);
	};

	const updateListTitle = (listId, newTitle) => {
		const updatedLists = lists.map((list) =>
			list.id === listId ? { ...list, title: newTitle } : list
		);
		setLists(updatedLists);
	};

	const handleReset = () => {
		setLists(defaultLists);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="min-h-screen bg-gradient-to-r from-[#2A2F4F] to-[#6A89CC] text-[#F4F1DE]">
				<Header resetBoard={handleReset} />
				<Board
					lists={lists}
					moveCard={moveCard}
					moveList={moveList}
					openCardModal={openCardModal}
					addCard={addCard}
					addList={addList}
					deleteCard={deleteCard}
					deleteList={deleteList}
					updateCardDetails={updateCardDetails}
					updateListTitle={updateListTitle}
				/>
				{isModalOpen && (
					<CardModal
						card={currentCard}
						closeModal={closeModal}
						updateCardDetails={updateCardDetails}
					/>
				)}
			</div>

			<Footer />
		</DndProvider>
	);
}

export default App;
