import React from 'react';
import styles from './Footer.module.css';

const Footer = ({ userName }) => (<div className={styles.footer}>
  <div className={styles.footerTitle}>
    <h1>Alexandr Balashov</h1>
    <p>Привет, я junior frontend-developer. Я могу помочь вам создать ваш следующий проект.</p>
  </div>
  <div className={styles.footerMenu}>
    <p>Меню</p>
    <ol>
      <li><a className={styles.footerLink} href={"#about"}>Обо мне</a></li>
      <li><a className={styles.footerLink} href={"#works"}>Опыт работы</a></li>
      <li><a className={styles.footerLink} href={"#skills"}>Навыки</a></li>
      <li><a className={styles.footerLink} href={"#repos"}>Git-репозитории</a></li>
    </ol>
  </div>
  <div className={styles.footerContacts}>
    <p>Контакты</p>
    <a href={'mailto:mmmorgenalll@gmail.com'}> mmmorgenalll@gmail.com </a><br/>
    <a href={'tel:+79130822502'}>+7 (901) 191-75-64</a>
  </div>
</div>);

export default Footer;
