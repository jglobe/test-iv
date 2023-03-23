import { useState } from 'react';

import { Button } from "@/components/button";
import * as cardService from '@/services/card.service';

import styles from './draft.module.css';

export function Draft({ id, tags, description, setClose, saveCard }: cardService.DraftPropsType) {
  const [value, setValue] = useState(description);
  const [newTags, setNewTags] = useState(tags);

  function handleSubmit (event: { preventDefault: () => void; }) {
    event.preventDefault();

    saveCard &&  saveCard({ id, tags: newTags, description: value });
    setClose && setClose(false);
    setValue('');
    setNewTags([]);
  }

  const hastagRegex = /(#(?:[^\x00-\x7F]|\w)+)/g;

  return(
    <div className={styles.draft}>
      <form
        onSubmit={handleSubmit}
      >
        <textarea
          value={value}
          className={styles.draft__textarea}
          onChange={(event) => {
            let current = event.target.value;
            let matches = current.match(hastagRegex)

            matches?.length ? setNewTags(matches.filter((value, index, array) => array.indexOf(value) === index))
            : setNewTags([])
            setValue(current)
          }}
          required={true}
          placeholder='Type here...'
        />
      <div className={styles.draft__tags}>
        {newTags && newTags.map((tag, index) => (
          <Button
            styling='_tag_active'
            type='button'
            key={tag+index}
            onClick={() => {}}
          >
            {tag}
          </Button>
        ))}
      </div>
        <Button
          type="submit"
          styling='save'
        >
          save
        </Button>
        {id && (
          <Button
            type='button'
            styling='cancel'
            onClick={() => setClose(false)}
          >
            close
          </Button>
        )}
      </form>
  </div>
  )
}
