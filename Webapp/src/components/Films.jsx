function Films({ movies, onDelete, onAdd }) {
  
  const handleAddNew = () => {
    
    const newMovie = { id: Date.now(), title: 'Nuovo Film', director: 'Sconosciuto', year: 2024 };
    onAdd(newMovie);
  };

  return (
    <div className="film-library">
      <button onClick={handleAddNew} className="add-btn">
        + Add New Movie
      </button>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Favourite</th>
            <th>Anno</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.year}</td>
              <td>
                <button onClick={() => onDelete(movie.id)} className="delete-btn">
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Films;