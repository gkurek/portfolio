<script setup lang="ts">
import './styles/fonts.css';
import './styles/icon-font.css';
import { site } from '../../config/site';

const imageModules = import.meta.glob<string>('./assets/img/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const img = (file: string) => imageModules[`./assets/img/${file}`] ?? '';
const linkedInUrl = site.social.find((social) => social.id === 'linkedin')?.url ?? '#';
</script>

<template>
  <div class="natours">
    <div class="navigation">
      <input id="navi-toggle" type="checkbox" class="navigation__checkbox" />

      <label for="navi-toggle" class="navigation__button">
        <span class="navigation__icon">&nbsp;</span>
      </label>

      <div class="navigation__background">&nbsp;</div>

      <nav class="navigation__nav">
        <ul class="navigation__list">
          <li class="navigation__item">
            <img :src="img('myFace.png')" alt="logo" class="header__logo-nav" />
            <a href="#" class="navigation__link"><span>01</span> face nav 1</a>
          </li>
          <li class="navigation__item">
            <img :src="img('myFace.png')" alt="logo" class="header__logo-nav" />
            <a href="#" class="navigation__link"><span>02</span> face nav 2</a>
          </li>
          <li class="navigation__item">
            <img :src="img('myFace.png')" alt="logo" class="header__logo-nav" />
            <a href="#" class="navigation__link"><span>03</span> face nav 3</a>
          </li>
          <li class="navigation__item">
            <img :src="img('myFace.png')" alt="logo" class="header__logo-nav" />
            <a href="#" class="navigation__link"><span>04</span> face nav 56</a>
          </li>
        </ul>
      </nav>
    </div>

    <header class="header">
      <div class="header__logo-box">
        <img :src="img('myFace.png')" alt="logo" class="header__logo" />
      </div>
      <div class="header__text-box">
        <h1 class="heading-primary">
          <span class="heading-primary--main">this&nbsp;page</span>
          <span class="heading-primary--sub">looks so good, wow!</span>
        </h1>
        <a href="#" class="btn btn--white btn--animated">scroll down for css magic</a>
      </div>
    </header>

    <main>
      <section class="section-about">
        <div class="u-center-text u-margin-bottom-big">
          <h2 class="heading-secondary">Check this crazy animation effect!</h2>
        </div>

        <div class="row">
          <div class="col-1-of-2">
            <h3 class="heading-tertiary u-margin-bottom-small">
              Here, some random mountain pics, because why not?
            </h3>
            <p class="paragraph">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur qui eius
              suscipit corporis natus aperiam obcaecati? Exercitationem cupiditate aliquam iste
              ratione dicta, accusantium tempora, architecto libero, similique beatae ut earum.
            </p>

            <h3 class="heading-tertiary u-margin-bottom-small">
              And some mad css skills to make them look pro
            </h3>
            <p class="paragraph">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur qui eius
              suscipit corporis natus aperiam obcaecati? Exercitationem cupiditate aliquam,
              similique beatae ut earum.
            </p>
            <a href="#" class="btn-text">Nothing there &rarr;</a>
          </div>
          <div class="col-1-of-2">
            <div class="composition">
              <img
                :srcset="`${img('nat-1.jpg')} 300w, ${img('nat-1-large.jpg')} 1000w`"
                sizes="(max-width:900px 20vw, (max-width: 600px) 30vw, 300px"
                :src="img('nat-1-large.jpg')"
                alt="Photo 1"
                class="composition__photo composition__photo--p1"
              />
              <img
                :srcset="`${img('nat-2.jpg')} 300w, ${img('nat-2-large.jpg')} 1000w`"
                sizes="(max-width:900px 20vw, (max-width: 600px) 30vw, 300px"
                :src="img('nat-2-large.jpg')"
                alt="Photo 2"
                class="composition__photo composition__photo--p2"
              />
              <img
                :srcset="`${img('nat-3.jpg')} 300w, ${img('nat-3-large.jpg')} 1000w`"
                sizes="(max-width:900px 20vw, (max-width: 600px) 30vw, 300px"
                :src="img('nat-3-large.jpg')"
                alt="Photo 3"
                class="composition__photo composition__photo--p3"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="section-features">
        <div class="row">
          <div class="col-1-of-4">
            <div class="feature-box">
              <i class="feature-box__icon icon-basic-world" />
              <h3 class="heading-tertiary">These Icons Here</h3>
              <p class="feature-box__text">
                Yes, you see it right - they have gradient outline! How cool is that? Cool enough
                to repeat it four times I'd say.
              </p>
            </div>
          </div>

          <div class="col-1-of-4">
            <div class="feature-box">
              <i class="feature-box__icon icon-basic-compass" />
              <h3 class="heading-tertiary">These Icons Here</h3>
              <p class="feature-box__text">
                Yes, you see it right - they have gradient outline! How cool is that? Cool enough
                to repeat it four times I'd say.
              </p>
            </div>
          </div>

          <div class="col-1-of-4">
            <div class="feature-box">
              <i class="feature-box__icon icon-basic-map" />
              <h3 class="heading-tertiary">These Icons Here</h3>
              <p class="feature-box__text">
                Yes, you see it right - they have gradient outline! How cool is that? Cool enough
                to repeat it four times I'd say.
              </p>
            </div>
          </div>

          <div class="col-1-of-4">
            <div class="feature-box">
              <i class="feature-box__icon icon-basic-heart" />
              <h3 class="heading-tertiary">These Icons Here</h3>
              <p class="feature-box__text">
                Yes, you see it right - they have gradient outline! How cool is that? Cool enough
                to repeat it four times I'd say.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="section-tours" class="section-tours">
        <div class="u-center-text u-margin-bottom-big">
          <h2 class="heading-secondary">obligatory section with rotating stuff</h2>
        </div>

        <div class="row">
          <div class="col-1-of-3">
            <div class="card">
              <div class="card__side card__side--front">
                <div class="card__picture card__picture--1" />
                <h4 class="card__heading">
                  <span class="card__heading-span card__heading-span--1">the orange version</span>
                </h4>
                <div class="card__details">
                  <ul>
                    <li>rotates</li>
                    <li>wow effect</li>
                    <li>css level: tropical</li>
                    <li>hot summer dream vibe</li>
                    <li>wild island background picture</li>
                  </ul>
                </div>
              </div>
              <div class="card__side card__side--back card__side--back-1">
                <div class="card__cta">
                  <img :src="img('myFace.png')" alt="logo" class="header__logo-rotate" />
                  <div class="card__price-box" />
                  <a href="#popup" class="btn btn--white">oh hello!</a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-1-of-3">
            <div class="card">
              <div class="card__side card__side--front">
                <div class="card__picture card__picture--2" />
                <h4 class="card__heading">
                  <span class="card__heading-span card__heading-span--2">the green version</span>
                </h4>
                <div class="card__details">
                  <ul>
                    <li>also rotates</li>
                    <li>eco version</li>
                    <li>handcrafted with css</li>
                    <li>100% organic nature vibe</li>
                    <li>trees and lakes on the picture</li>
                  </ul>
                </div>
              </div>
              <div class="card__side card__side--back card__side--back-2">
                <div class="card__cta">
                  <img :src="img('myFace.png')" alt="logo" class="header__logo-rotate" />
                  <div class="card__price-box" />
                  <a href="#popup" class="btn btn--white">yes, I'm for hire</a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-1-of-3">
            <div class="card">
              <div class="card__side card__side--front">
                <div class="card__picture card__picture--3" />
                <h4 class="card__heading">
                  <span class="card__heading-span card__heading-span--3">the blue version</span>
                </h4>
                <div class="card__details">
                  <ul>
                    <li>totally rotates</li>
                    <li>twirling effect</li>
                    <li>css k2 approval seal</li>
                    <li>pure and intense peak vibe</li>
                    <li>real snow on the picture</li>
                  </ul>
                </div>
              </div>
              <div class="card__side card__side--back card__side--back-3">
                <div class="card__cta">
                  <img :src="img('myFace.png')" alt="logo" class="header__logo-rotate" />
                  <div class="card__price-box" />
                  <a :href="linkedInUrl" target="_blank" rel="noopener noreferrer" class="btn btn--white">check my linkedin here</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="u-center-text u-margin-top-huge">
          <a href="#" class="btn btn--green">scroll down for more css candies</a>
        </div>
      </section>

      <section class="section-stories">
        <div class="bg-video">
          <video class="bg-video__content" autoplay muted loop playsinline>
            <source :src="img('video.mp4')" type="video/mp4" />
            <source :src="img('video.webm')" type="video/webm" />
            Your browser is not supported!
          </video>
        </div>

        <div class="u-center-text u-margin-bottom-big">
          <h2 class="heading-secondary">Obligatory fake-reviews section</h2>
        </div>

        <div class="row">
          <div class="story">
            <figure class="story__shape">
              <img :src="img('nat-8.jpg')" alt="really happy person" class="story__img" />
              <figcaption class="story__caption">Anna Real</figcaption>
            </figure>
            <div class="story__text">
              <h3 class="heading-tertiary u-margin-bottom-small">
                Wow! This page is better than a canoe ride!
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nam quia
                veritatis sequi dolorem culpa cupiditate, rerum reprehenderit commodi laboriosam
                quisquam fugiat reiciendis dolores nemo saepe explicabo! Non, dolores tenetur?
              </p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="story">
            <figure class="story__shape">
              <img :src="img('nat-9.jpg')" alt="really happy person" class="story__img" />
              <figcaption class="story__caption">John Honest</figcaption>
            </figure>
            <div class="story__text">
              <h3 class="heading-tertiary u-margin-bottom-small">
                really cool page - evidence of some legit skills!
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nam quia
                veritatis sequi dolorem culpa cupiditate, rerum reprehenderit commodi laboriosam
                quisquam fugiat reiciendis dolores nemo saepe explicabo! Non, dolores tenetur?
              </p>
            </div>
          </div>
        </div>

        <div class="u-center-text u-margin-top-huge">
          <a href="#" class="btn-text">You want more? Click! &rarr;</a>
        </div>
      </section>

      <section class="section-book">
        <div class="row">
          <div class="book">
            <div class="book__form">
              <form action="#" class="form">
                <div class="u-margin-bottom-medium">
                  <h2 class="heading-secondary">Like what you see?</h2>
                </div>
                <div class="form__group">
                  <input id="name" type="text" class="form__input" placeholder="Full Name" required />
                  <label for="name" class="form__label">Full name</label>
                </div>
                <div class="form__group">
                  <input
                    id="email"
                    type="email"
                    class="form__input"
                    placeholder="Email address"
                    required
                  />
                  <label for="email" class="form__label">Email address</label>
                </div>

                <div class="form__group u-margin-bottom-medium">
                  <div class="form__radio-group">
                    <input id="small" type="radio" class="form__radio-input" name="size" />
                    <label for="small" class="form__radio-label">
                      <span class="form__radio-button" />
                      Yes I like it
                    </label>
                  </div>
                  <div class="form__radio-group">
                    <input id="large" type="radio" class="form__radio-input" name="size" />
                    <label for="large" class="form__radio-label">
                      <span class="form__radio-button" />
                      Yes, I like it
                    </label>
                  </div>
                </div>

                <div class="form__group">
                  <button type="button" class="btn btn--green">Fake Submit Btn &rarr;</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer__logo-box">
        <img :src="img('myFace.png')" alt="logo" class="header__logo" />
      </div>
      <div class="row">
        <div class="col-1-of-2">
          <div class="footer__navigation">
            <ul class="footer__list">
              <li class="footer__item"><a href="#" class="footer__link">Company</a></li>
              <li class="footer__item"><a href="#" class="footer__link">Contact us</a></li>
              <li class="footer__item"><a href="#" class="footer__link">Carrers</a></li>
              <li class="footer__item"><a href="#" class="footer__link">Privacy policy</a></li>
              <li class="footer__item"><a href="#" class="footer__link">Terms</a></li>
            </ul>
          </div>
        </div>
        <div class="col-1-of-2">
          <p class="footer__copyright">
            Built in 2018 as an excercise during Udemy course by <a href="#" class="footer__link">Jonas Schmedtmann. </a>
          </p>
        </div>
      </div>
    </footer>

    <div id="popup" class="popup">
      <div class="popup__content">
        <div class="popup__left">
          <img :src="img('nat-8.jpg')" alt="tour photo" class="popup__img" />
          <img :src="img('nat-9.jpg')" alt="tour photo" class="popup__img" />
        </div>
        <div class="popup__right">
          <a href="#section-tours" class="popup__close">&times;</a>
          <h2 class="heading-secondary u-margin-bottom-small">Bag full of awesome</h2>
          <h3 class="heading-tertiary u-margin-bottom-small">Btw, this is pure css modal</h3>
          <p class="popup__text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat aut cupiditate sed
            impedit voluptates sint quidem dolorem dolore repellat, neque id maiores quia distinctio
            cum libero mollitia inventore non repellendus?
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './styles/main.scss';
</style>
