import axios from 'axios';
import React, { Component } from 'react';
import Alert from './components/Alert/Alert';
import Button from './components/Button/Button';
import CheckboxList from './components/CheckboxList/CheckboxList';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ResultLink from './components/ResultLink/ResultLink';
import ShortLink from './components/ShortLink/ShortLink';
import Tabs from './components/Tabs/Tabs';
import TargetUrl from './components/TargetUrl/TargetUrl';
import Text from './components/Text/Text';
import UtmList from './components/UtmList/UtmList';

let userThemeIsDarkTheme = localStorage.getItem('userTheme')
  ? JSON.parse(localStorage.getItem('userTheme'))
  : false;

export function generateUtmFields(index, defaultValue, promptValue) {
  let headingValue, utmValue, placeholderValue, popoverValue;

  switch (index) {
    case 1:
      headingValue = 'Источник компании';
      utmValue = 'utm_source';
      placeholderValue = 'yandex, google, fb, vk ...';
      popoverValue = {
        title: 'utm_source — название рекламной площадки',
        text: 'Этот параметр используется, чтобы указать название источника трафика. Например, utm_source=google – контекстная реклама в Google Adwords; utm_source=yandex — контекстная реклама в Яндекс.Директ',
      };
      break;
    case 2:
      headingValue = 'Тип трафика';
      utmValue = 'utm_medium';
      placeholderValue = 'cpc, cpm, banner, email...';
      popoverValue = {
        title: 'utm_medium — тип рекламы',
        text: 'Рекомендуем использовать в этом параметре общепринятые значения. Расшифруем некоторые из них: cpc (cost per click) — контекстная реклама с оплатой за клик, cpa — (cost per action) плата за действие, banner — медийная или баннерная реклама с оплатой за показы, email — рассылка на электронную почту и др.',
      };
      break;
    case 3:
      headingValue = 'Название кампании';
      utmValue = 'utm_campaign';
      placeholderValue = 'promo, sale, моя компания';
      popoverValue = {
        title: 'utm_campaign — название кампании',
        text: 'Для вашего удобства в этом обязательном параметре рекомендуется описывать важные характеристики компании. Это поможет вам легче различать рекламные компании. Например: utm_campaign=auto_female_24-45_mobile – рекламная кампания автомобилей для пользователей мобильных устройств, женщин в возрасте от 24 до 45 лет.',
      };
      break;
    case 4:
      headingValue = 'Идентификатор объявления';
      utmValue = 'utm_content';
      placeholderValue = 'yandex, google, fb...';
      popoverValue = {
        title:
          'utm_content — дополнительная информация, которую можно отслеживать, если совпадают другие параметры',
        text: 'В этом параметре можно указать важные характеристики объявления или динамические переменные. Например, можно указать подкатегорию товара или услуги, название картинки используемой в креативе, разрешение рекламного баннера и др. Пример: utm_content=banner_apple_250×70 — баннер с изображением яблока и разрешением 250 на 70 пикселей',
      };
      break;
    case 5:
      headingValue = 'Ключевое слово';
      utmValue = 'utm_term';
      placeholderValue = 'landing, banner_size_450x800...';
      popoverValue = {
        title: 'utm_term — ключевое слово',
        text: 'Этот необязательный параметр поможет вам отличить одно рекламное объявление от другого в статистике. В него удобно подставлять автоматически-генерируемые рекламными площадками динамические параметры. Пример: utm_term={keyword} — Яндекс.Директ автоматически подставит вместо {keyword} ключевое слово, по которому было показано объявление.',
      };
      break;
    default:
      headingValue = 'Ошибка';
      utmValue = 'Ошибка';
      placeholderValue = 'Ошибка';
      popoverValue = {
        title: 'Ошибка',
        text: 'Ошибка',
      };
  }

  return {
    heading: headingValue,
    id: index,
    utm: utmValue,
    placeholder: placeholderValue,
    defaultValue: defaultValue,
    value: defaultValue,
    prompt: promptValue,
    popover: popoverValue,
  };
}

