import styles from './LoadingComponent.module.scss';

const LoadingComponent = () => {
    return (
        <div className={styles.loading_component_container}>
            <div className={styles.spin} />
        </div>
    )
}
export default LoadingComponent;