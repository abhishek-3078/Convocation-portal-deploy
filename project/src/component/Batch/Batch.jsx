import React from 'react'
import {useNavigate} from "react-router-dom";
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';
import Layout from '../Layout/Layout';
import styles from "./Batch.module.css"

const Batch = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className={styles.container}>
        <button className={styles.button} onClick={()=> navigate("/dashboard/main/2022" , {state : {batch : 22}})}>Batch 2022</button>
        <button className={styles.button} onClick={()=> navigate("/dashboard/main/2023" , {state : {batch : 23}})}>Batch 2023</button>
        <button className={styles.button} onClick={()=> navigate("/dashboard/main/2024" , {state : {batch : 24}})}>Batch 2024</button>
      </div>
    </Layout>
  )
}

export default Batch