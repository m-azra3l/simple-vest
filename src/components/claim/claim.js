'use client';
import { BanknotesIcon } from "@heroicons/react/24/solid";
import styles from './claim.module.css';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { formatPercentage, claimToken, getUser, getUserOrg } from "@/contexts/contractHelpers";

export default function Claim({ userId }) {
  const [user, setUser] = useState([]);
  const [userOrg, setUserOrg] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser(userId);
        const userOrg = await getUserOrg(user.orgId);
        setUser(user);
        setUserOrg(userOrg);
      }
      catch (err) {
        console.error(err);
      }
    })();
  }, [userId]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = e.target[0].value;
      if(user.tokenAmount > 0 && user.claimedtoken < user.totalToken) {
        const claim = await claimToken(token, userId);
        if(claim) {
          toast.success('Success');
        }
        else {
          toast.error('Error claiming');
        }
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
          <h3 className={styles.accent}>Token</h3>
        </center>
        <div className={styles.progress_text}>
          <h3>Token Name: {userOrg.symbol}</h3>
          <p>Token Name: {userOrg.name}</p>
        </div>
        <center>
          <p className={styles.accent}>Role: {user.role}</p>
        </center>
        <div className={styles.progress_text}>
          <small>Vest Start: {user.startDate}</small>
          <small>Vest Start: {user.endDate}</small>
        </div>
        <progress max={user.totalToken} value={user.claimedtoken}>
          {formatPercentage(user.claimedToken / user.totalToken)}
        </progress>
        <div className={styles.progress_text}>
          <small>Claimed Amount: {user.claimedtoken}</small>
          <small>Total Amount: {user.totalToken}</small>
        </div>
        <form onSubmit={handleSubmit} className={styles.grid_xs}>
          <center hidden={user.claimToken > 0}>
            <p>
              Vested Amount: {user.tokenAmount}
            </p>
          </center>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            placeholder="Token Amount"
            required
            className={styles.input}
          />
          <div className={styles.flex_sm}>
            <button className={
              `${styles.button}
              ${styles.btn}
              ${styles.btn_dark}`}
              hidden={user.whitelisted === false || user.tokenAmount === 0}
            >
              Claim <BanknotesIcon width={20} />
            </button>
            <h3 hidden={user.whitelisted === true}>Not Whitelisted</h3>
            <h3 hidden={user.tokenAmount === 0}>All Tokens Claimed</h3>
          </div>
        </form>
      </div>
    </>
  );
};