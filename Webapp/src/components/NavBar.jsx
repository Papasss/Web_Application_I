import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';

function NavBar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="#" style={{ minWidth: '400px' }}>
                    🎬 PapaLibrary
                </a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
            {/* Form di ricerca con le classi Bootstrap */}
            <form className="d-flex" style={{ width: '100%', maxWidth: '600px' }}>
                <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Search for title..." 
                    aria-label="Search"
                />
                {/* Opzionale: un bottone "Cerca", anche se la ricerca avviene già in tempo reale */}
                <button className="btn btn-outline-light" type="button">
                    Search
                </button>
            </form>
            </div>
            </div>
        </nav>
    );
}

export default NavBar;