import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';

import Typography from 'components/typography';
import { NETWORK_ERROR_DISPLAY_DURATION } from 'constants/networkErrors';
import NetworkErrorsContext from 'models/contexts/networkErrors';

import 'components/network-errors/NetworkErrors.styles.scss';

const networkErrorsRoot = document.getElementById('network-errors-root') as HTMLElement;

export default function NetworkErrors(): JSX.Element {
    const { networkErrors, setNetworkErrors } = useContext(NetworkErrorsContext);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (networkErrors.length) {
            timeoutId = setTimeout(() => {
                setNetworkErrors((prevNetworkErrors) => prevNetworkErrors.slice(1));
            }, NETWORK_ERROR_DISPLAY_DURATION);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [networkErrors, setNetworkErrors]);

    const networkErrorsComponent = (
        <div className="network-errors">
            {networkErrors.map(({ id, message }) => (
                <div key={id} className="network-errors__item">
                    <Typography element="h6" variant="subtitle2">
                        {message}
                    </Typography>
                </div>
            ))}
        </div>
    );

    return createPortal(networkErrorsComponent, networkErrorsRoot);
}
