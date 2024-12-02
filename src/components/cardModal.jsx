import React, { useState, useEffect } from "react";

const CardModal = ({ card, closeModal, updateCardDetails }) => {
	const [title, setTitle] = useState(card.title);
	const [description, setDescription] = useState(card.description || "");
	const [dueDate, setDueDate] = useState(card.dueDate || "");

	useEffect(() => {
		setTitle(card.title);
		setDescription(card.description || "");
		setDueDate(card.dueDate || "");
	}, [card]);

	const handleSave = () => {
		if (!title.trim()) {
			alert("Title cannot be empty!");
			return;
		}

		updateCardDetails(card.listId, {
			...card,
			title: title.trim(),
			description: description.trim(),
			dueDate: dueDate || ""
		});
		closeModal();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<div className="bg-[#2A2F4F] text-white p-6 rounded-lg shadow-xl w-[500px]">
				<h2 className="text-2xl font-semibold mb-4 text-[#48B9B0]">Edit Card</h2>
				<div className="mb-4">
					<label className="block text-sm font-medium text-[#A7B5C7]">Title</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full p-2 border border-[#48B9B0] rounded bg-[#F1F7F9] text-[#2A2F4F] focus:outline-none focus:ring-2 focus:ring-[#48B9B0]"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-[#A7B5C7]">Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full p-2 border border-[#48B9B0] rounded bg-[#F1F7F9] text-[#2A2F4F] focus:outline-none focus:ring-2 focus:ring-[#48B9B0]"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-[#A7B5C7]">Due Date</label>
					<input
						type="date"
						value={dueDate}
						onChange={(e) => setDueDate(e.target.value)}
						className="w-full p-2 border border-[#48B9B0] rounded bg-[#F1F7F9] text-[#2A2F4F] focus:outline-none focus:ring-2 focus:ring-[#48B9B0]"
					/>
				</div>
				<div className="flex justify-between">
					<button
						onClick={handleSave}
						className="bg-gradient-to-r from-[#48B9B0] to-[#38A699] text-white px-4 py-2 rounded-lg hover:bg-gradient-to-l hover:from-[#38A699] hover:to-[#48B9B0]"
					>
						Save
					</button>
					<button
						onClick={closeModal}
						className="bg-gradient-to-r from-[#E74C3C] to-[#C0392B] text-white px-4 py-2 rounded-lg hover:bg-gradient-to-l hover:from-[#C0392B] hover:to-[#E74C3C]"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default CardModal;
