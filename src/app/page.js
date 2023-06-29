'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { toast } from "react-toastify";
import { useState } from 'react';
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { connectContract } from '@/contexts/contractHelpers';
import Link from 'next/link';

export default function Home() {
  const [connected, isConnected] = useState(false);
  const router = useRouter();

  async function handleClick() {
    try {
      const contract = await connectContract();
      if (contract !== null || contract !== undefined) {
        isConnected(true);
        toast.success('Connected!');
      }
    }
    catch (err) {
      toast.error('Error');
      console.error(err);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.intro} style={{ marginTop: '70px', paddingBottom: '0px' }}>
        <div>
          <h2 className={styles.accent}>
            Unleash the Power of Vesting
          </h2>
          <br />
          <p>
            Empower your blockchain projects with Neo-Vest&apos;s seamless and secure token vesting platform, ensuring fair and efficient distribution for ICOs and token sales.
          </p>
          <br />
          <button type="submit" className={`${styles.btn} ${styles.btn_dark}`} onClick={handleClick} hidden={connected == true}>
            <span>Connect</span>
            <UserPlusIcon width={20} />
          </button>
        </div>
        <div></div>
        <Image src='/Frame.png' alt="Landing frame" width={450} height={350} priority={false} />
      </div>
      <br />
      <div className={`${styles.intro}`} hidden={connected == false}>
        <Link
          href={'/account/register'}
          className={styles.card}
          rel="noopener noreferrer"
        >
          <center>
            <h3 className={styles.accent}>
              Register<span>-&gt;</span>
            </h3>
            <br />
            <p>Find in-depth information about Next.js features and API.</p>
          </center>
        </Link>

        <Link
          href={'/account/login'}
          className={styles.card}
          rel="noopener noreferrer"
        >
          <center>
            <h3 className={styles.accent}>
              Login<span>-&gt;</span>
            </h3>
            <br />
            <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
          </center>
        </Link>

        <Link
          href={'/account/login'}
          className={styles.card}
          rel="noopener noreferrer"
        >
          <center>
            <h3 className={styles.accent}>
              Manage<span>-&gt;</span>
            </h3>
            <br />
            <p>Explore the Next.js 13 playground.</p>
          </center>
        </Link>
      </div>
      <br />
      <div id='about' className={styles.about} >
        <center>
          <h3 className={styles.accent}>About</h3>
          <br />
          <p>Neo Vest is the premier blockchain vesting solution for ICOs, token sales, and token allocations. Our platform revolutionizes token distribution with secure and gradual releases, promoting stability and long-term commitment. Seamlessly integrate Neo Vest into your project with developer-friendly APIs. Trust is paramount, as we prioritize unparalleled security and offer an intuitive dashboard for complete control. Join successful projects in embracing our innovative, user-centric platform. Sign up with Neo Vest today and unlock the potential of your blockchain project.</p>
        </center>
      </div>
    </main>
  )
}
