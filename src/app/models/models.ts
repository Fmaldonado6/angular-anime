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

