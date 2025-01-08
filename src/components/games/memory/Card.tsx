'use client';

import { MemoryCard } from '@/schemas/games/memory/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface CardInterface {
  card: Required<MemoryCard>;
  handleClick: (card: Required<MemoryCard>) => void;
}

const Card = ({ card, handleClick }: CardInterface) => {
  return (
    <motion.div
      className={cn(
        'relative w-[200px] h-[300px] perspective-1000',
        card.matched && 'border-4 border-yellow-400',
      )}
    >
      <motion.button
        className="absolute inset-0 size-full"
        onClick={() => handleClick(card)}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="relative size-full"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: card.flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Face cachée */}
          <div
            className={cn(
              'absolute w-full h-full rounded-lg shadow-md bg-gray-800 flex items-center justify-center text-white',
            )}
          >
            ?
          </div>

          {/* Face visible */}
          <div
            className={cn(
              'absolute w-full h-full backface-hidden rounded-lg shadow-md',
              'bg-white',
            )}
            style={{ transform: 'rotateY(180deg)' }}
          >
            {card.flipped && (
              <Image
                src={card.image}
                alt="Card image"
                width={200}
                height={300}
                className="h-full rounded-lg"
              />
            )}
          </div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default Card;
