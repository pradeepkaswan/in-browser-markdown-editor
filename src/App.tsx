import { useState } from 'react';
import { Editor } from './components/Editor';
import { Header } from './components/Header';
import { Preview } from './components/Preview';
import { Sidebar } from './components/Sidebar';
import { DocumentProvider } from './context/DocumentContext';

export default function App() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<DocumentProvider>
			<div className='flex h-screen bg-white'>
				{isSidebarOpen && <Sidebar />}
				<div className='flex flex-col flex-1'>
					<Header
						toggleSidebar={toggleSidebar}
						isSidebarOpen={isSidebarOpen}
					/>
					<div className='flex flex-1 flex-col md:flex-row'>
						<Editor />
						<Preview />
					</div>
				</div>
			</div>
		</DocumentProvider>
	);
}
