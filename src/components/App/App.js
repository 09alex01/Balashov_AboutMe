import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Pagination from "@material-ui/lab/Pagination";
import { Octokit } from "@octokit/rest";
import Skills from "../Skills/Skills";
import Footer from "../Footer/Footer";
import styles from "./App.module.css";

const octokit = new Octokit();
class App extends React.Component {
  state = {
    isLoading: true,
    repoList: [],
    error: false,
    repoPaginList: [],
    paginLimit: 4,
  };

  componentDidMount() {
    octokit.users
      .getByUsername({
        username: "09alex01",
      })
      .then((json) => {
        this.setState({
          isLoading: false,
          userLogin: json.data.login,
          userAvatar: json.data.avatar_url,
          userUrl: json.data.html_url,
          userBio: json.data.bio,
          userName: json.data.name,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          isLoading: false,
          textError: "Что-то пошло не так...",
        });
      });
    octokit.repos
      .listForUser({
        username: "09alex01",
      })
      .then(({ data }) => {
        this.setState({
          repoList: data,
          isLoading: false,
        });
        this.setState({
          repoPaginList: this.state.repoList.slice(0, this.state.paginLimit),
          paginCount: Math.ceil(
            this.state.repoList.length / this.state.paginLimit
          ),
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          isLoading: false,
          textError: "Что-то пошло не так...",
        });
      });
  }

  changePagin(event, value) {
    this.setState({
      currentPage: value,
      repoPaginList: this.state.repoList.slice(
        (value - 1) * this.state.paginLimit,
        (value - 1) * this.state.paginLimit + this.state.paginLimit
      ),
    });
  }

  render() {
    const { isLoading } = this.state;

    if (this.state.error) {
      return (
        <div>
          <h1 className={styles.title}>{this.state.textError}</h1>
        </div>
      );
    } else {
      return (
        <div>
          <div className={styles.wrap}>
            {isLoading ? (
              <LinearProgress />
            ) : (
              <div>
                <header id={"about"}>
                  <div className={styles.logo}></div>
                  <input
                    className={styles.menuToggle}
                    id={"menuToggle"}
                    type={"checkbox"}
                  />
                  <label className={styles.menuBtn} for={"menuToggle"}>
                    <span></span>
                  </label>
                  <nav className={styles.menu}>
                    <a className={styles.menuItem} href={"#works"}>
                      Опыт работы
                    </a>
                    <a className={styles.menuItem} href={"#skills"}>
                      Навыки
                    </a>
                    <a className={styles.menuItem} href={"#repos"}>
                      Git-репозитории
                    </a>
                    <p className={styles.menuContacts}>
                      Свяжитесь со мной
                      <br />
                      <a href={"mailto:mmmorgenalll@gmail.com"}>
                        {" "}
                        mmmorgenalll@gmail.com{" "}
                      </a>
                      <br />
                      <a href={"tel:+79130822502"}>+7 (901) 191-75-64</a>
                    </p>
                  </nav>
                </header>
                <div className={styles.user}>
                  <img
                    className={styles.userAvatar}
                    src="https://i.ibb.co/zJzWngj/6ab1313b-8d3f-4826-97cb-c1d587117b2f.jpg"
                    alt={'поросёнок'}
                  />
                  <h1 className={styles.userTitle}>
                    Alexandr
                    <br />
                    <span className={styles.userTitle2}>Balashov</span>.
                  </h1>
                  <p className={styles.userInfo}>
                    Привет, я{" "}
                    <span className={styles.userBio}>
                      junior frontend-developer{" "}
                    </span>
                    из города Иваново, Россия
                    <br />Я могу помочь вам создать ваш следующий проект.
                  </p>
                  <p className={styles.userText}>
                    Делаю верстку по макету, внесение правок в разделы/стили,
                    доработку сайта
                    <br />
                    Есть проект, который вы хотели бы обсудить?
                    <br />
                    Давайте пообщаемся в
                    <span>
                      :<br />
                    </span>
                    <a
                      className={styles.userLink}
                      href={"http://t.me/alexb0901"}
                    >
                      {" "}
                      Telegram
                    </a>
                    ?<br />
                    Или позвоните мне
                    <span>
                      :<br />
                    </span>
                    <a className={styles.userLink} href={"tel:+79130822502"}>
                      {" "}
                      +7 (901) 191-75-64
                    </a>
                    .
                  </p>
                </div>
                <div className={styles.arrow}></div>
              </div>
            )}
            <Skills
              userLogin={this.state.userLogin}
              userUrl={this.state.userUrl}
            />
            {isLoading ? (
              <LinearProgress />
            ) : (
              <div className={styles.repos} id={"repos"}>
                <h1 className={styles.title}>Git-репозитории</h1>
                <p>Здесь несколько репозиториев на GitHub с моими проектами:</p>
              </div>
            )}
            {!isLoading && (
              <div className={styles.list}>
                <ol>
                  {this.state.repoPaginList.map((repo) => (
                    <li className={styles.listItem} key={repo.id}>
                      <a className={styles.listLink} href={repo.html_url}>
                        {repo.name}
                      </a>
                      <p className={styles.listText}>{repo.description}</p>
                      <div
                        className={
                          styles[
                            `repoLanguage-${repo.language}`.toLowerCase()
                          ] +
                          " " +
                          styles.repoLanguageIcon
                        }
                      ></div>
                      <p>{repo.language}</p>
                      <span className={styles.listText}>
                        Updated on{" "}
                        {new Date(repo.updated_at).toLocaleString("eng", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </li>
                  ))}
                </ol>
                <div className={styles.pagination}>
                  <Pagination
                    count={this.state.paginCount}
                    onChange={this.changePagin.bind(this)}
                  />
                </div>
              </div>
            )}
            <div className={styles.cooperation}>
              <h1 className={styles.title}>Сотрудничество</h1>
              <p>
                Итак, вы ищете профессионального, коммуникабельного и
                пунктуального frontend-разработчика с навыками
                веб-программирования для вашего следующего проекта?
              </p>
              <p>
                Я всегда открыт к интересным задачам и буду рада сотрудничеству.
                <br />
                Стремлюсь получить качественный результат и внимательно отношусь
                к мелочам, работа будет выполнена точно в соответствии с Вашим
                ТЗ и пожеланиями. Постоянно пополняю багаж навыков, изучение
                новых инструментов для меня не проблема.
              </p>
              <a
                className={styles.cooperationLink}
                href={"mailto:mmmorgenalll@gmail.com"}
              >
                mmmorgenalll@gmail.com
              </a>
            </div>
          </div>
          <Footer userName={this.state.userName} />
        </div>
      );
    }
  }
}

export default App;
