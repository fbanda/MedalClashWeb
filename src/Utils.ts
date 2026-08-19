import dataSet from "./assets/TestCardDataSet.json";
import type {Card} from "./store/store.ts";

export const isValidMedalRequirements = (colorRequirements: string[], medalsColors: (string | undefined)[]) => {
  // Si no hay requerimientos, siempre se cumple
  if (colorRequirements.length === 0) {
    return true;
  }

  // Si hay más requerimientos que colores disponibles, no puede cumplirse
  if (colorRequirements.length > medalsColors.length) {
    return false;
  }

  // Usar backtracking para intentar asignar colores a requerimientos
  return canAssignColors(colorRequirements, [...medalsColors], 0);
}

/**
 * Función recursiva de backtracking para asignar colores a requerimientos
 */
function canAssignColors(
    requirements: string[],
    availableColors: (string | undefined)[],
    reqIndex: number
): boolean {
  // Si asignamos todos los requerimientos, éxito
  if (reqIndex >= requirements.length) {
    return true;
  }

  const requirement = requirements[reqIndex];

  // Intentar asignar cada color disponible a este requerimiento
  for (let i = 0; i < availableColors.length; i++) {
    const color = availableColors[i];

    // Verificar si este color satisface el requerimiento
    if (color && requirement.includes(color)) {
      // Remover el color usado temporalmente
      const remainingColors = [
        ...availableColors.slice(0, i),
        ...availableColors.slice(i + 1)
      ];

      // Intentar asignar el resto de requerimientos
      if (canAssignColors(requirements, remainingColors, reqIndex + 1)) {
        return true;
      }
      // Si no funcionó, el backtracking prueba con otro color
    }
  }

  // No se encontró ninguna asignación válida
  return false;
}

export const validateErrorsOnDeck = (deck: Card[], medalsArray: (string | undefined)[]) => {
  return deck.map(card => {
    const cardFromDataSet = dataSet.find(c => c.cardId === card.id);
    const isError = !isValidMedalRequirements(cardFromDataSet?.medalRequirements ?? [], medalsArray);
    return {
      ...card,
      isError: isError
    }
  });
}

function IsValidForMainSideDeck(card: any): boolean
{
  if(card.isToken) return false;
  if(card.cardType === "Leader" || card.cardType === "Medal") return false;
  return true;
}

export const SaveDeckToStore = (store: any, deckName: string, deck: string, sideDeck: string, leader: string, medalLvl1: string, medalLvl2: string, medalLvl3: string, deckId?: string) => {
  const cards = deck?.split(",") ?? [];
  const cardsIds = cards.map(card => card.split("x")[0]);
  const cardsAmount = cards.map(card => card.split("x")[1]);

  if (deckId) store.setDeckId(deckId);

  store.setDeckName(deckName);
  store.setLeader(leader);
  store.setMedalLvl1(medalLvl1);
  store.setMedalLvl2(medalLvl2);
  store.setMedalLvl3(medalLvl3);

  if(cardsIds.length > 0) {
    dataSet.forEach(card => {
      if(IsValidForMainSideDeck(card) && cardsIds.includes(card.cardId)) {
        const cardIndex = cardsIds.indexOf(card.cardId);
        const cardAmount = +cardsAmount[cardIndex];
        for(let i = 0; i < cardAmount; i++) {
          store.addCardToDeck(card.cardId);
        }
      }
    });
  }

  const sideCards = sideDeck?.split(",") ?? [];
  const sideCardsIds = sideCards.map(card => card.split("x")[0]);
  const sideCardsAmount = sideCards.map(card => card.split("x")[1]);

  if(sideCardsIds.length > 0) {
    dataSet.forEach(card => {
      if(IsValidForMainSideDeck(card) && sideCardsIds.includes(card.cardId)) {
        const cardIndex = sideCardsIds.indexOf(card.cardId);
        const cardAmount = +sideCardsAmount[cardIndex];
        for(let i = 0; i < cardAmount; i++) {
          store.addCardToSideDeck(card.cardId);
        }
      }
    });
  }
}

declare global {
  interface String {
    removeAccentsToLowerCase(): string;
  }
}

String.prototype.removeAccentsToLowerCase = function() {
  return this.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

export const getCurrentFormattedDate = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}