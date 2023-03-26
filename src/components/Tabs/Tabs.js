import React, { Fragment } from 'react'

const Tabs = props => {

	const content = {
		height: 'auto',
		boxShadow: 'inset 0px 2px 8px 5px rgba(0, 0, 0, 0.15)',
	}

	const info = () => (
		<Fragment>
			<h4 className="py-3">Что это?</h4>
			<p>Динамические переменные указываются как значения одного из utm-параметров. Рекламная площадка автоматически заменяет эти переменные на дополнительную полезную информацию, например, устройство, через которое пользователь кликнул по рекламной ссылке, или ключевое слово, по которому человек искал объявление.</p>
			<p>Возможность передавать дополнительную информацию через динамические параметры – очень удобная функция, ведь она позволяет маркетологам отслеживать важные данные о переходе по ссылке, которые фиксируются в счетчиках и системах аналитики.</p>
			<p>Например, при использовании метки utm_term=&#123;keyword&#125;, Яндекс.Директ автоматически заменит &#123;keyword&#125; на ключевую фразу, по которой произошел показ объявления, а при использовании метки utm_content=&#123;creative&#125;, Google Adwords автоматически подставит ID объявления, по которому кликнул пользователь.</p>
			<p>Обычно динамические переменные используются в параметре utm_content, но вы можете задать динамические переменные и для других меток и даже комбинировать их, указав сразу два параметра в одной метке.</p>
			<p>Для вашего удобства, наш генератор utm-меток сам прописывает в параметрах часто используемые динамические переменные для различных рекламных площадок. </p>
		</Fragment>
	)
	
	const yandex = () => {
	
		const parametersYandex = [
			{ name: '{ad_id}, {banner_id}', text: 'Идентификатор объявления' },
			{ name: '{addphrases}', text: 'Инициирован ли этот показ дополнительными релевантными фразами. "yes" — показ по дополнительной релевантной фразе. "no" — показ по одной из исходных фраз.' },
			{ name: '{addphrasestext}', text: 'Текст дополнительной релевантной фразы. "текст фразы" — при показе по дополнительной релевантной фразе. "none" — показ не был инициирован дополнительной релевантной фразой.' },
			{ name: '{campaign_type}', text: 'Тип кампании. "type1" — текстово-графические объявления. "type2" — реклама мобильных приложений. "type3" — динамические объявления. "type4" — смарт-баннеры.' },
			{ name: '{campaign_id}', text: 'Идентификатор рекламной кампании' },
			{ name: '{creative_id}', text: 'Идентификатор креатива из конструктора' },
			{ name: '{device_type}', text: 'Тип устройства, на котором произведен показ. "desktop" - стационарный компьютер. "mobile" - мобильное устройство. "tablet" - планшет.' },
			{ name: '{gbid}', text: 'Идентификатор группы' },
			{ name: '{keyword}', text: 'Ключевая фраза, по которой было показано объявление (текстово-графическое или реклама мобильных приложений) (без минус-слов)' },
			{ name: '{phrase_id}', text: 'Идентификатор ключевой фразы для текстово-графических объявлений или рекламы мобильных приложений' },
			{ name: '{retargeting_id}', text: 'Идентификатор условия нацеливания на аудиторию, связывающего группу объявлений с условиями подбора аудитории или интересами к мобильным приложениям' },
			{ name: '{coef_goal_context_id}', text: 'Идентификатор корректировки ставок для условия подбора аудитории' },
			{ name: '{interest_id}', text: 'Идентификатор интереса к мобильным приложениям' },
			{ name: '{adtarget_name}', text: 'Условие нацеливания динамического объявления' },
			{ name: '{adtarget_id}', text: 'Идентификатор условия нацеливания динамического объявления' },
			{ name: '{position}', text: 'Точная позиция объявления в блоке. Передает только номер позиции, по которому невозможно определить тип блока, где показано объявление (используйте вместе с {position_type}). 1) номер позиции в блоке (например, 1); 2) 0 — объявление было показано в сетях (РСЯ или внешние сети)' },
			{ name: '{position_type}', text: 'Тип блока, если показ произошел на странице с результатами поиска Яндекса. "premium" — спецразмещение. "other" — блок справа или блок внизу. "none" — объявление было показано в сетях (РСЯ или внешние сети).' },
			{ name: '{source}', text: 'Место показа. "домен площадки (например, vk.com)" — при показе в сетях (РСЯ или внешние сети). "none" — при показе в поиске Яндекса' },
			{ name: '{source_type}', text: 'Тип площадки, на которой произведен показ объявления. "search" — поиск. "context" — сети' },
			{ name: '{region_name}', text: 'Регион, в котором было показано объявление' },
			{ name: '{region_id}', text: 'Идентификатор региона, в котором было показано объявление' },
		]
	
		return (
			<Fragment>
				<h4 className="py-3">Основные параметры динамической вставки: Яндекс.Директ.</h4>
				<table className="table table-striped">
					<thead>
						<tr>
							<th scope="col">Параметр</th>
							<th scope="col">Что система подставит вместо &#123;параметра&#125;</th>
						</tr>
					</thead>
					<tbody>
						{parametersYandex.map((parameter, i) => {
							return (
								<tr key={'yandex' + i}>
									<th scope="row" className="green-text">{parameter.name}</th>
									<td>{parameter.text}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</Fragment>
		)
	}
	
	const google = () => {
	
		const parametersGoogle = [
			{ name: '{adgroupid}', text: 'Идентификатор группы объявлений. Используйте его, если вы настроили данные отслеживания на уровне аккаунта или кампании и хотите узнать, объявление из какой группы было показано' },
			{ name: '{adposition}', text: 'Позиция объявления на странице. Например, значение 1t2 расшифровывается так: страница 1, показ над результатами поиска (top), позиция 2' },
			{ name: '{campaignid}', text: 'Идентификатор кампании. Используйте его, если вы настроили данные отслеживания на уровне аккаунта и хотите узнать, объявление из какой кампании было показано' },
			{ name: '{creative}', text: 'Уникальный идентификатор объявления' },
			{ name: '{device}', text: 'Тип устройства, с которого поступил клик' },
			{ name: '{feeditemid}', text: '	Идентификатор расширения, на которое нажал пользователь' },
			{ name: '{keyword}', text: 'Ключевое слово, по которому было показано объявление в поисковой сети, или наиболее близкое ключевое слово при показе в контекстно-медийной сети' },
			{ name: '{loc_interest_ms}', text: 'Идентификатор местоположения, указанного в поисковом запросе пользователя' },
			{ name: '{loc_physical_ms}', text: 'Идентификатор географического местоположения, откуда был получен клик' },
			{ name: '{lpurl}', text: 'Конечный URL. Шифруется, если только вы не указали {lpurl} в начале шаблона отслеживания. Если параметр {lpurl} указан не в самом начале шаблона отслеживания, пробел и символы ?, =, ", #, \t, \' и (пробел) заменяются escape-кодами' },
			{ name: '{matchtype}', text: 'Тип соответствия ключевого слова, по которому было показано объявление' },
			{ name: '{merchant_id}', text: 'Идентификатор аккаунта Google Merchant Center, к которому относится товарное объявление.' },
			{ name: '{placement}', text: 'Сайт, где объявление получило клик. Он соответствует заданным вами ключевым словам или условиям таргетинга на места размещения (в зависимости от настроек таргетинга в кампании)' },
			{ name: '{product_channel}', text: 'Тип канала продаж, через который реализуется товар, рекламируемый в объявлении' },
			{ name: '{product_country}', text: 'Страна, в которой продается товар, рекламируемый в объявлении' },
			{ name: '{product_id}', text: 'Идентификатор товара, рекламируемого в объявлении (из фида данных Merchant Center)' },
			{ name: '{product_language}', text: 'Язык, на котором приведена информация о товаре (согласно фиду данных Merchant Center)' },
			{ name: '{product_partition_id}', text: 'Уникальный идентификатор группы товаров, к которой относится объявление' },
			{ name: '{store_code}', text: 'Для кампаний, использующих локальный канал продаж, здесь отображается уникальный код магазина' },
			{ name: '{targetid}', text: 'Идентификатор ключевого слова (kwd), динамического поискового объявления (dsa) или цели списка ремаркетинга (aud). Например, если вы добавите в группу объявлений список ремаркетинга с идентификатором критерия 456 и настроите таргетинг на ключевое слово с идентификатором 123, параметр {targetid} будет заменен на kwd-123:aud-456' },
		]
	
		return (
			<Fragment>
				<h4 className="py-3">Основные параметры динамической вставки: Google Adwords.</h4>
				<table className="table table-striped">
					<thead>
						<tr>
							<th scope="col">Параметр</th>
							<th scope="col">Что система подставит вместо &#123;параметра&#125;</th>
						</tr>
					</thead>
					<tbody>
						{parametersGoogle.map((parameter, i) => {
							return (
								<tr key={'google' + i}>
									<th scope="row" className="green-text">{parameter.name}</th>
									<td>{parameter.text}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</Fragment>
		)
	}
	
	const facebook = () => {
	
		const parametersFacebook = [
			{ name: '{{ad.id}}', text: 'Идентификатор объявления' },
			{ name: '{{adset.id}}', text: 'Идентификатор группы объявлений' },
			{ name: '{{campaign.id}}', text: 'Идентификатор кампании' },
			{ name: '{{ad.name}}', text: 'Название объявления' },
			{ name: '{{adset.name}}', text: 'Имя набора объявлений' },
			{ name: '{{campaign.name}}', text: 'Название кампании' },
		]
	
		return (
			<Fragment>
				<h4 className="py-3">Основные параметры динамической вставки: Facebook.</h4>
				<table className="table table-striped">
					<thead>
						<tr>
							<th scope="col">Параметр</th>
							<th scope="col">Что система подставит вместо &#123;параметра&#125;</th>
						</tr>
					</thead>
					<tbody>
						{parametersFacebook.map((parameter, i) => {
							return (
								<tr key={'facebook' + i}>
									<th scope="row" className="green-text">{parameter.name}</th>
									<td>{parameter.text}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</Fragment>
		)
	}
	
	const mytarget = () => {
	
		const parametersMyTarget = [
			{ name: '{{advertiser_id}}', text: 'id рекламодателя' },
			{ name: '{{campaign_id}}', text: 'id рекламной кампании' },
			{ name: '{{campaign_name}}', text: 'название рекламной кампании' },
			{ name: '{{banner_id}}', text: '	id баннера' },
			{ name: '{{geo}}', text: 'id региона по геодереву myTarget, из которого был сделан переход' },
			{ name: '{{gender}}', text: 'пол пользователя, который сделал переход' },
			{ name: '{{age}}', text: 'возраст пользователя, который сделал переход' },
			{ name: '{{random}}', text: 'случайное число. Часто используется в ссылках (аудит-пикселях) для более точного подсчета показов' },
			{ name: '{{impression_weekday}}', text: 'передает день недели (например, mon), в который произошел показ баннера. Используется в метке ссылки' },
			{ name: '{{impression_hour}}', text: 'передает час (например, 23), в который произошел показ по Московскому времени в 24-часовом формате' },
			{ name: '{{user_timezone}}', text: 'передает временную зону пользователя (например, +3), в котором был сделан показ' },
		]
	
		return (
			<Fragment>
				<h4 className="py-3">Основные параметры динамической вставки: myTarget.</h4>
				<table className="table table-striped">
					<thead>
						<tr>
							<th scope="col">Параметр</th>
							<th scope="col">Что система подставит вместо &#123;параметра&#125;</th>
						</tr>
					</thead>
					<tbody>
						{parametersMyTarget.map((parameter, i) => {
							return (
								<tr key={'mytarget' + i}>
									<th scope="row" className="green-text">{parameter.name}</th>
									<td>{parameter.text}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</Fragment>
		)
	}

	return (
		<div className="mb-5 mt-3">
			<div className="nav nav-pills flex-column flex-md-row" id="v-pills-tab" role="tablist" aria-orientation="vertical">
				<a className="my-3 flex-md-fill text-md-center nav-link active" id="v-pills-about-tab" data-toggle="pill" href="#v-pills-about" role="tab" aria-controls="v-pills-about" aria-selected="true">
					Что это?
				</a>
				<a className="my-3 flex-md-fill text-md-center nav-link" id="v-pills-yandex-tab" data-toggle="pill" href="#v-pills-yandex" role="tab" aria-controls="v-pills-yandex" aria-selected="false">
					Яндекс.Директ
				</a>
				<a className="my-3 flex-md-fill text-md-center nav-link" id="v-pills-google-tab" data-toggle="pill" href="#v-pills-google" role="tab" aria-controls="v-pills-google" aria-selected="false">
					Google Adwords
				</a>
				<a className="my-3 flex-md-fill text-md-center nav-link" id="v-pills-facebook-tab" data-toggle="pill" href="#v-pills-facebook" role="tab" aria-controls="v-pills-facebook" aria-selected="false">
					Facebook
				</a>
				<a className="my-3 flex-md-fill text-md-center nav-link" id="v-pills-mytarget-tab" data-toggle="pill" href="#v-pills-mytarget" role="tab" aria-controls="v-pills-mytarget" aria-selected="false">
					myTarget
				</a>
			</div>

			<div className="tab-content" id="v-pills-tabContent">
				<div className="tab-pane fade rounded p-4 show active" style={content} id="v-pills-about" role="tabpanel" aria-labelledby="v-pills-about-tab">
					{info()}
				</div>
				<div className="tab-pane fade rounded p-4" style={content} id="v-pills-yandex" role="tabpanel" aria-labelledby="v-pills-yandex-tab">
					{yandex()}
				</div>
				<div className="tab-pane fade rounded p-4" style={content} id="v-pills-google" role="tabpanel" aria-labelledby="v-pills-google-tab">
					{google()}
				</div>
				<div className="tab-pane fade rounded p-4" style={content} id="v-pills-facebook" role="tabpanel" aria-labelledby="v-pills-facebook-tab">
					{facebook()}
				</div>
				<div className="tab-pane fade rounded p-4" style={content} id="v-pills-mytarget" role="tabpanel" aria-labelledby="v-pills-mytarget-tab">
					{mytarget()}
				</div>
			</div>
		</div>




		// <div className="my-5">
		// 	<ul className="nav nav-tabs" id="myTab" role="tablist">
		// 		<li className="nav-item" role="presentation">
		// 			<a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Что это?</a>
		// 		</li>
		// 		<li className="nav-item" role="presentation">
		// 			<a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Яндекс.Директ</a>
		// 		</li>
		// 		<li className="nav-item" role="presentation">
		// 			<a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Google Adwords</a>
		// 		</li>
		// 	</ul>
		// 	<div className="tab-content" id="myTabContent">
		// 		<div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
		// 			<div style={content} className="rounded-bottom">
		// 				<h4>Что такое динамические параметры</h4>
		// 				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu augue vitae ex tempus porttitor. Donec consequat consectetur libero, eu auctor ligula condimentum ut. Aenean augue quam, sodales sit amet pellentesque et, ultricies ac ligula. Mauris tempor ultrices ex, vel mollis odio molestie et. Nullam sapien odio, mollis non risus eget, suscipit dapibus ex. Etiam consectetur tellus sit amet orci vulputate dignissim. Sed fringilla aliquam justo, vel gravida est eleifend eget. Nam venenatis eget lorem ut ullamcorper. Praesent at odio nisl. Pellentesque accumsan ullamcorper ante quis tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque iaculis orci id malesuada vulputate. Nullam tempus consequat justo, id eleifend tortor mollis ut. Praesent vehicula, lectus quis condimentum rutrum, tellus elit volutpat ex, non fringilla justo metus vel dolor. Phasellus ante massa, aliquam a ipsum nec, vestibulum condimentum felis. Vestibulum vel feugiat felis, sed tristique urna.</p>
		// 				<h4>Заголовок четвертого уровня</h4>
		// 				<p>Nam ac finibus tellus. Vestibulum aliquam neque vel dolor tempus tempor. In id fermentum neque, vitae aliquam nunc. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean ullamcorper eget leo quis eleifend. Fusce maximus urna at tincidunt venenatis.</p>
		// 			</div>
		// 		</div>
		// 		<div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
		// 		<div style={content} className="rounded-bottom">
		// 				<h4>Яндекс Директ</h4>
		// 				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac mollis augue. Sed a tellus facilisis, hendrerit sem sed, ornare justo. Phasellus consectetur congue mollis. Ut tempus ullamcorper felis ut accumsan. Quisque vel urna sit amet arcu iaculis cursus vitae sit amet dolor. Proin sit amet posuere turpis. Pellentesque tortor neque, iaculis eget sodales sed, ultricies nec elit.</p>
		// 				<h4>Заголовок четвертого уровня</h4>
		// 				<p>Donec fermentum quis purus sit amet scelerisque. Aliquam quis dictum mauris, a imperdiet velit. Nullam dapibus id eros sed porta. Ut in interdum ipsum. Vivamus in justo lectus. Fusce tempus justo arcu, sit amet ultricies risus auctor feugiat. Integer suscipit feugiat urna. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum a cursus ligula, id feugiat velit.</p>
		// 				<p>Aenean faucibus dui condimentum vehicula sollicitudin. Fusce sed posuere nisi, vitae porttitor nibh. Morbi vulputate mi faucibus ex posuere lacinia. Phasellus mollis dictum mauris, vitae pharetra mauris faucibus ac. Nullam quis sapien libero. Aliquam eu facilisis orci. Suspendisse quis turpis vitae dolor faucibus venenatis. Aenean eget tortor in velit dignissim posuere. In vel finibus leo. Aliquam ut mattis nisl. Aliquam erat volutpat. Mauris molestie quis neque ut hendrerit. Vestibulum non gravida turpis.</p>
		// 			</div>
		// 		</div>
		// 		<div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">Текст 3 вкладки. Текст 3 вкладки. Текст 3 вкладки.</div>
		// 	</div>
		// </div>

	)
}

export default Tabs