'use client';
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { KeyIcon } from "@heroicons/react/24/solid";

const Login = ({ url }) => {
    const router = useRouter();
    const params = useSearchParams();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
  
    useEffect(() => {
      setError(params.get("error"));
      setSuccess(params.get("success"));
    }, [params]);
  
    if (session.status === "loading") {
      return <p>Loading...</p>;
    }
  
    // if (session.status === "authenticated") {
    //   router?.push("/");
    // }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const address = e.target[0].value;
      const password = e.target[1].value;
    };
  
    return (
        <div className={styles.main}>
          <div className={styles.form_wrapper}>
            <center>
              <h3 className={styles.accent}>{success ? success : "Welcome Back"}</h3>
            </center>
            <form onSubmit={handleSubmit} className={styles.grid_xs}>
              <input
                type="text"
                placeholder="Wallet Address"
                required
                className={styles.input}
              />
              <button className={`${styles.button} ${styles.btn} ${styles.btn_dark}`}>Login <KeyIcon width={20} /></button>
              {error && error}
            </form>
            <div className={styles.container}>
              - or -
              <Link href="/account/register">
                Create new account (Organizations only!!!)
              </Link>
            </div>
          </div>
        </div>
      );
  };
  
  export default Login;