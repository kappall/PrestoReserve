import './App.css';
import ReservationList from './components/ReservationList';

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>PrestoReserve</h1>
            </header>
            <ReservationList/>
        </div>
    );
}

export default App;
