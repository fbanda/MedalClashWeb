import {create} from 'zustand';
import dataSet from "../assets/TestCardDataSet.json";
import {isValidMedalRequirements, validateErrorsOnDeck} from "../Utils.ts";
import { persist } from 'zustand/middleware';

export const DEFAULT_CARD_TYPE = "ALL";
const MAX_CARDS_IN_DECK = 3;

export interface Card {
  id: string;
  amount: number;
  isError: boolean;
}

export interface Deck {
  name: string;
  leader: string;
  medalLvl1: string;
  medalLvl2: string;
  medalLvl3: string;
  cards: Card[];
  sideCards: Card[];
}

export interface StoreInterface {
  // deck
  deck: Deck
  setDeckName: (name: string) => void;
  addCardToDeck: (cardId: string) => void
  addCardToSideDeck: (cardId: string) => void
  removeCardFromDeck: (cardId: string) => void
  removeCardFromSideDeck: (cardId: string) => void
  setLeader: (cardId: string) => void;
  setMedalLvl1: (cardId: string) => void;
  setMedalLvl2: (cardId: string) => void;
  setMedalLvl3: (cardId: string) => void;
  medalsColor: (string | undefined)[];

  // filters
  filterInputValue: string;
  setFilterInputValue: (name: string) => void;
  searchByName: boolean;
  searchByText: boolean;
  searchByType: boolean;
  searchBySet: string;
  currentPage: number;
  cardType: string;

  // advanced filters
  isAdvancedFiltersOpen: boolean;
  setIsAdvancedFiltersOpen: (value: boolean) => void;

  color: string;
  setColor: (value: string) => void;

  attribute: string;
  setAttribute: (value: string) => void;

  group: string;
  setGroup: (value: string) => void;

  gender: string;
  setGender: (value: string) => void;

  legType: string;
  setLegType: (value: string) => void;

  medapartType: string;
  setMedapartType: (value: string) => void;

  armorCompare: string;
  setArmorCompare: (value: string) => void;
  armorValue: number;
  setArmorValue: (value: number) => void;

  spiritCompare: string;
  setSpiritCompare: (value: string) => void;
  spiritValue: number;
  setSpiritValue: (value: number) => void;

  costCompare: string;
  setCostCompare: (value: string) => void;
  costValue: number;
  setCostValue: (value: number) => void;

  powerCompare: string;
  setPowerCompare: (value: string) => void;
  powerValue: number;
  setPowerValue: (value: number) => void;

  // set filters
  setSearchByName: (name: boolean) => void;
  setSearchByText: (text: boolean) => void;
  setSearchByType: (type: boolean) => void;
  setSearchBySet: (set: string) => void;
  setCurrentPage: (page: number) => void;
  setCardType: (value: string) => void;

  // functions
  resetDeck: () => void;
}

