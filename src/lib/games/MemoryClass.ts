import { MemoryCard } from '@/schemas/games/memory/card';
import { memoryCards } from '@/data-test/games/memory/memoryCards';
import { shuffle } from '@/lib/utils';

export class Memory {
  private static instance: Memory;

  private constructor() {
    const cards = memoryCards.flatMap((card) => [
      {
        ...card,
        calculatedId: `${card.id}_1st_occurrence`,
        flipped: false,
        matched: false,
      },
      {
        ...card,
        calculatedId: `${card.id}_2nd_occurrence`,
        flipped: false,
        matched: false,
      },
    ]);

    this._cards = shuffle(cards);
  }

  private _cards: Required<MemoryCard>[];

  get cards() {
    return this._cards;
  }

  public static getInstance(): Memory {
    if (!Memory.instance) {
      Memory.instance = new Memory();
    }
    return Memory.instance;
  }

  public flipCard = (selectedCard: Required<MemoryCard>) => {
    const matched = this.matchWithUnmatchedFlippedCard(selectedCard);
    const unmatchedFlippedCards = this.getUnmatchedFlippedCards();
    this._cards = this._cards.map((card) => {
      const condition = matched
        ? card.id === selectedCard.id
        : card.calculatedId === selectedCard.calculatedId;

      if (
        condition &&
        !selectedCard.flipped &&
        unmatchedFlippedCards.length < 2
      ) {
        return {
          ...card,
          flipped: true,
          matched,
        };
      }
      return card;
    });
  };

  public unflipCards = async () => {
    if (this.getUnmatchedFlippedCards().length === 2) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      this._cards = this._cards.map((card) => {
        if (card.matched) return card;
        return { ...card, flipped: false };
      });

      return true;
    }
    return false;
  };

  private getUnmatchedFlippedCards = () =>
    this._cards.filter((card) => card.flipped && !card.matched);

  private matchWithUnmatchedFlippedCard = (card: Required<MemoryCard>) => {
    const unmatchedFlippedCards = this.getUnmatchedFlippedCards();
    if (unmatchedFlippedCards.length === 0) return false;

    return unmatchedFlippedCards[0].id === card.id;
  };
}
