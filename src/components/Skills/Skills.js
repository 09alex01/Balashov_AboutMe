import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import styles from './Skills.module.css';

const Skills = ({ userUrl, userLogin }) => (<div>
  <div className={styles.skills} id={'skills'}>
    <h1 className={styles.skillsTitle}>Навыки</h1>
    <p>Я постоянно стремлюсь получать новые знания, осваивать современные технологии и методы работы.
    Инструменты, которыми я владею:</p>
  </div>
  <ol className={styles.skillsList}>
    <li><span className={styles.skillsNum}>01 </span>HTML</li>
      <p>Написание валидного кода, который имеет логичную семантическая структуру и соответствует стандартам,
      методология именования БЭМ</p>
    <li><span className={styles.skillsNum}>02 </span>CSS</li>
      <p>Адаптивная верстка, блочная фиксированная/резиновая верстка с использованием Flexbox/Grid, реализация Pixel
      Perfect, использование Keyframe анимаций</p>
    <li><span className={styles.skillsNum}>03 </span>JavaScript</li>
      <p>Поддержание динамики страниц с использованием нативного JS, ES6</p>
    <li><span className={styles.skillsNum}>04 </span>GIT</li>
      <p>Работа с системой контроля версий Git. Мой профиль на GitHub
      <a className={styles.userLink} href={userUrl}> {userLogin}</a>.</p>
    <li><span className={styles.skillsNum}>05 </span>React</li>
      <p>Разработка приложений с помощью эффективной и гибкой JavaScript библиотеки. Она позволяет
       собирать сложный UI из небольших изолированных компонентов</p>
  </ol>
</div>);

export default Skills;