export const useStore = create<StoreInterface>()(persist((set, getState) => ({
      deck: {
        name: "New Deck",
        leader: "",
        medalLvl1: "",
        medalLvl2: "",
        medalLvl3: "",
        cards: [],
        sideCards: [],
      },
      medalsColor: [undefined, undefined, undefined],
      searchByName: true,
      searchByText: false,
      searchByType: false,
      filterInputValue: "",
      searchBySet: "",
      currentPage: 1,
      cardType: DEFAULT_CARD_TYPE,
      isAdvancedFiltersOpen: false,
      color: DEFAULT_CARD_TYPE,
      attribute: DEFAULT_CARD_TYPE,
      group: DEFAULT_CARD_TYPE,
      gender: DEFAULT_CARD_TYPE,
      legType: DEFAULT_CARD_TYPE,
      medapartType: DEFAULT_CARD_TYPE,
      armorCompare: DEFAULT_CARD_TYPE,
      armorValue: 0,
      spiritCompare: DEFAULT_CARD_TYPE,
      spiritValue: 0,
      powerCompare: DEFAULT_CARD_TYPE,
      powerValue: 0,
      costCompare: DEFAULT_CARD_TYPE,
      costValue: 0,

      setDeckName: (name: string) => {
        const state = getState();
        set({
          deck: {
            ...state.deck,
            name: name,
          }
        })
      },
      addCardToDeck: (cardId: string) => {
        const state = getState();
        const card = dataSet.find(c => c.cardId === cardId);
        const cardExists = state.deck?.cards.find(c => c.id === cardId);
        const cardExistsInSideDeck = state.deck?.sideCards.find(c => c.id === cardId);
        if (cardExists && cardExists.amount >= MAX_CARDS_IN_DECK) return;
        if (cardExistsInSideDeck && (cardExists?.amount ?? 0) + cardExistsInSideDeck.amount >= MAX_CARDS_IN_DECK) return;

        const isError = card ? !isValidMedalRequirements(card.medalRequirements, state.medalsColor) : false;

        if (state.deck && cardExists) {
          set({
            deck: {
              ...state.deck,
              cards: state.deck.cards.map(c => c.id === cardId ? {...c, amount: c.amount + 1, isError: isError} : c)
            }
          })
        } else {
          set({
            deck: {
              ...state.deck,
              cards: [...state.deck?.cards ?? [], {id: cardId, amount: 1, isError: isError}]
            }
          })
        }
      },
      removeCardFromDeck: (cardId: string) => {
        const state = getState();
        const cardExists = state.deck?.cards.find(c => c.id === cardId);
        if (state.deck && (cardExists?.amount ?? 0) > 1) {
          set({
            deck: {
              ...state.deck,
              cards: state.deck.cards.map(c => c.id === cardId ? {...c, amount: c.amount - 1} : c)
            }
          })
        } else if (state.deck && (cardExists?.amount ?? 0) <= 1) {
          set({
            deck: {
              ...state.deck,
              cards: state.deck.cards.filter(c => c.id !== cardId)
            }
          })
        }
      },
      addCardToSideDeck: (cardId: string) => {
        const state = getState();
        const card = dataSet.find(c => c.cardId === cardId);
        const cardExists = state.deck?.sideCards.find(c => c.id === cardId);
        const cardExistsInMainDeck = state.deck?.cards.find(c => c.id === cardId);
        if (cardExists && cardExists.amount >= MAX_CARDS_IN_DECK) return;
        if (cardExistsInMainDeck && (cardExists?.amount ?? 0) + cardExistsInMainDeck.amount >= (MAX_CARDS_IN_DECK)) return;

        const isError = card ? !isValidMedalRequirements(card.medalRequirements, state.medalsColor) : false;

        if (state.deck && cardExists) {
          set({
            deck: {
              ...state.deck,
              sideCards: state.deck.sideCards.map(c => c.id === cardId ? {...c, amount: c.amount + 1, isError: isError} : c)
            }
          })
        } else {
          set({
            deck: {
              ...state.deck,
              sideCards: [...state.deck?.sideCards ?? [], {id: cardId, amount: 1, isError: isError}]
            }
          })
        }
      },
      removeCardFromSideDeck: (cardId: string) => {
        const state = getState();
        const cardExists = state.deck?.sideCards.find(c => c.id === cardId);
        if (state.deck && (cardExists?.amount ?? 0) > 1) {
          set({
            deck: {
              ...state.deck,
              sideCards: state.deck.sideCards.map(c => c.id === cardId ? {...c, amount: c.amount - 1} : c)
            }
          })
        } else if (state.deck && (cardExists?.amount ?? 0) <= 1) {
          set({
            deck: {
              ...state.deck,
              sideCards: state.deck.sideCards.filter(c => c.id !== cardId)
            }
          })
        }
      },
      setFilterInputValue: (filter: string) => set({filterInputValue: filter}),
      setSearchByName: (value: boolean) => set({searchByName: value}),
      setSearchByText: (value: boolean) => set({searchByText: value}),
      setSearchByType: (value: boolean) => set({searchByType: value}),
      setSearchBySet: (value: string) => set({searchBySet: value}),
      setCurrentPage: (value: number) => set({currentPage: value}),
      setCardType: (value: string) => set({cardType: value}),
      setIsAdvancedFiltersOpen: (value: boolean) => set({isAdvancedFiltersOpen: value}),
      setColor: (value: string) => set({color: value}),
      setAttribute: (value: string) => set({attribute: value}),
      setGroup: (value: string) => set({group: value}),
      setGender: (value: string) => set({gender: value}),
      setLegType: (value: string) => set({legType: value}),
      setMedapartType: (value: string) => set({medapartType: value}),
      setArmorCompare: (value: string) => set({armorCompare: value}),
      setArmorValue: (value: number) => set({armorValue: value}),
      setSpiritCompare: (value: string) => set({spiritCompare: value}),
      setSpiritValue: (value: number) => set({spiritValue: value}),
      setCostCompare: (value: string) => set({costCompare: value}),
      setCostValue: (value: number) => set({costValue: value}),
      setPowerCompare: (value: string) => set({powerCompare: value}),
      setPowerValue: (value: number) => set({powerValue: value}),

      setLeader: (cardId: string) => {
        const state = getState();
        set({
          deck: {
            ...state.deck,
            leader: cardId
          }
        })
      },
      setMedalLvl1: (cardId: string) => {
        const state = getState();
        const medalLevel1 = dataSet.find(c => c.cardId === cardId);
        const medalColor = medalLevel1?.colors[0] ?? undefined
        const newMedalsArray = [medalColor, state.medalsColor[1], state.medalsColor[2]]

        //Check to update errors in deck due to medal colors
        const deckCards = validateErrorsOnDeck(state.deck.cards, newMedalsArray)
        const sideDeckCards = validateErrorsOnDeck(state.deck.sideCards, newMedalsArray)

        set({
          deck: {
            ...state.deck,
            cards: deckCards,
            sideCards: sideDeckCards,
            medalLvl1: cardId
          },
          medalsColor: newMedalsArray
        })
      },
      setMedalLvl2: (cardId: string) => {
        const state = getState();
        const medalLevel2 = dataSet.find(c => c.cardId === cardId);
        const medalColor = medalLevel2?.colors[0] ?? undefined
        const newMedalsArray = [state.medalsColor[0], medalColor, state.medalsColor[2]]

        //Check to update errors in deck due to medal colors
        const deckCards = validateErrorsOnDeck(state.deck.cards, newMedalsArray)
        const sideDeckCards = validateErrorsOnDeck(state.deck.sideCards, newMedalsArray)

        set({
          deck: {
            ...state.deck,
            cards: deckCards,
            sideCards: sideDeckCards,
            medalLvl2: cardId
          },
          medalsColor: newMedalsArray
        })
      },
      setMedalLvl3: (cardId: string) => {
        const state = getState();
        const medalLevel3 = dataSet.find(c => c.cardId === cardId);
        const medalColor = medalLevel3?.colors[0] ?? undefined
        const newMedalsArray = [state.medalsColor[0], state.medalsColor[1], medalColor]

        //Check to update errors in deck due to medal colors
        const deckCards = validateErrorsOnDeck(state.deck.cards, newMedalsArray)
        const sideDeckCards = validateErrorsOnDeck(state.deck.sideCards, newMedalsArray)

        set({
          deck: {
            ...state.deck,
            cards: deckCards,
            sideCards: sideDeckCards,
            medalLvl3: cardId
          },
          medalsColor: newMedalsArray
        })
      },
      resetDeck: () => {
        set({
          deck: {
            name: "New Deck",
            leader: "",
            medalLvl1: "",
            medalLvl2: "",
            medalLvl3: "",
            cards: [],
            sideCards: [],
          },
          medalsColor: [undefined, undefined, undefined],
        })
      }
    }),
    {
      name: 'medabot-deck-storage',
      partialize: (state) => ({
        deck: state.deck,
        medalsColor: state.medalsColor,
        filterInputValue: state.filterInputValue,
        searchByName: state.searchByName,
        searchByText: state.searchByText,
        searchByType: state.searchByType,
      }),
    }
))