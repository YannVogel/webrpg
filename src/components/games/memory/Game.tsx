'use client';

import Card from '@/components/games/memory/Card';
import { Memory } from '@/lib/games/MemoryClass';
import { useState } from 'react';

const memoryClass = new Memory();

export default function MemoryGame() {
  const [cards, setCards] = useState(memoryClass.cards);

  return (
    <div className={'flex gap-4'}>
      {cards.map((card) => (
        <Card
          key={card.calculatedId}
          card={card}
          handleClick={async (card) => {
            memoryClass.flipCard(card);
            setCards(memoryClass.cards);
            if (await memoryClass.unflipCards()) {
              setCards(memoryClass.cards);
            }
          }}
        />
      ))}
    </div>
  );
}
