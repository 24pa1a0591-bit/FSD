const comicsData = [
    {
        id: "1",
        title: "Solo Leveling",
        author: "Chugong",
        genre: ["Action", "Fantasy"],
        rating: 4.9,
        thumbnail: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=300&h=400&fit=crop",
        cover: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1200&h=400&fit=crop",
        description: "10 years ago, after 'the Gate' that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate.",
        episodes: [
            { id: "e1", title: "Ep. 1 - The Weakest Hunter", date: "2023-01-01", likes: "125K" },
            { id: "e2", title: "Ep. 2 - The Double Dungeon", date: "2023-01-08", likes: "110K" },
            { id: "e3", title: "Ep. 3 - The Secret Quest", date: "2023-01-15", likes: "105K" }
        ],
        readerImages: [
            "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=1200&fit=crop",
            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=1200&fit=crop",
            "https://images.unsplash.com/photo-1580130601254-05fa235abeab?w=800&h=1200&fit=crop"
        ]
    },
    {
        id: "2",
        title: "Tower of God",
        author: "SIU",
        genre: ["Action", "Mystery"],
        rating: 4.8,
        thumbnail: "https://images.unsplash.com/photo-1612480797698-8ec17bc158b4?w=300&h=400&fit=crop",
        cover: "https://images.unsplash.com/photo-1612480797698-8ec17bc158b4?w=1200&h=400&fit=crop",
        description: "What do you desire? Money and wealth? Honor and pride? Authority and power? Revenge? Or something that transcends them all? Whatever you desire—it's here.",
        episodes: [
            { id: "e1", title: "Ep. 1 - Headon's Floor", date: "2023-01-01", likes: "95K" },
            { id: "e2", title: "Ep. 2 - The Evankhell's Hell", date: "2023-01-08", likes: "88K" }
        ]
    },
    {
        id: "3",
        title: "Omniscient Reader",
        author: "Sing Shong",
        genre: ["Fantasy", "Action"],
        rating: 4.9,
        thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=400&fit=crop",
        description: "Dokja was an average office worker whose sole interest was reading his favorite web novel 'Three Ways to Survive the Apocalypse'. But when the novel suddenly becomes reality...",
        episodes: [
            { id: "e1", title: "Ep. 1 - Prologue", date: "2023-02-01", likes: "150K" }
        ]
    },
    {
        id: "4",
        title: "Let's Play",
        author: "Mongie",
        genre: ["Romance", "Comedy"],
        rating: 4.7,
        thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=400&fit=crop",
        cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=400&fit=crop",
        description: "She's young, single and about to achieve her dream of creating incredible videogames. But then life throws her a one-two punch...",
        episodes: [
            { id: "e1", title: "Ep. 1", date: "2023-03-01", likes: "80K" }
        ]
    },
    {
        id: "5",
        title: "Lore Olympus",
        author: "Rachel Smythe",
        genre: ["Romance", "Drama"],
        rating: 4.8,
        thumbnail: "https://images.unsplash.com/photo-1473280025148-643f9b0cbac2?w=300&h=400&fit=crop",
        cover: "https://images.unsplash.com/photo-1473280025148-643f9b0cbac2?w=1200&h=400&fit=crop",
        description: "Witness what the gods do…after dark. The friendships and the lies, the gossip and the wild parties, and of course, forbidden love.",
        episodes: [
            { id: "e1", title: "Ep. 1", date: "2023-04-01", likes: "200K" }
        ]
    }
];

const userData = {
    username: "WebtoonFan99",
    profilePic: "https://ui-avatars.com/api/?name=Webtoon+Fan&background=random",
    library: ["1", "3", "5"],
    history: [
        { id: "1", epID: "e2", progress: "50%" },
        { id: "2", epID: "e1", progress: "100%" }
    ]
};
