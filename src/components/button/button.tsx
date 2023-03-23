import classNames from 'classnames';

import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styling: string;
}

export function Button({ styling, ...props }:ButtonProps) {
  return(
    <button
      {...props}
      className={classNames({
        [styles.button]: true,
        [styles['button_' + styling]]: true,
      })}
    />
    )
}
