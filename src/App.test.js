import React from 'react';
import App, { generateUtmFields } from './App';

// jest.mock('axios');

describe('<App />', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
  });

  describe('Component render.', () => {
    it('Should App component render', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('Utils testing', () => {
    it('Should "generateUtmFields" return object with true params', () => {
      expect(
        generateUtmFields(2, 'тестовый параметр 1', 'тестовый параметр 2'),
      ).toMatchObject({
        heading: 'Тип трафика',
        id: 2,
        utm: 'utm_medium',
        placeholder: 'cpc, cpm, banner, email...',
        defaultValue: 'тестовый параметр 1',
        value: 'тестовый параметр 1',
        prompt: 'тестовый параметр 2',
        popover: {
          title: 'utm_medium — тип рекламы',
          text: 'Рекомендуем использовать в этом параметре общепринятые значения. Расшифруем некоторые из них: cpc (cost per click) — контекстная реклама с оплатой за клик, cpa — (cost per action) плата за действие, banner — медийная или баннерная реклама с оплатой за показы, email — рассылка на электронную почту и др.',
        },
      });
    });
  });

  describe('Component handlers testing', () => {
    it('Should "themeToggle" switch app theme', () => {
      wrapper.setState({
        isDarkTheme: false,
      });
      instance.themeToggle();
      expect(wrapper.state().isDarkTheme).toBeTruthy();
      instance.themeToggle();
      expect(wrapper.state().isDarkTheme).toBeFalsy();
    });

    it('Should "protocolHandler" switch protocol type', () => {
      wrapper.setState({
        isHttp: true,
      });
      instance.protocolHandler();
      expect(wrapper.state().isHttp).toBeFalsy();
      instance.themeToggle();
      expect(wrapper.state().isDarkTheme).toBeTruthy();
    });

    it('Should "targetUrlHandler" change targetUrl', () => {
      instance.targetUrlHandler('test-value');
      expect(wrapper.state().targetUrl).toBe('test-value');
    });

    it('Should "targetUrlHandler" close active alert', () => {
      wrapper.setState({
        alertState: {
          visible: true,
          payload: {
            type: 'danger',
            heading: 'Заголовок алерта!',
            message:
              'Сообщение об ошибке. Сообщение об ошибке. Сообщение об ошибке. Сообщение об ошибке.',
          },
        },
      });
      instance.targetUrlHandler('value');
      expect(wrapper.state().alertState.visible).toBeFalsy();
    });

    it('Should "changeCheckedSource" change checkedSource', () => {
      instance.changeCheckedSource('test-value');
      expect(wrapper.state().checkedSource).toBe('test-value');
    });

    it('Should "getSourceFields" return target object', () => {
      const testArray = [
        { name: 'yandex', fields: 'yandex-fields' },
        { name: 'google', fields: 'google-fields' },
        { name: 'facebook', fields: 'facebook-fields' },
      ];
      const fields = instance.getSourceFields(testArray, 'google');
      expect(fields).toBe('google-fields');
    });

    it('Should "changeSourceFieldsValue" change soure fields value', () => {
      instance.changeSourceFieldsValue('Яндекс.Директ', 2, 'test-value');
      const sourceObj = wrapper
        .state()
        .utmFields.filter((source) => source.name === 'Яндекс.Директ')[0];
      const fieldValue = sourceObj.fields.filter((field) => field.id === 2)[0]
        .value;
      expect(fieldValue).toBe('test-value');
    });

    // it('Should "clearSourceFieldsValues" clear soure fields value', () => {
    // 	instance.changeSourceFieldsValue('Яндекс.Директ', 2, 'test-value')
    // 	instance.clearSourceFieldsValues()
    // 	const sourceObj2 = wrapper.state().utmFields.filter(source => source.name === 'Яндекс.Директ')[0]
    // 	const fieldValue2 = sourceObj2.fields.filter(field => field.id === 2)[0].value
    // 	expect(fieldValue2).toBe('cpc')
    // })

    it('Should "clearSourceFieldsValues" clear resultLink value in state', () => {
      wrapper.setState({
        resultLink: 'test-link',
      });
      expect(wrapper.state().resultLink).toBe('test-link');
      instance.clearSourceFieldsValues();
      expect(wrapper.state().resultLink).toBe('');
    });

    it('Should "showAlert" show alert with true payload data', () => {
      instance.showAlert(
        'danger',
        'Тестовый заголовок алерта',
        'Тестовое сообщение алерта',
      );
      expect(wrapper.state().alertState.visible).toBeTruthy();
      expect(wrapper.state().alertState.payload.type).toBe('danger');
      expect(wrapper.state().alertState.payload.heading).toBe(
        'Тестовый заголовок алерта',
      );
      expect(wrapper.state().alertState.payload.message).toBe(
        'Тестовое сообщение алерта',
      );
    });

    it('Should "alertClose" close alert', () => {
      instance.showAlert(
        'danger',
        'Тестовый заголовок алерта',
        'Тестовое сообщение алерта',
      );
      instance.alertClose();
      expect(wrapper.state().alertState.visible).not.toBeTruthy();
    });

    it('Should "transliterationChange" change alert', () => {
      wrapper.setState({
        transliteration: false,
      });
      instance.showAlert(
        'danger',
        'Тестовый заголовок алерта',
        'Тестовое сообщение алерта',
      );
      instance.alertClose();
      expect(wrapper.state().alertState.visible).not.toBeTruthy();
    });

    describe('createResultLink handler deep testing', () => {
      beforeEach(() => {
        wrapper.setState({
          checkedSource: 'Яндекс.Директ',
        });
      });

      it('Should "createResultLink" call "showAlert" handler if targetUrl is empty', () => {
        expect(wrapper.state().alertState.visible).toBeFalsy();
        wrapper.setState({
          targetUrl: '',
        });
        instance.createResultLink();
        expect(wrapper.state().alertState.visible).toBeTruthy();
      });

      it('Should "createResultLink" check on error', () => {
        wrapper.setState({ targetUrl: 'http://site.com' });
        instance.createResultLink();
        expect(wrapper.state().resultLink.toString()).toBe(
          'http://site.com/?utm_source=yandex&utm_medium=cpc&utm_campaign={campaign_id}&utm_content={ad_id}_{source}&utm_term={keyword}',
        );
      });

      it('Should "createResultLink" check on error with TRUE links', () => {
        const trueLinks = [
          'domain.com',
          'ee-xamp-le.domain.com',
          'example.domain-hyphen.sds-dsdsd.com',
          'www.domain.com',
          'http://example.com',
          'example.com/parameter',
          '_example.ru',
          'example.ru/sd/max.html',
          'https://yandex.ru/news/story/Sobyanin_nazval_sroki_prinyatiya_novykh_reshenij_po_ogranicheniyam_v_Moskve--77d31749bdaea0631c01985887a20b50',
          'aliexpress.ru/item/1005001302016003.html',
          'https://www.tripadvisor.ru/Hotel_Review-g297966-d302366-Reviews-Asdem_Park_Hotel-Kemer_Turkish_Mediterranean_Coast.html',
          'https://www.instagram.com/asdemparkofficial/',
          'жк-фараон.рф',
        ];

        for (let i = 0; i < trueLinks.length; i++) {
          wrapper.setState({ targetUrl: trueLinks[i] });
          instance.createResultLink();
          expect(wrapper.state().alertState.visible).toBeFalsy();
        }
      });

      it('Should "createResultLink" check on error with WRONG links', () => {
        const wrongLinks = [
          'subdomain.-example.com',
          'example..com/parameter',
          'example.com?anything',
          '-example.ru',
          'example-.ru',
          'example.ru-',
          '.example.ru',
          'жк-faraon.com',
          'domain&.com',
          'domain,.com',
          'domain/.com',
          'examp--le.ru/sdppp/',
          'example.ru--sad.asdasd',
          'examplllllllllllllllllllllllllllllllllllllllllllllllllllllllllll.ru',
          'examp--le.ru/sdppp//',
        ];

        for (let i = 0; i < wrongLinks.length; i++) {
          wrapper.setState({ targetUrl: wrongLinks[i] });
          instance.createResultLink();
          expect(wrapper.state().alertState.visible).toBeTruthy();
        }
      });

      it('Should "createResultLink" set true "http" protocol', () => {
        const httpLinks = ['http://site.com', 'site.com'];
        wrapper.setState({ isHttp: true });
        for (let i = 0; i < httpLinks.length; i++) {
          wrapper.setState({ targetUrl: httpLinks[i] });
          instance.createResultLink();
          expect(wrapper.state().resultLink.toString()).toBe(
            'http://site.com/?utm_source=yandex&utm_medium=cpc&utm_campaign={campaign_id}&utm_content={ad_id}_{source}&utm_term={keyword}',
          );
        }
      });

      it('Should "createResultLink" set true "https" protocol', () => {
        const httpsLinks = ['https://site.com', 'site.com'];
        wrapper.setState({ isHttp: false });
        for (let i = 0; i < httpsLinks.length; i++) {
          wrapper.setState({ targetUrl: httpsLinks[i] });
          instance.createResultLink();
          expect(wrapper.state().resultLink.toString()).toBe(
            'https://site.com/?utm_source=yandex&utm_medium=cpc&utm_campaign={campaign_id}&utm_content={ad_id}_{source}&utm_term={keyword}',
          );
        }
      });
      it('Should "createResultLink" replace " " and "&" on "+"', () => {
        const params = ['new value', 'new   value', 'new&value'];
        for (let i = 0; i < params.length; i++) {
          wrapper.setState({ targetUrl: 'http://site.com' });
          instance.changeSourceFieldsValue('Яндекс.Директ', 1, params[i]);
          instance.createResultLink();
          expect(wrapper.state().resultLink.toString()).toBe(
            'http://site.com/?utm_source=new+value&utm_medium=cpc&utm_campaign={campaign_id}&utm_content={ad_id}_{source}&utm_term={keyword}',
          );
        }
      });

      it('Should "createResultLink" replace "=" and "#" on "-"', () => {
        const params = ['test#value', 'test=value'];
        for (let i = 0; i < params.length; i++) {
          wrapper.setState({ targetUrl: 'http://site.com' });
          instance.changeSourceFieldsValue('Яндекс.Директ', 1, params[i]);
          instance.createResultLink();
          expect(wrapper.state().resultLink.toString()).toBe(
            'http://site.com/?utm_source=test-value&utm_medium=cpc&utm_campaign={campaign_id}&utm_content={ad_id}_{source}&utm_term={keyword}',
          );
        }
      });

      it('Should "createResultLink" convert all letters to lowercase', () => {
        const params = ['TesT-vaLue', 'TEST-VALUE'];
        for (let i = 0; i < params.length; i++) {
          wrapper.setState({ targetUrl: 'http://site.com' });
          instance.changeSourceFieldsValue('Яндекс.Директ', 1, params[i]);
          instance.createResultLink();
          expect(wrapper.state().resultLink.toString()).toBe(
            'http://site.com/?utm_source=test-value&utm_medium=cpc&utm_campaign={campaign_id}&utm_content={ad_id}_{source}&utm_term={keyword}',
          );
        }
      });

      it('Should "createResultLink" transliterate params if set "transliteration: true" in state', () => {
        const params = ['тестовый-параметр', 'ТЕСТОВЫЙ-параметр'];
        wrapper.setState({ transliteration: true });
        for (let i = 0; i < params.length; i++) {
          wrapper.setState({ targetUrl: 'http://site.com' });
          instance.changeSourceFieldsValue('Яндекс.Директ', 1, params[i]);
          instance.createResultLink();
          expect(wrapper.state().resultLink.toString()).toBe(
            'http://site.com/?utm_source=testovii-parametr&utm_medium=cpc&utm_campaign={campaign_id}&utm_content={ad_id}_{source}&utm_term={keyword}',
          );
        }
      });

      it('Should "createResultLink" use escape sequences if "transliteration: false" in state', () => {
        const params = ['тестовый-параметр', 'ТЕСТОВЫЙ-параметр'];
        wrapper.setState({ transliteration: false });
        for (let i = 0; i < params.length; i++) {
          wrapper.setState({ targetUrl: 'http://site.com' });
          instance.changeSourceFieldsValue('Яндекс.Директ', 1, params[i]);
          instance.createResultLink();
          expect(wrapper.state().resultLink.toString()).toBe(
            'http://site.com/?utm_source=%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D1%8B%D0%B9-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80&utm_medium=cpc&utm_campaign={campaign_id}&utm_content={ad_id}_{source}&utm_term={keyword}',
          );
        }
      });

      it('Should "createShortLink" create short link', async () => {
        await instance.createShortLink('http://site.com/some-inform');
        expect(wrapper.state().shortLink.indexOf('https://clck.ru')).not.toBe(
          -1,
        );
      });
    });

    it('Should "resultLinkChange" change "resultLink" in state', () => {
      wrapper.setState({ resultLink: '' });
      instance.resultLinkChange({ target: { value: 'test-value' } });
      expect(wrapper.state().resultLink).toBe('test-value');
    });

    it('Should "shortLinkChange" change "shortLink" in state', () => {
      wrapper.setState({ shortLink: '' });
      instance.shortLinkChange({ target: { value: 'test-value' } });
      expect(wrapper.state().shortLink).toBe('test-value');
    });

    it('Should "copyResultLink" copy alert', () => {
      expect(wrapper.state().alertState.visible).toBeFalsy();
      wrapper.setState({ resultLink: 'some-result-link' });
      instance.copyResultLink('test-id');
      expect(wrapper.state().alertState.visible).toBeTruthy();
    });
  });
});
