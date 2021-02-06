interface SearchResult {
    page: number,
    results: {
        id: number,
        title: string;
    }[]
}

interface MovieResult {
    id: number;
    backdrop_path: string;
    overview: string;
    poster_path: string;
    release_date: string;
    tagline: string;
    title: string;
    runtime:number;
}

interface PeopleResult {
    id: number;
    cast: CastResult[];
    crew: CrewResult[]
}

interface PersonResult {
    id: number,
    name: string;
}

interface CastResult extends PersonResult {
    order: number;
    character: string;
    profile_path: string;
}

interface CrewResult extends PersonResult {
    department: string;
    job: string;
}

interface Movie {
    id: number;
    title: string;
    tagline: string;
    releaseDate: Date;
    posterUrl: string;
    backdropUrl: string;
    overview: string;
    runtime: number;
    characters: Character[];
    directedBy: string;
    writenBy: string;
}

interface Character {
    name: string;
    actor: string;
    image: string;
}