class App extends Component {
  state = {
    isDarkTheme: userThemeIsDarkTheme,
    isHttp: true,
    checkedSource: 'Свои значения',
    targetUrl: null,
    transliteration: false,
    utmFields: [
      {
        name: 'Свои значения',
        fields: [
          generateUtmFields(1, '', ''),
          generateUtmFields(2, '', ''),
          generateUtmFields(3, '', ''),
          generateUtmFields(4, '', ''),
          generateUtmFields(5, '', ''),
        ],
      },
      {
        name: 'Яндекс.Директ',
        fields: [
          generateUtmFields(1, 'yandex', ''),
          generateUtmFields(2, 'cpc', ''),
          generateUtmFields(
            3,
            '{campaign_id}',
            'Вместо {campaign_id} Яндекс.Директ автоматически подставит ID кампании',
          ),
          generateUtmFields(
            4,
            '{ad_id}_{source}',
            'Вместо {ad_id} Яндекс.Директ автоматически подставит ID объявления, а {source} заменит на домен площадки при показе на сайте РСЯ; none — при показе на поиске Яндекса',
          ),
          generateUtmFields(
            5,
            '{keyword}',
            'Вместо {keyword} Яндекс.Директ автоматически подставит ключевое слово',
          ),
        ],
      },
      {
        name: 'Google Adwords',
        fields: [
          generateUtmFields(1, 'google', ''),
          generateUtmFields(2, 'cpc', ''),
          generateUtmFields(
            3,
            '{network}',
            'Вместо {network} система подставит "g" (поиск google), "s" (поисковый партнер) или "d" (КМС)',
          ),
          generateUtmFields(
            4,
            '{creative}',
            'Вместо {creative} Google Adwords автоматически подставит ID объявления',
          ),
          generateUtmFields(
            5,
            '{keyword}',
            'Вместо {keyword} Google Adwords автоматически подставить ключевое слово',
          ),
        ],
      },
      {
        name: 'Вконтакте',
        fields: [
          generateUtmFields(1, 'vkontakte', ''),
          generateUtmFields(2, 'cpc', ''),
          generateUtmFields(
            3,
            '{campaign_id}',
            'VK автоматически заменит {campaign_id} на ID рекламной кампании',
          ),
          generateUtmFields(
            4,
            '{ad_id}',
            'VK автоматически заменит {ad_id} на ID объявления',
          ),
          generateUtmFields(5, '', ''),
        ],
      },
      {
        name: 'Facebook',
        fields: [
          generateUtmFields(1, 'facebook', ''),
          generateUtmFields(2, 'cpc', ''),
          generateUtmFields(
            3,
            '{{campaign.name}}',
            'Вместо {{campaign.name}} Facebook автоматически подставит имя кампании',
          ),
          generateUtmFields(
            4,
            '{{ad.name}}',
            'Вместо {{ad.name}} Facebook автоматически подставит название объявления',
          ),
          generateUtmFields(5, '', ''),
        ],
      },
      {
        name: 'myTarget',
        fields: [
          generateUtmFields(1, 'mytarget', ''),
          generateUtmFields(2, 'cpc', ''),
          generateUtmFields(
            3,
            '{{campaign_id}}',
            'Вместо {{campaign_id}} автоматически подставится ID кампании',
          ),
          generateUtmFields(
            4,
            '{{banner_id}}',
            'Вместо {{banner_id}} автоматически подставится ID объявления',
          ),
          generateUtmFields(
            5,
            '{{geo}}.{{gender}}.{{age}}',
            'Вместо {{geo}}.{{gender}}.{{age}} автоматически подставится ID региона, пол и возраст кликнувшего по рекламе',
          ),
        ],
      },
      {
        name: 'Instagram',
        fields: [
          generateUtmFields(1, 'instagram', ''),
          generateUtmFields(2, 'cpc', ''),
          generateUtmFields(3, '', ''),
          generateUtmFields(4, '', ''),
          generateUtmFields(5, '', ''),
        ],
      },
    ],
    alertState: {
      visible: false,
      payload: {
        type: 'danger',
        heading: 'Заголовок алерта!',
        message:
          'Сообщение об ошибке. Сообщение об ошибке. Сообщение об ошибке. Сообщение об ошибке.',
      },
    },
    resultLink: '',
    shortLink: '',
  };

