'use client';

import AddStakeholder from "@/components/addstakeholder/addstakeholder";
import Stakeholders from "@/components/stakeholders/stakeholders";
import { useState } from 'react';
import styles from './page.module.css'

export default function Organization() {

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '0px' }}>
            <div className={styles.main}>
                <center>
                    <h2>
                        Welcome, <span className={styles.accent}>User</span>
                    </h2>
                    <br/>  
                </center>
                <center><AddStakeholder /></center>
            </div>
            <div >
                <center><Stakeholders /></center>
            </div>
        </div>
    );
};