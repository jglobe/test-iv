import { Dispatch, SetStateAction } from 'react';

function getAll() {
  return JSON.parse(localStorage.getItem('cards')||'[]');
}

function create({ id, tags, description }: CardPropsType) {
  const allCards = getAll();
  allCards.push({ id, tags, description })
  localStorage.setItem('cards', JSON.stringify(allCards));
}

function cancel({ id, tags, description }: CardPropsType) {
  const allCards = getAll();
  const currentIndex = allCards.findIndex((card: CardPropsType) => card.id === id);
  allCards.splice(currentIndex, 1);
  localStorage.setItem('cards', JSON.stringify(allCards));
}

function edit({ id, tags, description }: CardPropsType) {
  const allCards = getAll();
  const currentIndex = allCards.findIndex((card: CardPropsType) => card.id === id);
  allCards.splice(currentIndex, 1, { id, tags, description });
  localStorage.setItem('cards', JSON.stringify(allCards));
}

interface CardPropsType {
  id: number|null;
  tags: string[];
  description: string;
  saveCard?: ({ id, tags, description }: CardPropsType) => void;
  cancelCard?: ({ id, tags, description }: CardPropsType) => void;
}

interface DraftPropsType extends CardPropsType {
  setClose: Dispatch<SetStateAction<boolean>>;
}

export { create, cancel, edit, getAll }
export type { CardPropsType, DraftPropsType };