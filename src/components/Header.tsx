import { useState } from 'react';
import { useDocuments } from '../context/DocumentContext';
import IconDelete from '../assets/icon-delete.svg';
import IconSave from '../assets/icon-save.svg';
import IconDocument from '../assets/icon-document.svg';
import IconMenu from '../assets/icon-menu.svg';
import IconClose from '../assets/icon-close.svg';
import Logo from '../assets/logo.svg';

interface HeaderProps {
	toggleSidebar: () => void;
	isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
	toggleSidebar,
	isSidebarOpen,
}) => {
	const { currentDocument, updateDocument, deleteDocument } = useDocuments();
	const [isEditing, setIsEditing] = useState(false);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (currentDocument) {
			updateDocument({
				...currentDocument,
				name: e.target.value,
			});
		}
	};

	const handleDelete = () => {
		if (currentDocument) {
			if (window.confirm('Are you sure you want to delete this document?')) {
				deleteDocument(currentDocument.name);
			}
		}
	};

	return (
		<header className='bg-primary-800 flex h-14 md:h-[72px] items-center'>
			<button
				onClick={toggleSidebar}
				className='h-14 w-14 md:h-[72px] md:w-[72px] bg-primary-700 flex justify-center items-center mr-6'
			>
				{isSidebarOpen ? (
					<img
						src={IconClose}
						alt='close'
						className='w-4 h-4 md:h-6 md:w-6'
					/>
				) : (
					<img
						src={IconMenu}
						alt='hamburger'
						className='w-6 md:w-[30px]'
					/>
				)}
			</button>
			{currentDocument ? (
				<div className='flex-1 flex items-center'>
					<div className='flex justify-center items-center gap-4 mr-4'>
						<img
							src={Logo}
							alt='logo'
							className='hidden lg:block mr-6'
						/>
						<div className='h-10 w-px bg-primary-600'></div>
						<div></div>
						<img
							src={IconDocument}
							alt=''
						/>
						<div>
							<p className='hidden md:block text-[13px] font-light text-primary-500'>
								Document Name
							</p>
							{isEditing ? (
								<input
									value={currentDocument.name}
									onChange={handleNameChange}
									onBlur={() => setIsEditing(false)}
									autoFocus
									className='bg-transparent border-b border-brand'
								/>
							) : (
								<h1
									onClick={() => setIsEditing(true)}
									className='cursor-pointer text-[15px] text-primary-100'
								>
									{currentDocument.name}
								</h1>
							)}
						</div>
					</div>
					<button
						onClick={handleDelete}
						className='ml-auto mr-6'
					>
						<img
							src={IconDelete}
							alt='delete'
							className='w-[18px]'
						/>
					</button>
					<button className='flex justify-center items-center bg-brand hover:bg-brand-light rounded h-10 px-4 mr-2 md:mr-4'>
						<img
							src={IconSave}
							alt='save'
							className='h-4 w-4 md:mr-2'
						/>
						<span className='hidden text-[15px] text-primary-100 md:block'>
							Save Changes
						</span>
					</button>
				</div>
			) : (
				<h1>No document selected</h1>
			)}
		</header>
	);
};
