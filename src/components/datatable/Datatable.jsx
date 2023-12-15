import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";

const Datatable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // const fetchData = async () => {
        //     let list = []
        //     try {
        //         const querySnapshot = await getDocs(collection(db, "users"));
        //         querySnapshot.forEach((doc) => {
        //             list.push({ id: doc.id, ...doc.data() })
        //         });
        //         setData(list);
        //         clg
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        // fetchData()

        //LISTEN (REALTIME)
        const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
            let list = [];
            snapshot.docs.forEach(doc => {
                list.push({ id: doc.id, ...doc.data() })
            });
            setData(list)
        }, (error) => {
            console.log(error)
        });
        return () => {
            unsub();
        };
    }, [])

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.log(error)
        }
    }

    const actionColumn = [
        {
            field: "action", headerName: "Action", width: 200, renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div>
                    </div>
                )
            }
        }
    ]
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New User
                <Link to="/users/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={userColumns.concat(actionColumn)}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 9 },
                    },
                }}
                pageSizeOptions={[9, 18, 32]}
                checkboxSelection
            />
        </div>
    )
}

export default Datatable