import {useState, useEffect} from 'react'
import Layout from '../../components/layout'
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/router'
import '../../components/fire'

const db = getFirestore()

export default function Delete() {
  const [message, setMessage] = useState('wait.')
  const [data, setData] = useState(null)
  const router = useRouter()
  console.log(router.query.id)

  const fetchData = async () => {
    const documentRef = doc(db, 'mydata', router.query.id);
    const documentSnapshot = await getDoc(documentRef);      
    setMessage('Delete id = ' + router.query.id)
    setData(documentSnapshot.data())
  }

  useEffect(() => {
    console.log(router.query.id)
    if (router.query && router.query.id) {
      fetchData();
    }
  }, [router.query.id])

  const doAction = async (e)=> {
    const documentRef = doc(db, 'mydata', router.query.id);
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