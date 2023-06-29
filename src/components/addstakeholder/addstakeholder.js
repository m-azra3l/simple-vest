'use client';
import styles from './addstakeholder.module.css';
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { addStakeholder } from '@/contexts/contractHelpers';

export default function AddStakeholder({ orgId }) {
  const [orgData, setOrgData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const orgData = await getOrg(orgId);
        setOrgData(orgData);
      }
      catch (err) {
        console.error(err);
      }
    })();
  },[orgId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = e.target[0].value;
    const address = e.target[1].value;
    const email = e.target[2].value;
    const role = e.target[3].value;
    const endTime = e.target[4].value;
    // const dateObj = new Date(e.target[4].value);
    // const endTime = dateObj.getTime();
    try{
      const add = await addStakeholder(
        address,
        role,
        token,
        endTime,
        address, 
        email,     
        orgId
        );
      if(add){
        toast.success('Success');       
        e.target.reset();
      }
      else{
        toast.error('Error');
      }
    }
    catch (err) {
      console.error(err);
      toast.error('Error');
    }
  };

  return (
    <>
      <div className={styles.form_wrapper}>
        <center>
          <h3 className={styles.accent}>Add Stakeholder</h3>
        </center>
        <div className={styles.progress_text}>
          <small>{orgData.name}</small>
          <small>{orgData.symbol}</small>
        </div>
        <form onSubmit={handleSubmit} className={styles.grid_xs}>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            placeholder="Token Amount"
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Wallet Address"
            required
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Role"
            required
            className={styles.input}
          />
          <small>Vesting End Date</small>
          <input
            type="number"
            placeholder="Duration"
            required
            className={styles.input}
          />
          {/* <input
            type="date"
            placeholder="Duration"
            required
            className={styles.input}
          /> */}
          <div className={styles.flex_sm}>
            <button className={`${styles.button} ${styles.btn} ${styles.btn_dark}`}>Add <UserPlusIcon width={20} /></button>
            {/* {error && error} */}
          </div>
        </form>
      </div>
    </>
  );
};