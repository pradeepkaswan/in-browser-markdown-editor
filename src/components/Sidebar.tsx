import { useDocuments } from '../context/DocumentContext';
import Logo from '../assets/logo.svg';
import IconDocument from '../assets/icon-document.svg';

export const Sidebar: React.FC = () => {
	const { documents, setCurrentDocument, createDocument } = useDocuments();

	return (
		<div className='min-w-[250px] bg-primary-900 px-6 py-7'>
			<img
				src={Logo}
				alt='logo'
				className='mb-6 lg:hidden'
			/>
			<h2 className='uppercase text-sm text-primary-500 font-medium tracking-widest mb-6'>
				My Documents
			</h2>
			<button
				onClick={createDocument}
				className='flex justify-center items-center w-full text-[15px] bg-brand text-white h-10 rounded hover:bg-brand-light mb-6'
			>
				+ New Document
			</button>
			<ul className='flex flex-col gap-6'>
				{documents.map((doc) => (
					<li
						key={doc.name}
						className='cursor-pointer flex justify-center items-center'
						onClick={() => setCurrentDocument(doc)}
					>
						<img
							src={IconDocument}
							alt='document'
							className='mr-4'
						/>
						<div>
							<span className='text-[13px] text-primary-500 font-light'>
								{doc.createdAt}
							</span>
							<p className='text-[15px] text-primary-100'>{doc.name}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
