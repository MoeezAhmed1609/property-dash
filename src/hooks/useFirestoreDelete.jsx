import { useEffect, useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../Config';

const useFirestoreDelete = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [collectionPath, setCollectionPath] = useState('');
  const [documentId, setDocumentId] = useState('');

  const deleteDocument = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteDoc(doc(db, collectionPath, documentId));
      setIsDeleted(true);
    } catch (error) {
      setError(error);
    }

    setIsDeleting(false);
  };

  useEffect(() => {
    if (collectionPath && documentId) {
      deleteDocument();
    }
  }, [collectionPath, documentId]);

  return { isDeleting, error, isDeleted, setCollectionPath, setDocumentId };
};

export default useFirestoreDelete;
