import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FiEdit2, FiTrash } from "react-icons/fi";
import "../App.css";

const Card = ({ card, listId, index, moveCard, openCardModal, deleteCard, updateCardDetails }) => {
	const [{ isDragging }, dragRef] = useDrag({
		type: "CARD",
		item: { ...card, listId, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	});

	const [, dropRef] = useDrop({
		accept: "CARD",
		hover: (draggedCard) => {
			if (draggedCard.index !== index) {
				moveCard(draggedCard, listId, index);
				draggedCard.index = index;
			}
		}
	});

	const [isHovered, setIsHovered] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [cardTitle, setCardTitle] = useState(card.title);

	const handleSave = () => {
		updateCardDetails(listId, { ...card, title: cardTitle });
		setIsEditing(false);
	};

	const handleCardClick = (e) => {
		if (isEditing) return;
		if (!e.target.closest(".icon")) {
			openCardModal(listId, card);
		}
	};

	return (
		<div className="card-list" data-is-editing={isEditing ? "true" : "false"}>
			<div
				ref={(node) => dragRef(dropRef(node))}
				className={`relative bg-white text-black p-4 rounded-md shadow-md hover:shadow-lg cursor-pointer transition-all ease-in-out duration-300 ${
					isDragging ? "bg-gray-800 text-white opacity-100" : "opacity-100"
				}  ${isEditing ? "glow-effect z-10 bg-blue-100" : ""}`}
				style={{
					opacity: isEditing ? "1" : "inherit"
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={handleCardClick}
			>
				{isEditing ? (
					<div className="flex flex-col items-center space-y-4">
						<input
							type="text"
							value={cardTitle}
							onChange={(e) => setCardTitle(e.target.value)}
							className="w-full p-2 border rounded mb-2"
						/>
						<div className="flex justify-end space-x-2">
							<button
								className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
								onClick={handleSave}
							>
								Save
							</button>
							<button
								className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400"
								onClick={() => setIsEditing(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<div className="flex justify-between">
						<h3>{card.title}</h3>
						{isHovered && (
							<div className="flex space-x-2">
								<FiEdit2
									className="text-gray-600 hover:text-gray-900 cursor-pointer icon"
									onClick={(e) => {
										e.stopPropagation();
										setIsEditing(true);
									}}
								/>
								<FiTrash
									className="text-red-500 hover:text-red-700 cursor-pointer icon"
									onClick={(e) => {
										e.stopPropagation();
										deleteCard(listId, card.id);
									}}
								/>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Card;
