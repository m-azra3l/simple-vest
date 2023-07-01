'use client';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {

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
        </div>
        <div></div>
        <Image src='/Frame.png' alt="Landing frame" width={500} height={350} priority={false} />
      </div>
      <br />
      <div className={`${styles.intro}`}>
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
            <p>Create organization account and token to get started on the platform.</p>
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
            <p>Sign in to your account to monitor your stakeholders or your tokens.</p>
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
            <p>Take control of your ICOs, token sales and allocations with Neo-Vest.</p>
          </center>
        </Link>
      </div>
      <br />
      <div id='about' className={styles.about} >
        <center>
          <h3 className={styles.accent}>About</h3>
          <br />
          <p>Neo Vest is the premier blockchain vesting solution for ICOs, token sales, and token allocations. Our platform revolutionizes token distribution with secure and gradual releases, promoting stability and long-term commitment. Seamlessly integrate Neo Vest into your project with user-friendly interface. Trust is paramount, as we prioritize unparalleled security and offer an intuitive dashboard for complete control. Join successful projects in embracing our innovative, user-centric platform. Sign up with Neo Vest today and unlock the potential of your blockchain project.</p>
        </center>
      </div>
    </main>
  )
}
