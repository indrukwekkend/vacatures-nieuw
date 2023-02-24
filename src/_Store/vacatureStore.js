import { create } from 'zustand'
import axios from "axios";
import { persist } from 'zustand/middleware'

/// Haal de vacatures op en sla deze op in de zustand "persist", zodat bij herladen of bezoeken van een andere pagina
// Hierin slaan we de filtermogelijkheden op. Deze worden opgehaald vanuit de API


export const useStore = create(
  persist (
    (set, get) => ({

      // Hierin noet nog bij dat we dan de Array van de vacatures op moeten slaan
      // Dit slaan we ook op in de zustand "persist", zodat bij herladen of bezoeken van een andere pagina, de data wordt opgehaald

      //haal op basis van deze filter de vacatures op
      filterErvaringen: [],
      filterWerkvelden: [],
      filterNiveaus: [],
      searchText: '',

      // Filter functies
      toggleFilterErvaringen: (id) => set({
        filterErvaringen: get().filterErvaringen.includes(id) ? get().filterErvaringen.filter((item) => item !== id) : [...get().filterErvaringen, id]
      }),

      toggleFilterWerkvelden: (id) => set({
        filterWerkvelden: get().filterWerkvelden.includes(id) ? get().filterWerkvelden.filter((item) => item !== id) : [...get().filterWerkvelden, id]
      }),

      toggleFilterNiveaus: (id) => set({
        filterNiveaus: get().filterNiveaus.includes(id) ? get().filterNiveaus.filter((item) => item !== id) : [...get().filterNiveaus, id]
      }),

      updateSearchText: (text) => set({
        searchText: text,
      }),

      // Reset filters
      resetFilters: () => set({
        filterErvaringen: [],
        filterWerkvelden: [],
        filterNiveaus: [],
        searchText: '',
      }),

      //haal vacatures op
      query: [],
      vacatures: [],
      loading: false,
      hasErrors: false,
  
      //haal vacatures op
      getVacatures: async (test=-1, ) => {
        set(() => ({ loading: true }));
          // get veranderen in een post
          const response = await 
            axios.post('/wp-json/iv/v2/vacature-lijst' , {
              post_type: 'vacature',
              posts_per_page: test,
              q: get().searchText,
              ervaringen: get().filterErvaringen,
              werkvelden: get().filterWerkvelden,
              niveaus: get().filterNiveaus
            }
          )
        set({ 
          vacatures: await response.data.posts,
          query:    await response.data,
          loading:  false
        })
      },
    }),
    {
      name: 'filterVacature-storage', // unique name
    }
  )
)

// Hierin slaan we de filtermogelijkheden op. Deze worden opgehaald vanuit de API
// STATIC DATA (DATABASE)
export const useCategorieStore = create(
  (set) => ({
  //categorieen filter
  ervaringen: [],
  werkvelden: [],
  niveaus: [],

  getErvaringen: async () => {
    set(() => ({ loading: true }));
    const response = await axios.get('/wp-json/iv/v2/filter/?taxonomy='+'ervaring')
    set({ 
      ervaringen: await response.data,
    })
  },
  getWerkvelden: async () => {
    set(() => ({ loading: true })); 
    const response = await axios.get('/wp-json/iv/v2/filter/?taxonomy='+'werkveld')
    set({
      werkvelden: await response.data,
    })
  },
  getNiveaus: async () => {
    set(() => ({ loading: true }));
    const response = await axios.get('/wp-json/iv/v2/filter/?taxonomy='+'niveau')
    set({ 
      niveaus: await response.data,
    })
  },
}))

export const useSingleStore = create(
  (set) => ({
  //meta velden om te tonen en de namen van de velden
  metaVelden: [],
  post: [],
  loading: true,
  hasErrors: false,

  getMetaVelden: async () => {
    // set(() => ({ loading: true }));
    const response = await axios.get('/wp-json/iv/v2/vacature-settings')
    set({ 
      metaVelden: await response.data,
      
      // query: await response.data,
      // laat hier niet de loading zien, omdat we deze data al in de andere call hebben,
      // anders krijgen we een loding error in de console
    })
    // console.log('getMetaVelden');
    // console.log(response.data);
  },

  getPost: async (id) => {
    set(() => ({ loading: true })); 
    const response = await axios.get('/wp-json/iv/v2/vacature-single/?id='+id)
    set({
      post: await response.data.posts[0],
      query: await response.data,
      loading: false
    })
  },
}))

// Fovorites of Likes Storage in Zustand State. Hierin slaan we de favorieten op van de gebruiker.
// Dit is een aparte store, omdat we deze data ook willen opslaan in de browser, zodat deze data bewaard blijft.
export const useFavStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorites: (id) => set({ 
        //Get en update de state:   
        favorites: get().favorites.includes(id) ? get().favorites.filter((item) => item !== id) : [...get().favorites, id]
      }),

      // variabelen voor de vacatures
      query: [],
      vacatures: [],
      loading: false,
      hasErrors: false,
  
      //haal vacatures op, op basis van de 
      getVacatures: async (ppp=100, ) => {
        set(() => ({ loading: true }));
          // get veranderen in een post
          const response = await 
            axios.post('/wp-json/iv/v2/vacature-lijst' , {
              post_type: 'vacature',
              posts_per_page: ppp,
              post_in: get().favorites
            }
          )
        set({ 
          vacatures: await response.data.posts,
          query:    await response.data,
          loading:  false
        })
      }, 
    }),
    {
      name: 'favorites-storage', // unique name
    }
  )
)

export const useTotalStore = create(
  (set) => ({
  //meta velden om te tonen en de namen van de velden
  posts: [],
  slides: [],
  loading: true,
  hasErrors: false,

  getPost: async (ppp=9) => {
    set(() => ({ loading: true })); 
    const response = await axios.get('/wp-json/iv/v2/vacature-lijst/?post_type=vacature&posts_per_page='+ppp)
    set({
      posts: await response.data.posts,
      query: await response.data,
      loading: false
    })
  },

  getSlides: async (ppp=9) => {
    set(() => ({ loading: true })); 
    const response = await axios.get('/wp-json/iv/v2/vacature-lijst/?post_type=vacature&posts_per_page='+ppp)
    set({
      slides: await response.data.posts,
      query: await response.data,
      loading: false
    })
  },

}))