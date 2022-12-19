import PeriodFilter from 'components/period-filter';

import './App.styles.scss';

export default function App(): JSX.Element {
    return (
        <main className="app">
            <header className="app__header">
                <PeriodFilter />
            </header>
            <section />
        </main>
    );
}
