import "./widget.scss"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase"

const Widget = ({ type }) => {
    const [amount, setAmount] = useState(null)
    const [diff, setDiff] = useState(null)
    let data;

    useEffect(() => {
        const fetchData = async () => {
            const today = new Date();
            const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
            const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

            const lastMonthQuery = query(collection(db, data.query), where("timeStamp", "<=", today), where("timeStamp", ">", lastMonth));
            const prevMonthQuery = query(collection(db, data.query), where("timeStamp", "<=", lastMonth), where("timeStamp", ">", prevMonth));

            const lastMonthData = await getDocs(lastMonthQuery)
            const prevMonthData = await getDocs(prevMonthQuery)

            const prevDocsLength = prevMonthData.docs.length;
            const lastDocsLength = lastMonthData.docs.length;

            setAmount(lastDocsLength)
            setDiff(prevDocsLength === 0 ? 0 : ((lastDocsLength - prevDocsLength) / prevDocsLength) * 100);

        }
        fetchData()
    }, [])

    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                link: "See all users",
                query: "users",
                icon: (<PermIdentityOutlinedIcon
                    className="icon"
                    style={{
                        color: "crimson ",
                        backgroundColor: "rgba(255, 0, 0, 0.2)",
                    }} />)
            };
            break;
        case "order":
            data = {
                title: "ORDERS",
                isMoney: false,
                link: "View all orders",
                icon: (<ShoppingCartOutlinedIcon
                    className="icon"
                    style={{
                        color: "goldenrod ",
                        backgroundColor: "rgba(218, 165, 32, 0.2)",
                    }} />)
            };
            break;
        case "earning":
            data = {
                title: "EARNINGS",
                isMoney: true,
                link: "View net earnings",
                icon: (<MonetizationOnOutlinedIcon
                    className="icon"
                    style={{
                        color: "green ",
                        backgroundColor: "rgba(0, 128, 0, 0.2)",
                    }} />)
            };
            break;
        case "products":
            data = {
                title: "PRODUCTS",
                query: "products",
                link: "See details",
                icon: (<AccountBalanceWalletOutlinedIcon
                    className="icon"
                    style={{
                        color: "purple ",
                        backgroundColor: "rgba(128, 0, 128, 0.2)",
                    }} />)
            };
            break;
        default:
            break;
    }
    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.isMoney && "$"}{amount}
                </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
                    {diff < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    {diff} %
                </div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget