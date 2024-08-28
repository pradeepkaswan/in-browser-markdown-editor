import { createContext, useContext, useEffect, useState } from 'react';

interface Document {
	createdAt: string;
	name: string;
	content: string;
}

interface DocumentContextType {
	documents: Document[];
	currentDocument: Document | null;
	setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
	setCurrentDocument: React.Dispatch<React.SetStateAction<Document | null>>;
	createDocument: () => void;
	updateDocument: (updateDoc: Document) => void;
	deleteDocument: (docName: string) => void;
}

interface DocumentProviderProps {
	children: React.ReactNode;
}

const DocumentContext = createContext<DocumentContextType | undefined>(
	undefined,
);

export const useDocuments = () => {
	const context = useContext(DocumentContext);
	if (!context) {
		throw new Error('useDocuments must be used within a DocumentProvider');
	}
	return context;
};

export const DocumentProvider: React.FC<DocumentProviderProps> = ({
	children,
}) => {
	const [documents, setDocuments] = useState<Document[]>(() => {
		const storedDocuments = localStorage.getItem('documents');
		return storedDocuments ? JSON.parse(storedDocuments) : [];
	});
	const [currentDocument, setCurrentDocument] = useState<Document | null>(null);

	useEffect(() => {
		localStorage.setItem('documents', JSON.stringify(documents));
	}, [documents]);

	const createDocument = () => {
		const newDoc: Document = {
			createdAt: new Date().toLocaleDateString('en-GB'),
			name: 'untitled-document.md',
			content: '',
		};
		setDocuments([...documents, newDoc]);
		setCurrentDocument(newDoc);
	};

	const updateDocument = (updatedDoc: Document) => {
		setDocuments((docs) =>
			docs.map((doc) => (doc.name === updatedDoc.name ? updatedDoc : doc)),
		);
		setCurrentDocument(updatedDoc);
	};

	const deleteDocument = (docName: string) => {
		setDocuments((docs) => docs.filter((doc) => doc.name !== docName));
		if (currentDocument && currentDocument.name === docName) {
			setCurrentDocument(documents[0] || null);
		}
	};

	return (
		<DocumentContext.Provider
			value={{
				documents,
				currentDocument,
				setDocuments,
				setCurrentDocument,
				createDocument,
				updateDocument,
				deleteDocument,
			}}
		>
			{children}
		</DocumentContext.Provider>
	);
};
