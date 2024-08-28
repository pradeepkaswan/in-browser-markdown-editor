import { useDocuments } from '../context/DocumentContext';
import ReactMarkdown from 'react-markdown';

export const Preview: React.FC = () => {
	const { currentDocument } = useDocuments();

	return (
		<div className='flex-1 p-4'>
			<ReactMarkdown>{currentDocument?.content || ''}</ReactMarkdown>
		</div>
	);
};
