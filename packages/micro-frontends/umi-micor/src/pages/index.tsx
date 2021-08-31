import styles from './index.less';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}

export async function bootstrap () {
  console.log('bootstrap')
}

export async function mount (props:any) {
  console.log(props)
}

export async function unmount () {
}