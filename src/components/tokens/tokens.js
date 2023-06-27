'use client';

import styles from './tokens.module.css';
import Claim from "@/components/claim/claim";
import { Popover } from "@nextui-org/react";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

export default function Tokens() {
    return (
        <div className={styles.grid}>
            <div className={styles.token}>
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
                    <Popover>
                        <Popover.Trigger>
                            <button type='submit' className={`${styles.button} ${styles.btn} ${styles.btn_dark}`}>Claim <CurrencyDollarIcon width={20} /></button>
                        </Popover.Trigger>
                        <Popover.Content>
                            <Claim />
                        </Popover.Content>
                    </Popover>
                </div>
            </div>
            <div className={styles.token}>
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
                    <Popover>
                        <Popover.Trigger>
                            <button type='submit' className={`${styles.button} ${styles.btn} ${styles.btn_dark}`}>Claim <CurrencyDollarIcon width={20} /></button>
                        </Popover.Trigger>
                        <Popover.Content>
                            <Claim />
                        </Popover.Content>
                    </Popover>
                </div>
            </div>
            <div className={styles.token}>
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
                    <Popover>
                        <Popover.Trigger>
                            <button type='submit' className={`${styles.button} ${styles.btn} ${styles.btn_dark}`}>Claim <CurrencyDollarIcon width={20} /></button>
                        </Popover.Trigger>
                        <Popover.Content>
                            <Claim />
                        </Popover.Content>
                    </Popover>
                </div>
            </div>
        </div>
    );
}