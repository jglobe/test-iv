import { useEffect, useState } from 'react';

import { Card } from '@/components/card';
import { Draft } from '@/components/draft';
import { Button } from '@/components/button';
import * as cardService from '@/services/card.service';
import * as tagService from '@/services/tag.service';

import styles from './app.module.css';

function App() {
  const [tags, setTags] = useState(tagService.getAll());
  const [cards, setCards] = useState(cardService.getAll());
  const defaultFilter:tagService.TagPropsType[] = []
  const [filter, setFilter] = useState(tagService.getAll());

  // useEffect(() => {
  //   setFilter(tags)
  // }, [tags])

  function render() {
    let cardsList = cardService.getAll();
    const tagsList = tagService.getAll();

    const isFilterApplicated = filter.find((tag:tagService.TagPropsType) => !tag.active);
    if(isFilterApplicated && isFilterApplicated !== undefined) {
      const filterTags:string[] = [];
      const currentList = [...cardsList];

      filter.forEach((tag:tagService.TagPropsType) => {
        if (tag.active) filterTags.push(tag.name)
      });

      cardsList = currentList.filter((card:cardService.CardPropsType) => filterTags.filter(name => card.tags.includes(name)).length);
    }


    const newFilter:tagService.TagPropsType[] = []

    filter.forEach((tagFilter:tagService.TagPropsType) => {
      const currentIndex = tagsList.findIndex((tag:tagService.TagPropsType) => tagFilter.id === tag.id );

      if(currentIndex >= 0) {
        newFilter.push({ id: tagsList[currentIndex].id, name: tagsList[currentIndex].name, count: tagsList[currentIndex].count, active:tagFilter.active })
      }
    });


    let newTags = tagsList.map((tag:tagService.TagPropsType) => tag.name);
    let oldTags = filter.map((tag:tagService.TagPropsType) => tag.name);

    let tagsToAddInFilter = newTags.filter((x:string) => !oldTags.includes(x));

    tagsToAddInFilter.forEach((name:string) => {
      const currentIndex = tagsList.findIndex((tag:tagService.TagPropsType) => tag.name === name);
      newFilter.push(tagsList[currentIndex])
    });

    setCards(cardsList);
    setTags(tagsList);
    setFilter(newFilter);
  }

  function saveCard({ id, tags, description }: cardService.CardPropsType) {

    if(id) {
      const currentId = cards.findIndex((card:cardService.CardPropsType) => card.id === id);
      const oldTags = cards[currentId].tags

      let differenceToDel = oldTags.filter((name:string) => !tags.includes(name));
      let differenceToAdd = tags.filter((name:string) => !oldTags.includes(name));

      differenceToDel.forEach((old:string) => cancelTag(old));
      differenceToAdd.forEach((newest:string) => saveTag(newest));

      cardService.edit({id: id, tags, description: description.trim()})
    } else {

      tags.forEach((tag:string)=> saveTag(tag));

      const newId = Math.floor(Math.random() * 1000000);
      cardService.create({id: newId, tags, description: description.trim()})
    }
    render();
  }

  function cancelCard({ id, tags, description }: cardService.CardPropsType) {
    cardService.cancel({ id, tags, description });

    if(tags) {
      tags.forEach((tag:string)=> cancelTag(tag));
    }

    render();
  }

  function saveTag(name:string) {
    const current = tags.findIndex((tag:tagService.TagPropsType) => tag.name === name);

    if(current >= 0) {
      const existedTag = tags[current];
      tagService.edit({ id: existedTag.id, name: existedTag.name, count: existedTag.count + 1, active: true })
    } else {
      const newId = Math.floor(Math.random() * 1000000);
      tagService.create({ id: newId, name, count: 1 })
    }
    render();
  }

  function cancelTag(name:string) {
    const current = tags.findIndex((tag:tagService.TagPropsType) => tag.name === name);

    if(current >= 0) {
      const existedTag = tags[current];
      tagService.edit({ id: existedTag.id, name: existedTag.name, count: existedTag.count - 1, active: true })
    }
    render();
  }

  return (
    <div className={styles.app}>
      <div className={styles.app__filter}>
        <Button
          type='button'
          styling='_tag_active'
          onClick={() => {
            const currentFilter = [...filter]
            currentFilter.map((tag:tagService.TagPropsType) => tag.active = true)
            setFilter(currentFilter);
            render();
          }}
        >
          All
        </Button>
        {filter && filter.map((item:tagService.TagPropsType, index: number) => (
          <Button
            key={item.id+index}
            type='button'
            styling={item.active ? '_tag_active': '_tag__inactive'}
            onClick={() => {
              const currentFilter = [...filter]
              currentFilter[index].active = !currentFilter[index].active;
              setFilter(currentFilter);
              render();
            }}
          >
            {item.count}: {item.name}
          </Button>
        ))}
      </div>
      <Draft
        tags={[]}
        id={null}
        description=''
        setClose={() => {}}
        saveCard={saveCard}
      />
      <div className={styles.app__cards}>
        {cards.map((card: cardService.CardPropsType) => (
          <Card
            key={card.id}
            tags={card.tags}
            id={card.id}
            description={card.description}
            saveCard={saveCard}
            cancelCard={cancelCard}
          />
        ))}

      </div>
    </div>
  )
}

export default App
