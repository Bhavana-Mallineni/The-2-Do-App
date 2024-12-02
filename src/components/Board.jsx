import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import List from "./List";

const Board = ({
	lists,
	moveList,
	moveCard,
	addCard,
	deleteCard,
	updateCardDetails,
	addList,
	deleteList,
	updateListTitle,
	openCardModal
}) => {
	const [isAddingList, setIsAddingList] = useState(false);
	const [newListTitle, setNewListTitle] = useState("");

	// For dropping lists
	const [, dropRef] = useDrop({
		accept: "list"
	});

	const handleAddList = () => {
		if (newListTitle.trim()) {
			addList(newListTitle.trim());
			setNewListTitle("");
			setIsAddingList(false);
		}
	};

	return (
		<div
			ref={dropRef}
			className="flex gap-4 px-4 py-6 overflow-x-auto w-full bg-gradient-to-r from-[#2A2F4F] to-[#6A89CC] scrollbar-thin scrollbar-thumb-[#48B9B0]/80 scrollbar-track-[#394867]/50 hover:scrollbar-thumb-[#38A699]/90 scrollbar-hide-vertical transition-all ease-in-out duration-300"
			style={{ overflowY: "hidden", overflowX: "scroll", scrollbarGutter: "stable both-edges" }}
		>
			{/* Render lists */}
			{lists.map((list, index) => (
				<List
					key={list.id}
					list={list}
					index={index}
					moveList={moveList}
					moveCard={moveCard}
					addCard={addCard}
					deleteCard={deleteCard}
					updateCardDetails={updateCardDetails}
					deleteList={deleteList}
					updateListTitle={updateListTitle}
					openCardModal={openCardModal}
				/>
			))}

			{/* Add New List Section */}
			<div className="w-64">
				{isAddingList ? (
					<div className="flex-shrink-0 bg-[#394867] text-white rounded-lg p-4">
						<input
							type="text"
							className="w-full p-2 border border-[#48B9B0] rounded mb-2 bg-[#F9F9F9] text-[#2A2F4F]"
							placeholder="Enter list title..."
							value={newListTitle}
							onChange={(e) => setNewListTitle(e.target.value)}
						/>
						<div className="flex justify-between">
							<button
								className="bg-gradient-to-r from-[#48B9B0] to-[#38A699] text-white px-4 py-2 rounded hover:from-[#2A9E8A] hover:to-[#1F8E7A]"
								onClick={handleAddList}
							>
								Add List
							</button>
							<button
								className="text-[#D32F2F] px-4 py-2 rounded hover:text-[#B71C1C]"
								onClick={() => setIsAddingList(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<button
						className="bg-gradient-to-r from-[#48B9B0] to-[#38A699] text-white px-4 py-2 rounded shadow hover:from-[#2A9E8A] hover:to-[#1F8E7A]"
						onClick={() => setIsAddingList(true)}
					>
						+ Add another list
					</button>
				)}
			</div>
		</div>
	);
};

export default Board;
