'use client';

import Claim from "@/components/claim/claim";
import styles from './page.module.css';
import { useState } from 'react';

export default function Stakeholder() {

    return (
        <div style={{ minHeight: 'calc(100vh - 50px)', paddingBottom: '0px' }}>
            <center>
                <div className={styles.main}>
                    <h2>
                        Welcome, <span className={styles.accent}>User</span>
                    </h2>
                </div>
            </center>
            <center>
                <Claim />
            </center>
        </div>
    );
};