import { useState } from 'react';

import { Draft } from '@/components/draft'
import { Button } from '@/components/button';

import * as cardService from '@/services/card.service';

import styles from './card.module.css';

export function Card({ id, tags, description, saveCard, cancelCard }: cardService.CardPropsType) {
  const [isEdit, setIsEdit] = useState(false);

  function handleSubmit (event: { preventDefault: () => void; }) {
    event.preventDefault();
    cancelCard && cancelCard({ id, tags, description })
  }

  return(
    <>
      {!isEdit && (
        <div className={styles.card}>
          <div className={styles.card__description}>
            {description}
          </div>
          <div className={styles.card__tags}>
            {tags.map((tag) => (
              <div
                key={tag}
                className={styles.tag}
              >
                {tag}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <Button
              styling='save'
              type='button'
              onClick={() => setIsEdit(true)}
            >
              edit
            </Button>
            <Button
              type='submit'
              styling='cancel'
            >
              cancel
            </Button>
          </form>
        </div>
      )}
      {isEdit && (
        <Draft
          id={id}
          tags={tags}
          description={description}
          setClose={setIsEdit}
          saveCard={saveCard}
        />
      )}
    </>
  )
}
