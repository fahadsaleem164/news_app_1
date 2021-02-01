import { useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css';

export const Toolbar = () => {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div onClick={() => router.push('/')}>Home</div>
      <div onClick={() => router.push('/blog')}>Blog</div>
      <div onClick={() => router.push('/feed/1')}>Feed</div>
      <div onClick={() => router.push('/eom')}>EOM</div>
      <div onClick={() => router.push('/products')}>Products</div>
      <div target='_blank' onClick={() => (window.location.href = 'https://twitter.com/fahad76532315')}>Twitter</div>
    </div>
  );
};