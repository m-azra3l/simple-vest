"use client";

import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../darkmodetoggle/darkmodetoggle";
import Image from "next/image";
import { LockClosedIcon } from "@heroicons/react/24/solid";

const links = [
  {
    id: 1,
    title: "About",
    url: "/#about",
  },
];

const Navbar = () => {

  return (
    <div className={styles.fixed_container}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image src="/Logo.png" width={35} height={35} className={styles.icon} alt="Home" />
          Neo-Vest
        </Link>
        <div className={styles.links}>
          <DarkModeToggle />
          {links.map((link) => (
            <Link key={link.id} href={link.url} className={styles.link}>
              {link.title}
            </Link>
          ))}
          {/* {session.status === "authenticated" && (
          <button className={`${styles.logout} ${styles.btn} ${styles.btn_dark}`} onClick={signOut}>
            Logout <LockClosedIcon width={20}/>
          </button>
        )} */}
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default Navbar;