  checkboxes = this.state.utmFields.map((source) => source.name);

  copied = false;

  themeToggle = () => {
    this.setState({
      isDarkTheme: !this.state.isDarkTheme,
    });

    localStorage.setItem('userTheme', JSON.stringify(!this.state.isDarkTheme));
  };

  protocolHandler = () => {
    this.setState({
      isHttp: !this.state.isHttp,
    });
  };

  targetUrlHandler = (value) => {
    this.setState({
      targetUrl: value,
    });

    if (this.state.alertState.visible) this.alertClose();
  };

  changeCheckedSource = (sourceName) => {
    this.setState({
      checkedSource: sourceName,
    });
  };

  getSourceFields = (array, sourceName) => {
    const targetSource = array.filter((source) => source.name === sourceName); // "Нам вернулся массив с одним единственным нужным нам объектом"

    return targetSource[0].fields;
  };

  changeSourceFieldsValue = (sourceName, id, newValue) => {
    const utmFieldsCopy = this.state.utmFields.concat();

    const sourceFields = this.getSourceFields(utmFieldsCopy, sourceName);

    const targetField = sourceFields.filter((field) => field.id === id);

    targetField[0].value = newValue;

    this.setState({
      utmFields: utmFieldsCopy,
    });
  };

  clearSourceFieldsValues = () => {
    const utmFieldsCopy = this.state.utmFields.concat();

    const sourceFields = this.getSourceFields(
      utmFieldsCopy,
      this.state.checkedSource,
    );

    const newFields = sourceFields.map((field) => {
      let defaultValue = field.defaultValue;
      field.value = defaultValue;
      return field;
    });

    const index = utmFieldsCopy.findIndex(
      (item) => item.name === this.state.checkedSource,
    );

    utmFieldsCopy[index].fields = newFields;

    // Более правильная реализация выше
    this.setState({
      utmFields: utmFieldsCopy,
      resultLink: '',
      shortLink: '',
    });
  };

  showAlert = (type, heading, message) => {
    const alertStateCopy = Object.assign({}, this.state.alertState);

    alertStateCopy.visible = true;
    alertStateCopy.payload.type = type;
    alertStateCopy.payload.heading = heading;
    alertStateCopy.payload.message = message;

    this.setState({
      alertState: alertStateCopy,
    });
  };

  alertClose = () => {
    const alertStateCopy = Object.assign({}, this.state.alertState);

    alertStateCopy.visible = false;

    this.setState({
      alertState: alertStateCopy,
    });
  };

  transliterationChange = () => {
    this.setState({
      transliteration: !this.state.transliteration,
    });
  };

