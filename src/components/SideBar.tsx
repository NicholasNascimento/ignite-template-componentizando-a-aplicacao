import { useContext } from "react";
import { CineContext } from "../DataContext";
import { Button } from "./Button";

export function SideBar() { 
  const context = useContext(CineContext)

  const {genres, selectedGenreId, handleClickButton} = context;

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
