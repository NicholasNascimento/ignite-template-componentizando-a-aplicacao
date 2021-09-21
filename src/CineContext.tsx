import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from './services/api';

const CineContext = createContext<CineMoviesContext>({} as CineMoviesContext)

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }
  
  interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }

  interface CineProviderProps {
      children: ReactNode
  }

  interface CineMoviesContext {
    genres: GenreResponseProps[];
    selectedGenre: GenreResponseProps;
    selectedGenreId: number;
    movies: MovieProps[];
    handleClickButton: (
        id: number,
    ) => void;
  }

export function CineProvider({children}:CineProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
      <CineContext.Provider value={{genres, selectedGenre, selectedGenreId, movies, handleClickButton}}>
          {children}
      </CineContext.Provider>
  )
}

export function useCineMovies() {
    const context = useContext(CineContext)

    return (context);
}