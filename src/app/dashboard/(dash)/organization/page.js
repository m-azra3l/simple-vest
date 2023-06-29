'use client';

import AddStakeholder from "@/components/addstakeholder/addstakeholder";
import Stakeholders from "@/components/stakeholders/stakeholders";
import styles from './page.module.css';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { shortenAddress, getId, verifyOrg } from "@/contexts/contractHelpers";

export default function Organization() {
    const router = useRouter();
    const address = router.query;
    const [orgId, setOrgId] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const orgId = await getId(address);
                const org = await verifyOrg(orgId, address);
                if (!org) {
                    toast.error('Wrong address');
                    router.push('/account/login');
                }
                setOrgId(orgId);
            }
            catch (err) {
                console.error(err);
            }
        })();
    }, [address, router]);

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '0px' }}>
            <div className={styles.main}>
                <center>
                    <h2>
                        Welcome,
                        <span className={styles.accent}>
                            {shortenAddress(address)}
                        </span>
                    </h2>
                    <br />
                </center>
                <center><AddStakeholder orgId={orgId} /></center>
            </div>
            <div >
                <center>
                    <h3>
                        Stakeholders
                    </h3>
                    <br />
                    <Stakeholders orgId={orgId} />
                </center>
            </div>
        </div>
    );
};