import "./single.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Chart from "../../components/chart/Chart"
import Table from "../../components/table/Table"
import { db } from "../../firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

const Single = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const list = []
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        });
        setData(list);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://lh3.googleusercontent.com/pw/ADCreHdrP33HKFEyEaITqp-aXVIBxc0Zb8YVxwasYUrU8n2viKZFlslncAxvI4LVh_D-CgZQkUKdnCuc8oKH3q_5smgWSx3Pu33HtUpg8eRun8mQBl3rQE4av8do8ulRWtPuEj7Xdf7S4uccWnIC1yVDEN2v=w683-h911-s-no-gm?authuser=0"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Emre Koyuncu</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <a
                    href="mailto:emrekoyuncujob@gmail.com"
                    style={{ color: 'blue', textDecoration: 'none' }}
                    className="itemValue">emrekoyuncujob@gmail.com
                  </a>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <a href="tel:+905546798980" style={{ color: 'blue', textDecoration: 'none' }} className="itemValue">+90 554 679 8980</a>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">Mugla/Fethiye</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">Turkey</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={4 / 1} title="User Spending (Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <Table />
        </div>
      </div>
    </div>
  )
}

export default Single