export interface Character {
    mal_id: number
    title: string
    image_url: string
    animeography: Apperarences[],
    mangaography: Apperarences[]
}

export interface Apperarences {
    name: string
}

export interface AppStrings {
    title: string
    score: string
    bestScore: string
    incorrect: string
    retry: string
    correctAnswer: string
    errorMessage: string
}

export class Languages {
    static ES = "ES"
    static EN = "EN"
}