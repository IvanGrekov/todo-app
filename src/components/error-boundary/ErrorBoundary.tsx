import { Component, ReactNode } from 'react';

import Typography from 'components/typography';

interface IErrorBoundaryProps {
    children: ReactNode;
}

interface IErrorBoundaryState {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    public componentDidCatch(): void {
        this.setState({ hasError: true });
    }

    public render(): ReactNode {
        const { hasError } = this.state;

        if (hasError) {
            return (
                <div className="error-boundary">
                    <Typography variant="h3" element="h2">
                        Error occurred on the page
                    </Typography>
                </div>
            );
        }

        return this.props.children;
    }
}
