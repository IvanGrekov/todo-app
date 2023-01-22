import 'components/skeleton/Skeleton.styles.scss';

interface ISkeletonProps {
    width?: number | string;
    height?: number | string;
}

export default function Skeleton({ width = '100%', height = '1rem' }: ISkeletonProps): JSX.Element {
    return <div className="skeleton" style={{ width, height }} />;
}
