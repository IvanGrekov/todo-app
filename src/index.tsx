import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom/client';

import App from 'components/app';

import 'styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
);
