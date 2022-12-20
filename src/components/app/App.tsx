import Header from 'components/header';
import PeriodFilter from 'components/period-filter';
import Spacing from 'components/spacing';

import 'components/app/App.styles.scss';

export default function App(): JSX.Element {
    return (
        <main className="app">
            <Header />
            <Spacing sm={40} xl={60} />
            <PeriodFilter />
            <section />
        </main>
    );
}
