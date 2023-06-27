import { BanknotesIcon } from "@heroicons/react/24/solid";
import styles from './claim.module.css';

export default function Claim(){
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = e.target[0].value;
        const address = e.target[1].value;
        const role = e.target[2].value;
      };
    
      return (
        <>
          <div className={styles.form_wrapper}>
            <center>
              <h3 className={styles.accent}>Claim Token</h3>
            </center>
            <form onSubmit={handleSubmit} className={styles.grid_xs}>
              <input
                type="number"
                step="0.01"
                inputMode="decimal"
                placeholder="Token Amount"
                required
                className={styles.input}
              />
              <div className={styles.flex_sm}>
                <button className={`${styles.button} ${styles.btn} ${styles.btn_dark}`}>Claim <BanknotesIcon  width={20} /></button>
                {/* {error && error} */}
              </div>
            </form>
          </div>
        </>
      );
};