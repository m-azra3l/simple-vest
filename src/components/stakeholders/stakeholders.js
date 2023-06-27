import styles from './stakeholders.module.css';
import { BanknotesIcon } from "@heroicons/react/24/solid";

export default function Stakeholders() {
    return (
        <div className={styles.grid}>
            <div className={styles.stakeholder}>
                <div className={styles.progress_text}>
                    <h3>Name</h3>
                    <p>Amount</p>
                </div>                  
                <div className={styles.progress_text}>
                    <small>Hello</small>
                    <small>Hello</small>
                </div>
                <progress max={100} value={100}></progress>
                <div className={styles.progress_text}>
                    <small>Hello</small>
                    <small>Hello</small>
                </div>
                <div className={styles.flex_sm}>
                    <button type='submit' className={`${styles.button} ${styles.btn} ${styles.btn_dark}`}>Whitelist <BanknotesIcon width={20} /></button>
                </div>
            </div>
            <div className={styles.stakeholder}>
                <div className={styles.progress_text}>
                    <h3>Name</h3>
                    <p>Amount</p>
                </div>                  
                <div className={styles.progress_text}>
                    <small>Hello</small>
                    <small>Hello</small>
                </div>
                <progress max={100} value={100}></progress>
                <div className={styles.progress_text}>
                    <small>Hello</small>
                    <small>Hello</small>
                </div>
                <div className={styles.flex_sm}>
                    <button type='submit' className={`${styles.button} ${styles.btn} ${styles.btn_dark}`}>Whitelist <BanknotesIcon width={20} /></button>
                </div>
            </div>
            <div className={styles.stakeholder}>
                <div className={styles.progress_text}>
                    <h3>Name</h3>
                    <p>Amount</p>
                </div>                  
                <div className={styles.progress_text}>
                    <small>Hello</small>
                    <small>Hello</small>
                </div>
                <progress max={100} value={100}></progress>
                <div className={styles.progress_text}>
                    <small>Hello</small>
                    <small>Hello</small>
                </div>
                <div className={styles.flex_sm}>
                    <button type='submit' className={`${styles.button} ${styles.btn} ${styles.btn_dark}`}>Whitelist <BanknotesIcon width={20} /></button>
                </div>
            </div>
        </div>
    );
};
