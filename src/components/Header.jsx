import React from "react";

const Header = ({ resetBoard }) => {
	return (
		<>
			<header className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#2A2F4F] to-[#394867] text-[#F4F1DE] font-serif">
				<h1 className="text-2xl font-bold tracking-wide">2-Do App</h1>
				<button
					onClick={resetBoard}
					className="bg-[#F44336] text-white px-4 py-2 rounded hover:bg-[#D32F2F]"
				>
					Reset Board
				</button>
			</header>
		</>
	);
};

export default Header;
