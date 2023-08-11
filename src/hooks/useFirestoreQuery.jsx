import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../Config';

const useFirestoreQuery = (path) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, path));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        setData(documents);
        setIsLoading(false);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [path]);

  return { data, isLoading };
};

export default useFirestoreQuery;