  createShortLink = async (longUrl) => {
    try {
      const response = await axios.get('https://clck.ru/--?url=' + longUrl);

      this.setState({
        shortLink: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  createResultLink = () => {
    if (!this.state.targetUrl) {
      this.showAlert('danger', 'Ошибка!', `Вы не указали целевую страницу!`);
      return;
    }

    let targetUrl = this.state.targetUrl.replace(/\s+/g, '');

    // Проверяем корректность целевой страницы и выдаем ошибку в случае некорректного домена

    let regexp =
      /(^(http:\/\/|https:\/\/|[a-zA-Z0-9_])(([a-zA-Z0-9_]|(?<!-)-){1,62}(?<!-)\.(?!-))+[a-zA-Z0-9]+(\/[^?\s*:><|'"]*)?(?<!\/)[/a-z0-9]$)|(^(http:\/\/|https:\/\/|[а-яА-Я0-9_])(([а-яА-Я0-9_]|(?<!-)-){1,62}(?<!-)\.(?!-))+[а-яА-Я0-9]+(\/[^?\s*:><|'"]*)?(?<!\/)[/fа-я0-9]$)/i;

    // let regexp = /(^(http:\/\/|https:\/\/|[a-zA-Z0-9_])(([a-zA-Z0-9_]|(?<!-)-){1,62}(?<!-)\.(?!-))+[a-zA-Z0-9]+(\/[^?\s*:><|'"]*)?(?<!\/)[\/a-z0-9]$)|(^(http:\/\/|https:\/\/|[а-яА-Я0-9_])(([а-яА-Я0-9_]|(?<!-)-){1,62}(?<!-)\.(?!-))+[а-яА-Я0-9]+(\/[^?\s*:><|'"]*)?(?<!\/)[\/fа-я0-9]$)/i

    if (!regexp.test(targetUrl)) {
      this.showAlert(
        'danger',
        'Ошибка!',
        `Введен некорректный адрес целевой страницы. Адрес целевой страницы не должен содержать символы: ?  \\  :  "  '  --  >  <  *  Исправьте адрес целевой страницы.`,
      );
    }

    // Если перед ссылкой не указан протокол, то берем его из значения поля this.state.isHttp и подставляем в начало формируемой ссылки

    if (!/^(http:\/\/|https:\/\/)/i.test(targetUrl)) {
      const protocol = this.state.isHttp ? 'http://' : 'https://';

      targetUrl = protocol + targetUrl;
    }

    // Компонируем хвост из данных стейта

    const fields = this.getSourceFields(
      this.state.utmFields,
      this.state.checkedSource,
    );

    const utmValueEncoder = (parameterValue, transliteration) => {
      // Заменяет пробелы и & в метках на +.

      let value = parameterValue.replace(/(\s+|&+)/gim, '+');

      // Автоматическая замена символов мешающих аналитике #, = на дефис

      value = value.replace(/(#+|=+)/gim, '-');

      // Переводит все буквы в нижний регистр.

      value = value.toLowerCase();

      // Если пользователь выбрал транслитерацию параметров, то производим ее и заменяем все спецсимволы на дефис

      if (transliteration) {
        const a = {
          Ё: 'YO',
          Й: 'I',
          Ц: 'TS',
          У: 'U',
          К: 'K',
          Е: 'E',
          Н: 'N',
          Г: 'G',
          Ш: 'SH',
          Щ: 'SCH',
          З: 'Z',
          Х: 'H',
          Ъ: "'",
          ё: 'yo',
          й: 'i',
          ц: 'ts',
          у: 'u',
          к: 'k',
          е: 'e',
          н: 'n',
          г: 'g',
          ш: 'sh',
          щ: 'sch',
          з: 'z',
          х: 'h',
          ъ: "'",
          Ф: 'F',
          Ы: 'I',
          В: 'V',
          А: 'a',
          П: 'P',
          Р: 'R',
          О: 'O',
          Л: 'L',
          Д: 'D',
          Ж: 'ZH',
          Э: 'E',
          ф: 'f',
          ы: 'i',
          в: 'v',
          а: 'a',
          п: 'p',
          р: 'r',
          о: 'o',
          л: 'l',
          д: 'd',
          ж: 'zh',
          э: 'e',
          Я: 'Ya',
          Ч: 'CH',
          С: 'S',
          М: 'M',
          И: 'I',
          Т: 'T',
          Ь: "'",
          Б: 'B',
          Ю: 'YU',
          я: 'ya',
          ч: 'ch',
          с: 's',
          м: 'm',
          и: 'i',
          т: 't',
          ь: "'",
          б: 'b',
          ю: 'yu',
        };

        function transliterate(word) {
          return word
            .split('')
            .map(function (char) {
              return a[char] || char;
            })
            .join('');
        }

        value = transliterate(value);

        value = value.replace(/[^_a-z}{0-9+-]/gim, '');
      } else {
        // Если это не параметр динамической вставки с символами } и {
        value = encodeURI(value).replace(/%7B/g, '{').replace(/%7D/g, '}'); // Если пользователь не выбирал транслитерацию, то для кодирования кириллицы используем эскейп последовательности
      }

      return value;
    };

    const parameters = fields
      .reduce((resultString, field, i) => {
        let checkedValue = utmValueEncoder(
          field.value,
          this.state.transliteration,
        );

        let str = '';

        if (field.value !== '') {
          str = field.utm + '=' + checkedValue + '&';
        }

        return (resultString += str);
      }, '?')
      .replace(/&$/i, '');

    // Соединяем хвост и целевую страницу

    const preResultUrl = targetUrl + parameters;

    const resultUrl = new URL(preResultUrl);

    // Создаем сокращенную ссылку

    this.createShortLink(resultUrl);

    // Записываем итоговую ссылку в стейт

    this.setState({
      resultLink: resultUrl,
    });
  };

  resultLinkChange = (e) => {
    this.setState({
      resultLink: e.target.value,
    });
  };

  shortLinkChange = (e) => {
    this.setState({
      shortLink: e.target.value,
    });
  };

  copyResultLink = (id) => {
    let input;

    try {
      input = document.getElementById(id);
    } catch (e) {
      console.log('Элемент input не найден', e.message);
    }

    if (input && input.value) {
      input.select();

      document.execCommand('copy');

      this.copied = true;

      this.showAlert('success', 'Ссылка успешно скопирована!');

      setTimeout(() => {
        this.alertClose();
        this.copied = false;
      }, 2000);
    } else {
      this.copied = true;

      this.showAlert('warning', 'Поле не должно быть пустым!');

      setTimeout(() => {
        this.alertClose();
        this.copied = false;
      }, 2000);
    }
  };

  render() {
    return (
      <div className={this.state.isDarkTheme ? 'darkTheme' : ''}>
        <div className="container">
          <Header
            themeToggle={this.themeToggle}
            darkTheme={this.state.isDarkTheme}
          />

          <Alert
            alert={this.state.alertState}
            alertClose={this.alertClose}
            copied={this.copied}
          />

          <h2 className="mt-5 mb-4">Адрес целевой страницы</h2>

          <TargetUrl
            isHttp={this.state.isHttp}
            protocolHandler={this.protocolHandler}
            targetUrlHandler={this.targetUrlHandler}
          />

          <hr />

          <CheckboxList
            checkboxes={this.checkboxes}
            checkedSource={this.state.checkedSource}
            changeCheckedSource={this.changeCheckedSource}
          />

          <hr />

          <UtmList
            utmFields={this.state.utmFields}
            checkedSource={this.state.checkedSource}
            changeSourceFieldsValue={this.changeSourceFieldsValue}
            translitHandler={this.transliterationChange}
          />

          <hr />

          <Button
            type={'primary'}
            text={'Сгенерировать ссылку'}
            handler={this.createResultLink}
          />

          <Button
            type={'info'}
            text={'Очистить форму'}
            handler={this.clearSourceFieldsValues}
          />

          <hr />

          <h2 className="mt-5 mb-4">Результаты появятся здесь</h2>

          <Alert
            alert={this.state.alertState}
            alertClose={this.alertClose}
            copied={!this.copied}
          />

          <ResultLink
            text={'Здесь появится ссылка с метками'}
            title={'Сгенерированная ссылка'}
            resultLink={this.state.resultLink}
            resultLinkChange={this.resultLinkChange}
            copyResultLink={this.copyResultLink}
          />

          <ShortLink
            text={'Здесь появится укороченная ссылка'}
            title={'Укороченная ссылка'}
            shortLink={this.state.shortLink}
            shortLinkChange={this.shortLinkChange}
            copyResultLink={this.copyResultLink}
          />

          <hr />

          <h2 className="mt-5 mb-4">
            Динамические переменные и их использование
          </h2>

          <Tabs />

          <h2 className="mt-5 mb-4">Автоматическое исправление ошибок</h2>

          <Text />

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
