import {useState, useEffect} from 'react'
import Layout from '../../components/layout'
import { getFirestore, collection, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/router'
import '../../components/fire'

const db = getFirestore()

export default function Delete(props) {
  const [message, setMessage] = useState('wait.')
  const [data, setData] = useState(null)
  const router = useRouter()
  
  useEffect(() => {
    const fetchDocument = async () => {
      if (router.query.id != undefined) {
        const documentRef = doc(db, 'mydata', '1');
        const documentSnapshot = await getDoc(documentRef);
        const doc = documentSnapshot.data()
        setMessage('Delete id = ' + router.query.id)
        setData(doc)
      } else {
        setMessage(message + '.')
      }
    };
  }, [message])

  const doAction = async (e)=> {
    const myDataCollection = collection(db, 'mydata');
    const documentRef = doc(myDataCollection, 'mydata', router.query.id);
    await deleteDoc(documentRef);
    router.push('/fire')
  }

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
      <div className="alert alert-primary text-center">
        <h5 className="mb-4">{message}</h5>
        <pre className="card p-3 m-3 h5 text-left">
          Name: {data != null ? data.name : '...'}<br/>
          Mail: {data != null ? data.mail : '...'}<br/>
          Age: {data != null ? data.age : '...'}
        </pre>
        <button onClick={doAction} className="btn btn-primary">
          Delete
        </button>
      </div>
      </Layout>
    </div>
  )
}