import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Card from "./Card";
import { FiTrash } from "react-icons/fi";

const List = ({
	list,
	index,
	moveList,
	moveCard,
	addCard,
	deleteCard,
	updateCardDetails,
	deleteList,
	updateListTitle,
	openCardModal
}) => {
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [title, setTitle] = useState(list.title);
	const [showForm, setShowForm] = useState(false);
	const [newCardTitle, setNewCardTitle] = useState("");

	const [{ isDragging }, dragRef] = useDrag({
		type: "LIST",
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	});

	const [{ isOver }, dropRef] = useDrop({
		accept: "LIST",
		hover: (draggedList) => {
			if (draggedList.index !== index) {
				moveList(draggedList.index, index);
				draggedList.index = index;
			}
		}
	});

	const [, cardDropRef] = useDrop({
		accept: "CARD",
		hover: (draggedCard) => {
			if (draggedCard.listId !== list.id) {
				moveCard(draggedCard, list.id, list.cards.length);
				draggedCard.listId = list.id;
			} else if (draggedCard.index !== index) {
				moveCard(draggedCard, list.id, index); // Move card within the same list
				draggedCard.index = index; // Update the index of the dragged card
			}
		}
	});

	const handleUpdateTitle = () => {
		if (title.trim()) {
			updateListTitle(list.id, title.trim());
			setIsEditingTitle(false);
		}
	};

	const handleAddCard = () => {
		if (newCardTitle.trim()) {
			addCard(list.id, newCardTitle);
			setNewCardTitle("");
			setShowForm(false);
		}
	};

	return (
		<div
			ref={(node) => dragRef(dropRef(node))}
			className={`min-w-[300px] flex-shrink-0 p-4 rounded-lg shadow-lg bg-[#394867] text-white transition-all ease-in-out duration-300  ${
				isDragging ? "opacity-60" : "opacity-100"
			}`}
		>
			{isEditingTitle ? (
				<div className="flex flex-col">
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full bg-white text-black p-2 rounded mb-2"
					/>
					<button
						onClick={handleUpdateTitle}
						className="self-start bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
					>
						Update Title
					</button>
				</div>
			) : (
				<div className="flex justify-between items-center mb-2">
					<h3
						onClick={() => setIsEditingTitle(true)}
						className="text-xl font-bold text-[#F4F1DE] cursor-pointer"
					>
						{list.title}
					</h3>
					<FiTrash
						onClick={() => deleteList(list.id)}
						className="text-[#ECEFF4] hover:text-[#FFFFFF] cursor-pointer"
					/>
				</div>
			)}

			<div
				ref={cardDropRef}
				className="mt-4 space-y-2 max-h-[400px] overflow-y-auto bg-[#EDF2F4] rounded p-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300"
			>
				{list.cards.map((card, cardIndex) => (
					<Card
						key={card.id}
						card={card}
						listId={list.id}
						index={cardIndex}
						openCardModal={openCardModal}
						deleteCard={deleteCard}
						updateCardDetails={updateCardDetails}
						moveCard={moveCard}
					/>
				))}
			</div>

			<div className="mt-2">
				{showForm ? (
					<>
						<input
							type="text"
							value={newCardTitle}
							onChange={(e) => setNewCardTitle(e.target.value)}
							placeholder="New Card Title"
							className="w-full p-2 rounded border mb-2 text-black"
						/>
						<div className="flex justify-between mt-2">
							<button
								onClick={handleAddCard}
								className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
							>
								Add
							</button>
							<button
								onClick={() => setShowForm(false)}
								className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
							>
								Cancel
							</button>
						</div>
					</>
				) : (
					<button
						onClick={() => setShowForm(true)}
						className="bg-gradient-to-r from-[#48B9B0] to-[#38A699] text-white px-4 py-2 rounded hover:from-[#2A9E8A] hover:to-[#1F8E7A]"
					>
						+ Add a card
					</button>
				)}
			</div>
		</div>
	);
};

export default List;
