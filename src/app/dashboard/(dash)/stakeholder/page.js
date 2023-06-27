'use client';

import Tokens from "@/components/tokens/tokens";
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
                <Tokens />
            </center>
        </div>
    );
};